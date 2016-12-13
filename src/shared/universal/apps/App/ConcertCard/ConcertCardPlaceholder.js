import React from 'react'
import { Card, CardTitle, CardText } from 'react-mdl';
import CSSModules from 'react-css-modules';

import style from './style.css';


const ConcertCardTitlePlaceholder = CSSModules(() => (
  <CardTitle styleName='placeholder-title'>
    <img src='/images/diggger_default_avatar.jpg' styleName='avatar'/>
    <div styleName='diggger-name-container'>
      <div styleName='text-placeholder'/>
      <div styleName='text-placeholder'/>
    </div>
  </CardTitle>
), style)


const ConcertCardMediaPlaceholder = CSSModules(() => (
  <img src='/images/video_placeholder.jpg' styleName='media'/>
), style)


const ConcertCardTextPlaceholder = CSSModules(() => (
  <CardText>
    <div styleName='concert-name-placeholder'/>
    <div styleName='text-placeholder'/>
    <div styleName='text-placeholder'/>
  </CardText>
), style)


const ConcertCardPlaceholder = CSSModules(() => (
  <Card shadow={1} styleName='container'>
    <ConcertCardTitlePlaceholder/>
    <ConcertCardMediaPlaceholder/>
    <ConcertCardTextPlaceholder/>
  </Card>
), style)

export default ConcertCardPlaceholder
