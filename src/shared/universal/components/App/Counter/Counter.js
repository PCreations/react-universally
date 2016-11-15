import React from 'react'
import { FABButton } from 'react-mdl'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'


const Counter = ({ increment, value }) => (
  <FABButton colored ripple style={{ width: '56px' }} onClick={increment}>
    {value}
  </FABButton>
)


const query = gql`
  { counter }
`

const incrementCounter = gql`
  mutation incrementCounter {
    incrementCounter
  }
`

const withValue = graphql(query, {
  props({ ownProps, data: { counter }}) {
    return {
      ...ownProps,
      value: counter
    }
  },
  options() {
    return {
      reducer: (prev, action) => {
        if (action.type === 'APOLLO_MUTATION_RESULT' && action.operationName === 'incrementCounter') {
          return {
            counter: action.result.data.incrementCounter
          }
        }
        return prev
      }
    }
  }
})

const withIncrementCounter = graphql(incrementCounter, {
  props({ ownProps, mutate }) {
    return {
      increment: () => mutate({
        optimisticResponse: {
          incrementCounter: ownProps.value + 1
        }
      })
    }
  }
})

export default compose(
  withValue,
  withIncrementCounter
)(Counter)
