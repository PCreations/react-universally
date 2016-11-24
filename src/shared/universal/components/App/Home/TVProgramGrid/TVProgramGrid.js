import React from 'react'
import { Grid, Cell, Card, CardTitle, CardText } from 'react-mdl'


const Program = ({
  thumbnail,
  time,
  title
}) => (
  <Card style={{ width: '100%', height: '200px' }} shadow={1}>
    <CardTitle style={{ background: `url(${thumbnail}) center / cover`, width: '100%', height: '110px' }}/>
    <CardText>
      <span style={{ display: 'block' }}>{time}</span>
      <strong>{title}</strong>
    </CardText>
  </Card>
)

const mockPrograms = Array(6).fill({
  thumbnail: 'http://i.f1g.fr/media/ext/373x233_crop/api-tvmag.lefigaro.fr/img/000/130/13095290.jpg',
  time: '21h00',
  title: 'L\'affaire O.J Simpson'
})

const TVProgramGrid = ({ programs = mockPrograms }) => (
  <Grid>
    {programs.map((program, i) => (
      <Cell col={4} key={i}>
        <Program {...program}/>
      </Cell>
    ))}
  </Grid>
)

export default TVProgramGrid
