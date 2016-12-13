import React from 'react'
import connect from 'react-redux'
import moduxFactory from 'modux-js'

import TabsModux from '../../Tabs'
import MonthHeaderTabs from './MonthHeaderTabs'


export default moduxFactory(context => {
  context.add(TabsModux, 'tabs')
  return {
    initView() {
      const TabsProvider = context.getView('tabs')
      return () => (
        <TabsProvider>
          {({ activeTab, changeTab }) => (
            <MonthHeaderTabs changeTab={changeTab}/>
          )}
        </TabsProvider>
      )
    }
  }
})