import { createStore, applyMiddleware, combineReducers } from 'redux'

import moduxRoot from './moduxRoot'


export default function configureStore(apolloReducer, initialState) {
  console.log("moduxRoot.reducer", moduxRoot.reducer({}, {}))
  return createStore(
    combineReducers({
      apollo: apolloReducer,
      diggger: moduxRoot.reducer
    }),
    initialState
  )
}
