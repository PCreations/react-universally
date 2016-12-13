import React from 'react'
import { Card, CardTitle, CardActions, Tooltip } from 'react-mdl'
import gql from 'graphql-tag';
import Fragment from 'graphql-fragments';
import CSSModules from 'react-css-modules'

import style from './style.css'


const OtherAttendees = CSSModules(({
  attendees
}) => (
  <div styleName='attendees'>
    <span>{'Dans l\'agenda de :'}</span>
    {attendees.map(attendee => (
      <a href={attendee.url} key={attendee.url}>
        <Tooltip label={attendee.displayName} position='bottom'>
          <img styleName='small-avatar' src={attendee.avatar}/>
        </Tooltip>
      </a>
    ))}
  </div>
), style)

const MiniConcertCard = CSSModules(({
  thumbnailUrl,
  concertTitle,
  liveDate,
  venue,
  price,
  attendees = []
}) => (
  <Card shadow={1} styleName='container' style={{ background: `url(${thumbnailUrl}) center / cover` }}>
    <OtherAttendees attendees={attendees}/>
    <CardTitle expand/>
    <CardActions styleName='actions'>
      <span styleName='artist'>{concertTitle}</span>
      <span styleName='info'>
        <i className='material-icons' styleName='icon'>date_range</i> {liveDate}
        <i className='material-icons' styleName='icon'>place</i> {venue}
        <i className='material-icons' styleName='icon'>local_atm</i> {price}
      </span>
    </CardActions>
  </Card>
), style)


MiniConcertCard.fragments = {
  concert: new Fragment(gql`
    fragment MiniConcertCard on Concert {
      id
      thumbnailUrl
      concertTitle
      contest
      liveDate
      venue
      price
      tags
      attendees {
        id
        displayName
        avatar(dim: "32x32")
      }
    }
  `)
}


export default MiniConcertCard
