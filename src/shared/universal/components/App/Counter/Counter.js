import React from 'react'
import { FABButton } from 'react-mdl'
import { graphql, withApollo, compose } from 'react-apollo'
import gql from 'graphql-tag'


const query = gql`
  { counter }
`

const incrementCounter = gql`
  mutation incrementCounter {
    incrementCounter
  }
`

const subscriptionQuery = gql`
  subscription onCounterIncremented {
    counterIncremented
  }
`

const Counter = ({ increment, value }) => (
  <FABButton colored ripple style={{ width: '56px' }} onClick={increment}>
    {value}
  </FABButton>
)


class CounterWithSubscriptions extends React.Component {

  componentWillReceiveProps(newProps) {
    if (!newProps.loading) {
      if (this.subscription) {
        if (newProps.value !== this.props.value) {
          // if the value has changed, we need to unsubscribe before resubscribing
          this.unsubscribe();
        } else {
          // we already have an active subscription with the right params
          return;
        }
      }
      this.unsubscribe = newProps.subscribeToMore({
        document: subscriptionQuery,
        // this is where the magic happens.
        updateQuery: (previousResult, { subscriptionData }) => {
          const newCounterValue = subscriptionData.data.counterIncremented;
          const newResult = {
            ...previousResult,
            counter: newCounterValue
          }
          return newResult;
        },
      });
    }
  }

  render() {
    return <Counter increment={this.props.increment} value={this.props.value}/>
  }
}


const withValue = graphql(query, {
  props({ ownProps, data: { loading, counter, subscribeToMore }}) {
    return {
      ...ownProps,
      value: counter,
      loading,
      subscribeToMore
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
      ...ownProps,
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
)(CounterWithSubscriptions)
