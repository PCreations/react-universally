import React from 'react'
import { HeaderTabs, Tab } from 'react-mdl'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';


const monthesWithConcertsQuery = gql`
  {
    monthesWithConcerts {
      displayName(format: "b. y")
    }
  }
`

const MonthHeaderTabs = ({
  tabs
}) => (
  <HeaderTabs ripple activeTab={0}>
    {tabs.map(tab => <Tab key={tab}>{tab}</Tab>)}
  </HeaderTabs>
)

const withMonthTabs = graphql(monthesWithConcertsQuery, {
  props({ data: { monthesWithConcerts }}) {
    return {
      tabs: (monthesWithConcerts || []).map(m => m.displayName)
    }
  }
})

export default withMonthTabs(MonthHeaderTabs)
