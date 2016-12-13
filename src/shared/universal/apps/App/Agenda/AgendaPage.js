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

const loadingConcerts = Array(18).fill(0)

let AgendaPage = ({
  loading,
  concerts = loadingConcerts
}) => (
  <VirtualizedMDLGrid
    col={3}
    tablet={2}
    phone={1}
    items={concerts}
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
)


const withConcerts = graphql(concertsMonthQuery, {
  options: ({ year, month }) => ({
    ssr: false,
    fragments: MiniConcertCard.fragments.concert.fragments(),
    variables: { year, month }
  }),
  props({ data: { loading, getMonth } }) {
    return {
      loading,
      concerts: getMonth && getMonth.concerts,
    }
  }
})


AgendaPage = withConcerts(AgendaPage)


class Agenda extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      year: parseInt(this.props.params.year, 10),
      month: parseInt(this.props.params.month, 10)
    }
    this.yearInput = null
    this.monthInput = null
  }

  render() {
    return (
      <div>
        <article styleName='container'>
          <Helmet title="Feed" />
          <input type="text" ref={year => this.yearInput = year} placeholder="year"/>
          <input type="text" ref={month => this.monthInput = month} placeholder="month"/>
          <button type="submit" onClick={() => this.setState({
            year: this.yearInput.value,
            month: this.monthInput.value
          })}>OK</button>
          <AgendaPage
            year={this.state.year}
            month={this.state.month}/>
        </article>
      </div>
    );
  }
}

export default CSSModules(Agenda, styles);
