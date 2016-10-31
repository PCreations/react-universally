import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import CSSModules from 'react-css-modules';
import styles from './postcard.css';

const PostCard = ({ title, author, summary, category }) => (
  <Card styleName='card'>
    <CardHeader
      title={title}
      subtitle={author}
    />
    <CardText>
      { summary }
    </CardText>
  </Card>
)

export default CSSModules(PostCard, styles)
