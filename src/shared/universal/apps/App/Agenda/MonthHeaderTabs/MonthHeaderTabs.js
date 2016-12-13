import React from 'react'
import { HeaderTabs, Tab } from 'react-mdl'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import gql from 'graphql-tag'


const monthesWithConcertsQuery = gql`
  {
    monthesWithConcerts {
      displayName(format: "b. y")
      year
      num
    }
  }
`

const MonthHeaderTabs = ({
  tabs,
  changeTab
}) => (
  <HeaderTabs ripple activeTab={0}>
    {tabs.map(tab => <Tab key={tab.name} onClick={() => changeTab(tab.name)}>{tab.name}</Tab>)}
  </HeaderTabs>
)

const withMonthTabs = graphql(monthesWithConcertsQuery, {
  props({ data: { monthesWithConcerts }}) {
    return {
      tabs: (monthesWithConcerts || []).map(m => ({
        name: m.displayName,
        link: `${m.year}/${parseInt(m.num,10) < 10 ? 0+m.num : m.num}`
      }))
    }
  }
})

export default withMonthTabs(MonthHeaderTabs)
