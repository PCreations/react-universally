import React from 'react'
import { Grid, Cell } from 'react-mdl'

import TVProgramGrid from './TVProgramGrid'
import TVNews from './TVNews'
import Headlines from './Headlines'

const mockHeadlines = Array(6).fill({
  thumbnail: 'http://i.f1g.fr/media/eidos/200x125_crop/2016/11/23/XVMb189a392-b0e1-11e6-b27f-7a21f37b2c6a-805x453.jpg',
  title: 'Miss France 2017 : les photos officielles des 30 candidates'
})

const mockHeroHeadline = {
  thumbnail: 'http://i.f1g.fr/media/eidos/625x390_crop/2016/11/24/XVM1a9872a0-b21d-11e6-8924-aaf6bf1e52ea.jpg',
  title: 'TPMP : Cyril Hanouna réagit à la mise en garde du CSA',
  text: 'TÉLÉVISION / VIDÉO - L’animateur de Touche pas à mon poste! s’est exprimé brièvement sur la mise en garde et la mise en demeure à l’encontre de la chaîne C8 initiées par le CSA.'
}


const mockHeroSeriesHeadline = {
  thumbnail: 'http://i.f1g.fr/media/eidos/625x390_crop/2016/11/23/XVM7e52a8de-b00f-11e6-b27f-7a21f37b2c6a-805x415.jpg',
  title: 'Esprits criminels, Prison Break... Comment les scénaristes justifient le départ des acteurs',
  text: ''
}

const mockSeriesHeadlines = Array(2).fill({
  thumbnail: 'http://i.f1g.fr/media/eidos/278x174_crop/2016/11/23/XVM90c79154-afde-11e6-acd4-96dddc70cb2e.jpg',
  title: 'Shemar Moore fait ses adieux à Esprits criminels'
})


const mockPeopleHeadlines = Array(6).fill({
  thumbnail: 'http://i.f1g.fr/media/eidos/373x280_crop/2016/11/22/XVMdf43f63e-b0cd-11e6-94b2-27c8ccf42621.jpg',
  title: 'Erika Moulet: «J’avais envie de retrouver Bertrand Chameroy»'
})

const Home = () => (
  <div>
    <Grid>
      <Cell col={8}>
        <h2 style={{ textAlign: 'center' }}>Programme TV</h2>
        <TVProgramGrid/>
      </Cell>
      <Cell col={4}>
        <h2 style={{ textAlign: 'center' }}>Actu TV en continu</h2>
        <TVNews/>
      </Cell>
    </Grid>
    <h2 style={{ textAlign: 'center' }}>À la une</h2>
    <Headlines
      heroHeadline={mockHeroHeadline}
      headlines={mockHeadlines}/>
    <h2 style={{ textAlign: 'center' }}>Actus séries</h2>
    <Headlines
      heroHeadline={mockHeroSeriesHeadline}
      headlines={mockSeriesHeadlines}/>
    <h2 style={{ textAlign: 'center' }}>Actus people</h2>
    <Headlines
      headlines={mockPeopleHeadlines}/>
  </div>
)

export default Home
