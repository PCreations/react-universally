/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import CSSModules from 'react-css-modules';
import { Button } from 'react-mdl';

import VirtualizedMDLGrid from '../VirtualizedMDLGrid';
import styles from './agenda.css';
import MiniConcertCard from '../MiniConcertCard';

const concertsMonthQuery = gql`
  query ConcertsForMonth($year: Int!, $month: Int!) {
    getMonth(year: $year, month: $month) {
      concerts {
        ...MiniConcertCard
      }
    }
  }
`

const loadingConcerts = Array(30).fill(0)


class Agenda extends React.Component {

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
            rowHeight={285}
            getCellKey={(concert, index) => concert.id || index}
            renderItem={concert => {
              return (
                <MiniConcertCard
                  thumbnailUrl={concert.thumbnailUrl}
                  concertTitle={concert.concertTitle}
                  hasContest={concert.contest}
                  isRegisteredInContest={false}
                  liveDate={concert.liveDate}
                  venue={concert.venue}
                  price={concert.price}
                  tags={concert.tags}
                  attendees={concert.attendees}/>
              )
            }}/>
        </article>
      </div>
    );
  }
}


const withConcerts = graphql(concertsMonthQuery, {
  options: props => ({
    ssr: false,
    fragments: MiniConcertCard.fragments.concert.fragments(),
    variables: {
      year: 2016,
      month: 11
    }
  }),
  props({ data: { loading, getMonth } }) {
    return {
      loading,
      concerts: getMonth && getMonth.concerts,
    }
  }
})

export default withConcerts(CSSModules(Agenda, styles));
