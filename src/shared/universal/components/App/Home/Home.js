/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import CSSModules from 'react-css-modules';
import { Button } from 'react-mdl';

import VirtualizedMDLGrid from '../VirtualizedMDLGrid';
import styles from './home.css';
import { ConcertCardPlaceholder, ConcertCard } from '../ConcertCard';

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

let concerts = []

for (let i=0; i<30; i++) {
  concerts.push(i)
}

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
          <VirtualizedMDLGrid
            col={3}
            tablet={2}
            phone={1}
            items={concerts}
            itemsPerPage={30}
            rowHeight={560}
            renderItem={concert => (
              <ConcertCard
                digggerUrl={'http://google.com'}
                avatarUrl={'http://cdn.diggger.com/media/cache/15/68/15686ca3e1088b4c84a5c5c39e38b391.jpg'}
                digggerName={'Mirolepralot'}
                thumbnailUrl={'//i.ytimg.com/vi/DreeCbl8s9E/hqdefault.jpg'}
                concertTitle={'Les inrocks festival'}
                hasContest={true}
                isRegisteredInContest={false}
                liveDate={'ven 18 Nov 2016'}
                venue={'La Cigale'}
                price={'99€ Pass 3 jours'}
                tags={['pop / rock', 'electro']}
                otherAttendees={[{
                  name: 'Ernoldsame',
                  url: 'http://google.com',
                  avatarUrl: 'http://cdn.diggger.com/media/cache/70/78/70785843a612f8d15f54c5e3ee77a966.jpg'
                }, {
                  name: 'Olivier Jalbert',
                  url: 'http://google.com',
                  avatarUrl: 'http://cdn.diggger.com/media/cache/17/e2/17e2a10c17a5b9b0c31928701eb6c1d9.jpg'
                }]}/>
            )}/>
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

export default CSSModules(Home, styles);
