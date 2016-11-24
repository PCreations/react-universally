import React from 'react'
import { Grid, Cell } from 'react-mdl'

import TVProgramGrid from './TVProgramGrid'
import TVNews from './TVNews'

const Home = () => (
  <Grid>
    <Cell col={8}>
      <TVProgramGrid/>
    </Cell>
    <Cell col={4}>
      <TVNews/>
    </Cell>
  </Grid>
)

export default Home
