import React from 'react'
import CSSModules from 'react-css-modules';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import styles from './usercard.css';

const UserCardCaption = CSSModules(({ login, loading, totalStargazers }) => (
  <span styleName='username'>
    {`${login} (${loading ? 'loading stargazers...' : `${totalStargazers} stargazers`})`}
  </span>
), styles)

const totalStargazersQuery = gql`
  query TotalStargazersForUser($username: String!) {
    userByUsername(username: $username) {
      login,
      total_stargazers
    }
  }
`

const UserCardCaptionContainer = graphql(totalStargazersQuery, {
  options: ({ username }) => ({
    ssr: false,
    variables: {
      username
    }
  }),
  props: ({ ownProps, data }) => {
    return {
      ...ownProps,
      loading: data.loading,
      login: data.loading ? 'loading..' : data.userByUsername.login,
      totalStargazers: !data.loading && data.userByUsername.total_stargazers
    }
  }
})(UserCardCaption)

UserCardCaptionContainer.propTypes = {
  username: React.PropTypes.string.isRequired
}

export default UserCardCaptionContainer
