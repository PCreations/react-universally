import React from 'react';
import { Card, CardTitle, CardActions } from 'react-mdl';
import CSSModules from 'react-css-modules';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import UserCardCaption from './UserCardCaption';
import styles from './usercard.css';

const UserCard = ({ avatarUrl = '/avatar_placeholder.png', userName }) => (
  <Card shadow={0} styleName='card' style={{background: `url(${avatarUrl}) center / cover`}}>
    <CardTitle expand />
    <CardActions styleName='actions'>
      <UserCardCaption username={userName}/>
    </CardActions>
  </Card>
)

export default CSSModules(UserCard, styles)
