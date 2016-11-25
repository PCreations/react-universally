import React from 'react'
import moment from 'moment'
import Fragment from 'graphql-fragments'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid, Cell, Card, CardTitle, CardText } from 'react-mdl'

import * as root from '../../../../../../client/root'
import Pager from '../../Pager'
import paginationModux from '../../../../moduxes/pagination-list'


const Program = ({
  channel,
  thumbnail,
  time,
  title
}) => (
  <Card style={{ width: '100%', height: '250px' }} shadow={1}>
    <CardTitle style={{ background: `url(${thumbnail}) center / cover`, width: '100%', height: '220px' }}/>
    <CardText>
      <span style={{ display: 'block' }}>{time} - {channel}</span>
      <strong>{title}</strong>
    </CardText>
  </Card>
)

Program.fragments = {
  program: new Fragment(gql`
    fragment Program on Program {
      channel,
      thumbnail
      title
      startAt
    }
  `)
}


//root.getRootContext().add(paginationModux, 'tvProgramPagination')
const { PagerRenderer, CurrentPageProvider } = root.getRootContext().getView('tvProgramPagination')
//const PagerRenderer = ({ children }) => children({})

const TVProgramGrid = ({ programs }) => (
  <Grid style={{ padding: 0 }}>
    {programs.map((program, i) => (
      <Cell col={4} key={i}>
        <Program {...program}/>
      </Cell>
    ))}
    <Cell col={12} style={{ textAlign: 'right' }}>
      <PagerRenderer>
        {({ goToNextPage, goToPreviousPage, currentPage }) => (
          <Pager
            pagesCount={2}
            currentPage={currentPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}/>
        )}
      </PagerRenderer>
    </Cell>
  </Grid>
)

const primeTimeProgramsQuery = gql`
  query TonightProgramsPage($offset: Int!) {
    tonightPrograms(offset: $offset) {
      ...Program
    }
  }
`

const withPrimeTimePrograms = graphql(primeTimeProgramsQuery, {
  options: ({ offset }) => ({
    fragments: Program.fragments.program.fragments(),
    variables: {
      offset
    }
  }),
  props({ data: { loading, tonightPrograms } }) {
    return {
      programs: (tonightPrograms || []).map(program => ({
        channel: program.channel,
        thumbnail: program.thumbnail,
        title: program.title,
        time: moment.unix(program.startAt).format('HH[h]mm')
      }))
    }
  }
})

const TVProgramGridWithPrograms = withPrimeTimePrograms(TVProgramGrid)

export default () => (
  <CurrentPageProvider>
    {currentPage => <TVProgramGridWithPrograms offset={(currentPage - 1) * 6}/>}
  </CurrentPageProvider>
)
