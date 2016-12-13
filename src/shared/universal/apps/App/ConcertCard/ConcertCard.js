import React from 'react'
import { Card, CardTitle, CardText, Tooltip } from 'react-mdl';
h
import CSSModules from 'react-css-modules';

import style from './style.css'


const ConcertCard = CSSModules(({
  digggerUrl,
  avatarUrl,
  digggerName,
  thumbnailUrl,
  concertTitle,
  hasContest,
  isRegisteredInContest,
  liveDate,
  venue,
  price,
  tags,
  otherAttendees
}) => {

  const ConcertCardTitle = CSSModules(() => (
    <CardTitle styleName='title'>
      <a href={digggerUrl} styleName='diggger-url'>
        <img src={avatarUrl} styleName='avatar'/>
        <div styleName='diggger-name-container'>
          <div styleName='diggger-name-prefix'>
            {'Dans l\'agenda de'}
          </div>
          <div styleName='diggger-name'>
            {digggerName}
          </div>
        </div>
      </a>
    </CardTitle>
  ), style)

  const ConcertMedia = CSSModules(() => (
    <div styleName='media-container'>
      <img src={thumbnailUrl} styleName='media'/>
      <div styleName='play-button'/>
    </div>
  ), style)

  const OtherAttendees = CSSModules(() => (
    <div>
      <p>{'Aussi dans l\'agenda de :'}</p>
      {otherAttendees.map(attendee => (
        <a href={attendee.url} key={attendee.url}>
          <Tooltip label={attendee.displayName} position='bottom'>
            <img styleName='small-avatar' src={attendee.avatar}/>
          </Tooltip>
        </a>
      ))}
    </div>
  ), style)

  const ConcertCardText = CSSModules(() => (
    <CardText styleName='concert-text'>
      <h1 styleName='concert-title'>{concertTitle}</h1>
      {hasContest && (
        <div styleName='text-center'>
          <span styleName={isRegisteredInContest ? 'label-in-contest' : 'label-contest'}>
            {isRegisteredInContest && <i className='material-icons'>check_circle</i>}
            {isRegisteredInContest ? ' inscrit au concours' : 'Gagnez votre place !'}
          </span>
        </div>
      )}
      <p styleName='info'>
        <i className='material-icons' styleName='icon'>date_range</i> {liveDate}
        <i className='material-icons' styleName='icon'>place</i> {venue}
        <i className='material-icons' styleName='icon'>local_atm</i> {price}
      </p>
      {tags && (
        <div styleName='tags'>
          {tags.map(tag => <span styleName='tag' key={tag}>{`#${tag}`}</span>)}
        </div>
      )}
      {otherAttendees && <OtherAttendees/>}
    </CardText>
  ), style)

  return (
    <Card shadow={1} styleName='container'>
      <ConcertCardTitle/>
      <ConcertMedia/>
      <ConcertCardText/>
    </Card>
  )
}, style)


ConcertCard.propTypes = {
  digggerUrl: React.PropTypes.string.isRequired,
  avatarUrl: React.PropTypes.string.isRequired,
  digggerName: React.PropTypes.string.isRequired,
  thumbnailUrl: React.PropTypes.string.isRequired,
  concertTitle: React.PropTypes.string.isRequired,
  hasContest: React.PropTypes.bool.isRequired,
  isRegisteredInContest: React.PropTypes.bool.isRequired,
  liveDate: React.PropTypes.string.isRequired,
  venue: React.PropTypes.string.isRequired,
  price: React.PropTypes.string.isRequired,
  tags: React.PropTypes.arrayOf(React.PropTypes.string),
  otherAttendees: React.PropTypes.arrayOf(React.PropTypes.shape({
    displayName: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    avatar: React.PropTypes.string.isRequired
  }))
}


ConcertCard.fragments = {
  concert: new Fragment(gql`
    fragment ConcertCard on Concert {
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

export default ConcertCard
