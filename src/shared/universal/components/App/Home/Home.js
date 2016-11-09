/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import CSSModules from 'react-css-modules';
import { Button } from 'react-mdl';

import VirtualizedMDLGrid from '../VirtualizedMDLGrid';
import styles from './home.css';
import UserCard from '../UserCard';

const usersQuery = gql`
  query User($since: Int) {
    users(since: $since) {
      login
      id
      avatar_url
    }
  }
`

const usersWithTotalStargazersQuery = gql`
  query UserWithTotalStargazers($since: Int) {
    users(since: $since) {
      id,
      total_stargazers
    }
  }
`

class Home extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.users && this.props.users && nextProps.users.length !== this.props.users.length) {
      console.log("NEED FETCHING TOTAL STARGAZERS SINCE ", this.props.users[this.props.users.length - 1].id)
      this.props.loadNextTotalStargazersPage()
    }
  }

  render() {
    const {
      loading,
      users,
      loadNextPage,
    } = this.props
    return (
      <div>
        <article styleName='container'>
          <Helmet title="Home" />
          {loading ? <p>loading...</p> : (
            <VirtualizedMDLGrid
              infinite
              col={3}
              tablet={2}
              phone={1}
              items={users}
              itemsPerPage={30}
              rowHeight={217}
              getCellKey={user => user.id}
              renderItem={user => (
                <UserCard
                  avatarUrl={user.avatar_url}
                  userName={user.login}
                  totalStargazers={user.total_stargazers}
                />
              )}
              loadMoreRows={loadNextPage}
              minimumBatchSize={1}
              threshold={1}
            />
          )}
        </article>
      </div>
    );
  }
}

Home.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  users: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    avatar_url: React.PropTypes.string.isRequired,
    login: React.PropTypes.string.isRequired,
    total_stargazers: React.PropTypes.number
  })),
  loadNextPage: React.PropTypes.func.isRequired,
  loadNextTotalStargazersPage: React.PropTypes.func.isRequired,
}

const withUsers = graphql(usersQuery, {
  props({ data: { loading, users, fetchMore } }) {
    return {
      loading,
      users,
      loadNextPage() {
        return fetchMore({
          variables: {
            since: users[users.length - 1].id
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return prev }
            return {
              ...prev,
              users: [
                ...(prev.users || []),
                ...fetchMoreResult.data.users
              ]
            }
          }
        })
      }
    }
  }
})

const withTotalStargazers = graphql(usersWithTotalStargazersQuery, {
  options: {
    ssr: false
  },
  props: ({ ownProps, data: { users, loading, fetchMore } }) => ({
    ...ownProps,
    users: (ownProps.users || []).map((user, index) => {
      return {
        ...user,
        total_stargazers: users && !!users[index] ? user.total_stargazers || users[index].total_stargazers : undefined
      }
    }),
    loadNextTotalStargazersPage() {
      return fetchMore({
        variables: {
          since: users[users.length - 1].id
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult.data) { return prev }
          return {
            ...prev,
            users: [
              ...(prev.users || []),
              ...((fetchMoreResult.data.users || []).map((user, index) => {
                return {
                  ...user,
                  total_stargazers: prev.users && !!prev.users[index] ? prev.users[index].total_stargazers : undefined
                }
              }))
            ]
          }
        }
      })
    }
  })
})

const withData = compose(
  withUsers,
  withTotalStargazers
)

export default withData(CSSModules(Home, styles));
