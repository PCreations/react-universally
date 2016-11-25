import React from 'react'
import { Grid, Cell } from 'react-mdl'

import TVProgramGrid from './TVProgramGrid'
import TVNews from './TVNews'
import { Headlines, HEADLINES_TYPES } from './Headlines'

const Home = () => (
  <div>
    <Grid>
      <Cell col={8}>
        <h2 style={{ textAlign: 'center' }}>Programme TV</h2>
        <TVProgramGrid/>
      </Cell>
      <Cell col={4}>
        <h3 style={{ textAlign: 'center' }}>Actu TV en continu</h3>
        <TVNews/>
      </Cell>
    </Grid>
    <h2 style={{ textAlign: 'center' }}>À la une</h2>
    <Headlines type={HEADLINES_TYPES.PEOPLE} />
    <h2 style={{ textAlign: 'center' }}>Actus séries</h2>
    <Headlines type={HEADLINES_TYPES.SERIES}/>
  </div>
)

export default Home
