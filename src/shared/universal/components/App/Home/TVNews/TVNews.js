import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import {
  Card,
  CardTitle,
  CardText,
  List,
  ListItem
} from 'react-mdl'


const NewsList = ({
  news
}) => (
  <List style={{ width: '100%' }}>
    {news.map((news, i) => (
      <ListItem key={i}>
        <span>{news.time}</span>
        <span style={{ paddingLeft: '10px' }}>{news.text}</span>
      </ListItem>
    ))}
  </List>
)

const TVNews = ({
  thumbnail,
  title,
  time,
  news
}) => (
  <Card shadow={1} style={{ width: '100%' }}>
    <CardTitle expand style={{ color: '#fff', background: `url(${thumbnail}) center / cover`, height: '167px', textAlign: 'center' }}>
      {time} - {title}
    </CardTitle>
    <CardText>
      <NewsList news={news}/>
    </CardText>
  </Card>
)

const newsQuery = gql`
  {
    heroNews: headlines(type: INFO) {
      thumbnail,
      title,
      time
    }
    news: headlines(type: INFO) {
      thumbnail,
      title,
      time
    }
  }
`

const withNews = graphql(newsQuery, {
  options: {
    pollInterval: 60000
  },
  props({ data: { heroNews, news }}) {
    const _heroNews = heroNews && heroNews[0]
    const _news = news && news.slice(1,4)
    return {
      thumbnail: _heroNews && _heroNews.thumbnail,
      title: _heroNews && _heroNews.title,
      time: _heroNews && moment(_heroNews.time).format('HH[h]mm'),
      news: (_news || []).map(n => ({
        text: n.title,
        time: moment(n.time).format('HH[h]mm')
      }))
    }
  }
})


export default withNews(TVNews)
