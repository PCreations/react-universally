import React from 'react'
import moment from 'moment'
import Fragment from 'graphql-fragments'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid, Cell, Card, CardTitle, CardText } from 'react-mdl'


const Program = ({
  channel,
  thumbnail,
  time,
  title
}) => (
  <Card style={{ width: '100%', height: '250px' }} shadow={1}>
    <CardTitle style={{ background: `url(${thumbnail}) center / cover`, width: '100%', height: '110px' }}/>
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


const TVProgramGrid = ({ programs }) => (
  <Grid style={{ padding: 0 }}>
    {programs.map((program, i) => (
      <Cell col={4} key={i}>
        <Program {...program}/>
      </Cell>
    ))}
  </Grid>
)

const primeTimeProgramsQuery = gql`
  {
    tonightPrograms {
      ...Program
    }
  }
`

const withPrimeTimePrograms = graphql(primeTimeProgramsQuery, {
  options: {
    fragments: Program.fragments.program.fragments()
  },
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


export default withPrimeTimePrograms(TVProgramGrid)
