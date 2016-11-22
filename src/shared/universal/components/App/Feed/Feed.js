/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import CSSModules from 'react-css-modules';
import { Button } from 'react-mdl';

import VirtualizedMDLGrid from '../VirtualizedMDLGrid';
import styles from './feed.css';
import { ConcertCardPlaceholder, ConcertCard } from '../ConcertCard';

const concertsQuery = gql`
  query Concerts {
    recentlyAdded {
      ...ConcertCard
    }
  }
`

const loadingConcerts = Array(30).fill(0)


class Feed extends React.Component {

  render() {
    const {
      loading,
      concerts,
      loadNextPage,
    } = this.props
    return (
      <div>
        <article styleName='container'>
          <Helmet title="Feed" />
          <VirtualizedMDLGrid
            col={3}
            tablet={2}
            phone={1}
            items={concerts || loadingConcerts}
            itemsPerPage={30}
            rowHeight={560}
            getCellKey={(concert, index) => concert.id || index}
            renderItem={concert => loading ? (
              <ConcertCardPlaceholder/>
            ) : (
              <ConcertCard
                digggerUrl={'http://google.com'}
                avatarUrl={'http://cdn.diggger.com/media/cache/15/68/15686ca3e1088b4c84a5c5c39e38b391.jpg'}
                digggerName={'Mirolepralot'}
                thumbnailUrl={concert.thumbnailUrl}
                concertTitle={concert.concertTitle}
                hasContest={concert.contest}
                isRegisteredInContest={false}
                liveDate={concert.liveDate}
                venue={concert.venue}
                price={concert.price}
                tags={concert.tags}
                otherAttendees={concert.attendees}/>
          )}/>
        </article>
      </div>
    );
  }
}

Feed.propTypes = {
  loading: React.PropTypes.bool.isRequired,
}

const withConcerts = graphql(concertsQuery, {
  options: {
    ssr: false,
    fragments: ConcertCard.fragments.concert.fragments()
  },
  props({ data: { loading, recentlyAdded } }) {
    return {
      loading,
      concerts: recentlyAdded,
    }
  }
})

export default withConcerts(CSSModules(Feed, styles));
