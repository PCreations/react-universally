import React from 'react'
import { IconButton } from 'react-mdl'

const Pager = ({
  pagesCount,
  currentPage,
  goToNextPage,
  goToPreviousPage
}) => (
  <div>
    <IconButton name='keyboard_arrow_left' onClick={goToPreviousPage}/>
    <span>{`${currentPage}/${pagesCount}`}</span>
    <IconButton name='keyboard_arrow_right' onClick={goToNextPage}/>
  </div>
)

export default Pager
