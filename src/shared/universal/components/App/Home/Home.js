import React from 'react'
import { Grid, Cell } from 'react-mdl'

import TVProgramGrid from './TVProgramGrid'
import TVNews from './TVNews'
import Headlines from './Headlines'

const Home = () => (
  <div>
    <Grid>
      <Cell col={8}>
        <TVProgramGrid/>
      </Cell>
      <Cell col={4}>
        <TVNews/>
      </Cell>
    </Grid>
    <Headlines/>
  </div>
)

export default Home
