import React from 'react'
import {
  Card,
  CardTitle,
  CardText,
  List,
  ListItem
} from 'react-mdl'


const mockNews = Array(4).fill({
  time: '11h05',
  text: 'Primaire à droite : à quoi ressemblera le débat de l’entre-deux-tours ?'
})

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
  thumbnail = 'http://i.f1g.fr/media/eidos/298x167_crop/2016/11/24/XVM84cdb3f6-b227-11e6-b27f-7a21f37b2c6a.jpg',
  news = mockNews
}) => (
  <Card shadow={1} style={{ width: '100%' }}>
    <CardTitle expand style={{ background: `url(${thumbnail}) center / cover`, height: '167px' }}/>
    <CardText>
      <NewsList news={news}/>
    </CardText>
  </Card>
)

export default TVNews
