import { createStore, combineReducers } from 'redux'

import root from './root'


console.log("root reducer state", root.reducer({}))

export default function configureStore(apolloReducer, initialState) {
  const store = createStore(
    (state = {}, action = {}) => {
      const { apollo, ...rest } = state
      return {
        apollo: apolloReducer(apollo, action),
        ...root.reducer(rest, action)
      }
    },
    initialState
  )

  return store
}