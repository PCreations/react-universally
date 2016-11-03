import isoFetch from 'isomorphic-fetch'
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInterfaceType
} from 'graphql';

const fetch = url => isoFetch(url, {
  headers: {
    'Authorization': `Basic ${new Buffer('PCreations:9876d314f1297de09d06cb3ae2985609384809b5').toString('base64')}`
  }
})

const User = new GraphQLObjectType({
  name: 'User',
  description: 'A Github user',
  fields: () => ({
    login: { type: GraphQLString },
    id: { type: GraphQLInt },
    avatar_url: { type: GraphQLString },
    gravatar_id: { type: GraphQLString },
    url: { type: GraphQLString },
    html_url: { type: GraphQLString },
    followers_url: { type: GraphQLString },
    following_url: { type: GraphQLString },
    gists_url: { type: GraphQLString },
    starred_url: { type: GraphQLString },
    subscriptions_url: { type: GraphQLString },
    organizations_url: { type: GraphQLString },
    repos_url: { type: GraphQLString },
    events_url: { type: GraphQLString },
    received_events_url: { type: GraphQLString },
    type: { type: GraphQLString },
    site_admin: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    company: { type: GraphQLString },
    blog: { type: GraphQLString },
    location: { type: GraphQLString },
    email: { type: GraphQLString },
    hireable: { type: GraphQLBoolean },
    bio: { type: GraphQLString },
    public_repos: { type: GraphQLInt },
    public_gists: { type: GraphQLInt },
    followers: { type: GraphQLInt },
    following: { type: GraphQLInt },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    repos: {
      type: RepoPageResults,
      args: {
        page: { type: GraphQLInt }
      },
      resolve: (root, { page=1 }) => fetchRepoPage(`${root.repos_url}?page=${page}`)
    },
    total_stargazers: {
      type: GraphQLInt,
      resolve: root => {
        const fetchUserRepoPage = (page = 1, total = 0) => {
          return fetch(`${root.repos_url}?page=${page}`)
          .then(res => res.json())
          .then(repos => ({
            total: repos.reduce((a, r) => a + r.stargazers_count, total),
            repos
          }))
          .then(({ repos, total }) => repos.length > 0 ? fetchUserRepoPage(page + 1, total) : total)
        }
        return fetchUserRepoPage()
      }
    }
  })
})

const Repo = new GraphQLObjectType({
  name: 'Repo',
  description: 'A repository',
  fields: () => ({
    id: { type: GraphQLInt },
    owner: { type: User },
    name: { type: GraphQLString },
    full_name: { type: GraphQLString },
    description: { type: GraphQLString },
    private: { type: GraphQLBoolean },
    fork: { type: GraphQLBoolean },
    url: { type: GraphQLString },
    html_url: { type: GraphQLString },
    stargazers_count: { type: GraphQLInt },
    watchers_count: { type: GraphQLInt },
    forks_count: { type: GraphQLInt }
  })
})

const RepoPageResults = new GraphQLObjectType({
  name: 'RepoPageResults',
  fields: () => ({
    results: { type: new GraphQLList(Repo) },
    prev: { type: GraphQLString },
    next: { type: GraphQLString },
    first: { type: GraphQLString },
    last: { type: GraphQLString }
  })
})

const fetchRepoPage = (endpoint, since) => {
  let page = {}
  return fetch(`${endpoint}${typeof since === 'undefined' ? '' : `?since=${since}`}`)
  .then(res => {
    page.results = res.json()
    console.log(res.headers)
    const linkHeaders = res.headers.get('link').split(', ')
    const regexp = /<(https:\/\/api\.github\.com\/.*)>; rel="(next|prev|first|last)"/g
    linkHeaders.map(link => {
      const matches = regexp.exec(link)
      if (matches) {
        page[matches[2]] = matches[1]
      }
    })
    return page
  })
  .then(page => (
    page.results.then(repos => (
      Promise.all(repos.map((r, index) => (
        fetch(r.owner.url)
        .then(res => res.json())
        .then(user => ({
          ...repos[index],
          owner: user
        }))
        .catch(err => console.error(err))
      )))
    ))
  ))
  .then(_ => page)
}

const Query = new GraphQLObjectType({
  name: 'GithubSchema',
  description: "Root of the Github Schema",
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      description: "List of users in github",
      args: {
        since: {type: GraphQLInt}
      },
      resolve: function(root, { since }) {
        return fetch(`https://api.github.com/users?since=${since || 1}`)
          .then(res => res.json())
      }
    },
    userByUsername: {
      type: User,
      description: 'A user instance',
      args: {
        username: { type: GraphQLString }
      },
      resolve: (_, { username }) => (
        fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
      )
    },
    repos: {
      type: RepoPageResults,
      description: 'Repositories page results',
      args: {
        since: { type: GraphQLInt }
      },
      resolve: (_, { since=0 }) => fetchRepoPage('https://api.github.com/repositories', since)
    }
  })
});

/*const Mutation = new GraphQLObjectType({
  name: "BlogMutations",
  fields: {
    createPost: {
      type: Post,
      description: "Create a new blog post",
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        summary: {type: GraphQLString},
        category: {type: Category},
        author: {type: new GraphQLNonNull(GraphQLString), description: "Id of the author"}
      },
      resolve: function(source, {...args}) {
        let post = args;
        var alreadyExists = PostsList.findIndex(p => p._id === post._id) >= 0;
        if(alreadyExists) {
          throw new Error("Post already exists: " + post._id);
        }

        if(!AuthorsMap[post.author]) {
          throw new Error("No such author: " + post.author);
        }

        if(!post.summary) {
          post.summary = post.content.substring(0, 100);
        }

        post.comments = [];
        post.date = {$date: new Date().toString()}

        PostsList.push(post);
        return post;
      }
    },

    createAuthor: {
      type: Author,
      description: "Create a new author",
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        twitterHandle: {type: GraphQLString}
      },
      resolve: function(source, {...args}) {
        let author = args;
        if(AuthorsMap[args._id]) {
          throw new Error("Author already exists: " + author._id);
        }

        AuthorsMap[author._id] = author;
        return author;
      }
    }
  }
});*/

const Schema = new GraphQLSchema({
  query: Query,
  //mutation: Mutation
});

export default Schema;
