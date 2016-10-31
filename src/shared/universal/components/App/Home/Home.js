/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const postsTitleQuery = gql`
  {
    posts {
      _id,
      title
    }
  }
`

function Home({ data: { loading, posts } }) {
  return (
    <article>
      <Helmet title="Home" />
      {loading ? <p>loading...</p> : (
        <ul>
          {posts.map(p => (
            <li key={p._id}>{p.title}</li>
          ))}
        </ul>
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

export default graphql(postsTitleQuery)(Home);
