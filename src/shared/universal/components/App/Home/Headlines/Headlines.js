import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Fragment from 'graphql-fragments'
import {
  Card,
  CardTitle,
  CardText,
  CardActions,
  Grid,
  Cell
} from 'react-mdl'


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

Headline.fragments = {
  headline: new Fragment(gql`
    fragment Headline on ArticleExcerpt {
      thumbnail
      title
    }
  `)
}


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

HeroHeadline.fragments = {
  headline: new Fragment(gql`
    fragment HeroHeadline on ArticleExcerpt {
      thumbnail
      title
      description
    }
  `)
}


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

const HEADLINES_QUERY = gql`
  query HeadlineQuery($type: HeadlinesType!) {
    heroHeadline: headlines(type: $type) {
      ...HeroHeadline
    }
    headlines: headlines(type: $type) {
      ...Headline
    }
  }
`


const withHeadlines = graphql(HEADLINES_QUERY, {
  options({ type }) {
    return {
      pollInterval: 60000,
      variables: { type },
      fragments: [
        HeroHeadline.fragments.headline.fragments(),
        Headline.fragments.headline.fragments()
      ]
    }
  },
  props({ data: { loading, heroHeadline, headlines }}) {
    return {
      heroHeadline: heroHeadline ? heroHeadline[0] : {},
      headlines: headlines ? headlines.slice(1,7) : []
    }
  }
})

export const HEADLINES_TYPES = {
  INFO: 'INFO',
  SERIES: 'SERIES',
  PEOPLE: 'PEOPLE'
}

export default withHeadlines(Headlines)
