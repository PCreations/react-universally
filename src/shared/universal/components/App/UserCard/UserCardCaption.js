import React from 'react'
import CSSModules from 'react-css-modules';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import styles from './usercard.css';

const UserCardCaption = CSSModules(({ username, loading, totalStargazers }) => (
  <span styleName='username'>
    {`${username} (${loading ? 'loading stargazers...' : `${totalStargazers} stargazers`})`}
  </span>
), styles)

const totalStargazersQuery = gql`
  query TotalStargazersForUser($username: String!) {
    userByUsername(username: $username) {
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
    console.log(data)
    return {
      ...ownProps,
      loading: data.loading,
      totalStargazers: !data.loading && data.userByUsername.total_stargazers
    }
  }
})(UserCardCaption)

UserCardCaptionContainer.propTypes = {
  username: React.PropTypes.string.isRequired
}

export default UserCardCaptionContainer
