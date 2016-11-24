import React from 'react'
import {
  Card,
  CardTitle,
  CardText,
  CardActions,
  Grid,
  Cell
} from 'react-mdl'

const HeroHeadline = ({
  thumbnail,
  title,
  text
}) => (
  <Card shadow={1} style={{ width: '630px', height: '564px' }}>
    <CardTitle style={{ background: `url(${thumbnail}) center / cover`, width: '100%', height: '376px', color: '#fff', fontWeight: '500' }}>
      {title}
    </CardTitle>
    <CardText>
      {text}
    </CardText>
  </Card>
)

const Headline = ({
  thumbnail,
  title
}) => (
  <Card shadow={1} style={{ width: '100%', height: '238px', background: `url(${thumbnail}) center / cover` }}>
    <CardTitle expand />
    <CardActions style={{height: '62px', padding: '16px', background: 'rgba(0,0,0,0.7)'}}>
        <span style={{color: '#fff', fontSize: '16px', fontWeight: '600'}}>
            {title}
        </span>
    </CardActions>
  </Card>
)

const Headlines = ({
  heroHeadline,
  headlines
}) => (
  <div>
    { heroHeadline && <HeroHeadline {...heroHeadline} /> }
    <Grid>
      {headlines.map((headline, index) => (
        <Cell col={4} key={index}>
          <Headline {...headline}/>
        </Cell>
      ))}
    </Grid>
  </div>
)

export default Headlines
