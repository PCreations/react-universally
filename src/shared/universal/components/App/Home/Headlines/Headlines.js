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

const mockHeroHeadline = {
  thumbnail: 'http://i.f1g.fr/media/eidos/625x390_crop/2016/11/24/XVM1a9872a0-b21d-11e6-8924-aaf6bf1e52ea.jpg',
  title: 'TPMP : Cyril Hanouna réagit à la mise en garde du CSA',
  text: 'TÉLÉVISION / VIDÉO - L’animateur de Touche pas à mon poste! s’est exprimé brièvement sur la mise en garde et la mise en demeure à l’encontre de la chaîne C8 initiées par le CSA.'
}

const mockHeadlines = Array(6).fill({
  thumbnail: 'http://i.f1g.fr/media/eidos/200x125_crop/2016/11/23/XVMb189a392-b0e1-11e6-b27f-7a21f37b2c6a-805x453.jpg',
  title: 'Miss France 2017 : les photos officielles des 30 candidates'
})

const Headlines = () => (
  <div>
    <HeroHeadline {...mockHeroHeadline} />
    <Grid>
      {mockHeadlines.map((headline, index) => (
        <Cell col={4} key={index}>
          <Headline {...headline}/>
        </Cell>
      ))}
    </Grid>
  </div>
)

export default Headlines
