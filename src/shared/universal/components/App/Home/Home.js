/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { AutoSizer, List } from 'react-virtualized';
import CSSModules from 'react-css-modules';

import styles from './home.css';
import PostCard from '../PostCard';

const postsTitleQuery = gql`
  {
    posts {
      _id,
      title,
      author {
        name
      },
      category
    }
  }
`

function Home({ data: { loading, posts } }) {
  return (
    <article styleName='container'>
      <Helmet title="Home" />
      {loading ? <p>loading...</p> : (
        posts.map(post => (
          <PostCard
            key={post._id}
            title={post.title}
            author={post.author.name}
            summary={post.summary}
            category={post.category.name}
          />
        ))
      )}
    </article>
  );
}

Home.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    posts: React.PropTypes.arrayOf(React.PropTypes.shape({
      _id: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired
    }))
  })
}

export default graphql(postsTitleQuery)(CSSModules(Home, styles));
