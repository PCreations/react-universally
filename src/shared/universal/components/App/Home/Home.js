/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CSSModules from 'react-css-modules';

import VirtualizedMDLGrid from '../VirtualizedMDLGrid';
import styles from './home.css';
import UserCard from '../UserCard';

const usersQuery = gql`
  {
    users {
      id,
      avatar_url,
      login
    }
  }
`

function Home({ data: { loading, users } }) {
  return (
    <article styleName='container'>
      <Helmet title="Home" />
      {loading ? <p>loading...</p> : (
        <VirtualizedMDLGrid
          col={3}
          tablet={2}
          phone={1}
          items={users}
          rowHeight={217}
          getCellKey={user => user.id}
          renderItem={user => (
            <UserCard
              avatarUrl={user.avatar_url}
              userName={user.login}
            />
          )}
        />
      )}
    </article>
  );
}

Home.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    users: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      avatar_url: React.PropTypes.string.isRequired,
      login: React.PropTypes.string.isRequired
    }))
  })
}

export default graphql(usersQuery)(CSSModules(Home, styles));
