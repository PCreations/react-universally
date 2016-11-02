import React from 'react'
import { Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import CSSModules from 'react-css-modules';
import styles from './postcard.css';

const PostCard = ({ title, author, summary, category }) => (
  <Card shadow={0} styleName='card'>
    <CardTitle expand styleName='title'>
      {`${title} | ${author}`}
    </CardTitle>
    <CardText>
      { summary }
    </CardText>
    <CardActions border>
      <Button colored>See more</Button>
    </CardActions>
  </Card>
)

export default CSSModules(PostCard, styles)
