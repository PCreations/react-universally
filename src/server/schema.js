import fetch from 'isomorphic-fetch'
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
    site_admin: { type: GraphQLBoolean }
  })
})

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
