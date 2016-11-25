import React from 'react'
import { IconButton } from 'react-mdl'

const Pager = ({
  pagesCount,
  currentPage,
  goToNextPage,
  goToPreviousPage
}) => {
  const isLastPage = currentPage === pagesCount
  const isFirstPage = currentPage === 1
  return (
    <div>
      <IconButton name='keyboard_arrow_left' onClick={isFirstPage ? null : goToPreviousPage} disabled={isFirstPage}/>
      <span>{`${currentPage}/${pagesCount}`}</span>
      <IconButton name='keyboard_arrow_right' onClick={isLastPage ? null : goToNextPage} disabled={isLastPage}/>
    </div>
  )
}

export default Pager
