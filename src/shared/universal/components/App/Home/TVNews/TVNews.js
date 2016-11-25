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

import * as root from '../../../../../../client/root'
import Pager from '../../Pager'
import paginationModux from '../../../../moduxes/pagination-list'


const NEWS_PER_PAGE = 3

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


const { PagerRenderer, CurrentPageProvider } = root.getRootContext().getView('tvNewsPagination')

const TVNews = ({
  thumbnail,
  title,
  time,
  news
}) => (
  <div>
    <Card shadow={1} style={{ width: '100%' }}>
      <CardTitle expand style={{ color: '#fff', background: `url(${thumbnail}) center / cover`, height: '167px', textAlign: 'center' }}>
        {time} - {title}
      </CardTitle>
      <CardText>
        <NewsList news={news}/>
      </CardText>
    </Card>
    <div style={{ textAlign: 'right' }}>
      <PagerRenderer>
        {({ goToNextPage, goToPreviousPage, currentPage }) => (
          <Pager
            pagesCount={8}
            currentPage={currentPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}/>
        )}
      </PagerRenderer>
    </div>
  </div>
)

const newsQuery = gql`
  query NewsQuery($offset: Int!, $limit: Int!)
  {
    heroNews: headlines(type: INFO, offset: 0, limit: 1) {
      thumbnail,
      title,
      time
    }
    news: headlines(type: INFO, offset: $offset, limit: $limit) {
      thumbnail,
      title,
      time
    }
  }
`

const withNews = graphql(newsQuery, {
  options: ({ offset }) => ({
    pollInterval: 60000,
    variables: {
      offset,
      limit: NEWS_PER_PAGE
    }
  }),
  props({ data: { heroNews, news }}) {
    heroNews = heroNews && heroNews[0]
    return {
      thumbnail: heroNews && heroNews.thumbnail,
      title: heroNews && heroNews.title,
      time: heroNews && moment(heroNews.time).format('HH[h]mm'),
      news: (news || []).map(n => ({
        text: n.title,
        time: moment(n.time).format('HH[h]mm')
      }))
    }
  }
})

const TVNewsWithData = withNews(TVNews)

export default () => (
  <CurrentPageProvider>
    {currentPage => <TVNewsWithData offset={(currentPage - 1) * NEWS_PER_PAGE + 1} />}
  </CurrentPageProvider>
)
