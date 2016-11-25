import React from 'react'
import moduxFactory from 'modux-js'

import paginationModux from '../shared/universal/moduxes/pagination-list'


let rootContext

export const getRootContext = () => rootContext

global.getRootContext = getRootContext

export default moduxFactory(context => {
  rootContext = context
  context.add(paginationModux, 'tvProgramPagination')
  context.add(paginationModux, 'tvNewsPagination')
  context.add(paginationModux, 'peoplePagination')
  context.add(paginationModux, 'seriesPagination')
  return { initView: () => null }
})()
