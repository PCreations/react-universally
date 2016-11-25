import React from 'react'
import { connect } from 'react-redux'
import moduxFactory from 'modux-js'

export const types = {
  GO_TO_NEXT_PAGE: 'tvmag/pagination-list/GO_TO_NEXT_PAGE',
  GO_TO_PREVIOUS_PAGE: 'tvmag/pagination-list/GO_TO_PREVIOUS_PAGE'
}

const defaultInitialState = {
  currentPage: 1
}

export default moduxFactory(context => {
  return {
    initReducer(initialState = defaultInitialState) {
      return (state = initialState, action = {}) => {
        switch (action.type) {
          case types.GO_TO_NEXT_PAGE:
            return {
              ...state,
              currentPage: state.currentPage + 1
            }
          case types.GO_TO_PREVIOUS_PAGE:
            return {
              ...state,
              currentPage: state.currentPage - 1
            }
          default:
            return state
        }
      }
    },
    actions: {
      goToNextPage() {
        return {
          type: types.GO_TO_NEXT_PAGE,
        }
      },
      goToPreviousPage() {
        return {
          type: types.GO_TO_PREVIOUS_PAGE
        }
      }
    },
    selectors: {
      getCurrentPage(state) {
        return state.currentPage
      }
    },
    initView({ actions, selectors }) {
      const PaginationRenderer = ({
        goToNextPage,
        goToPreviousPage,
        currentPage,
        renderPagination
      }) => renderPagination({ goToNextPage, goToPreviousPage, currentPage })

      const Pagination = connect(
        state => ({
          currentPage: selectors.getCurrentPage(state)
        }),
        dispatch => ({
          goToNextPage() { dispatch(actions.goToNextPage()) },
          goToPreviousPage() { dispatch(actions.goToPreviousPage()) }
        }),
        (stateProps, dispatchProps, ownProps) => ({
          ...stateProps,
          ...dispatchProps,
          renderPagination: ownProps.children
        })
      )(PaginationRenderer)

      return Pagination
    }
  }
})