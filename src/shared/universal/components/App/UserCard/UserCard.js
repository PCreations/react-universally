import React from 'react';
import util from 'util';
import { Card, CardTitle, CardActions } from 'react-mdl';
import CSSModules from 'react-css-modules';
import gql from 'graphql-tag';
import Fragment from 'graphql-fragments';
import { graphql } from 'react-apollo';

import UserCardCaption from './UserCardCaption';
import styles from './usercard.css';

const UserCard = CSSModules(({ avatarUrl = '/avatar_placeholder.png', userName, totalStargazers }) => (
  <Card shadow={0} styleName='card' style={{background: `url(${avatarUrl}) center / cover`}}>
    <CardTitle expand />
    <CardActions styleName='actions'>
      <span styleName='username'>
        {`${userName} (${typeof totalStargazers === 'undefined' ? 'loading stargazers...' : `${totalStargazers} stargazers`})`}
      </span>
    </CardActions>
  </Card>
), styles)

UserCard.fragments = {
  user: new Fragment(gql`
    fragment UserCard on User {
      id,
      avatar_url,
      login
    }
  `)
}

console.log("UserCard fragments inspect", JSON.stringify(UserCard.fragments, null, 4))

export default UserCard
