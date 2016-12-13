import React from 'react'
import moduxFactory from 'modux-js'

import monthHeaderTabsModux from './apps/App/Agenda/MonthHeaderTabs'

export default moduxFactory(context => {
  context.add(monthHeaderTabsModux, 'monthHeaderTabs')
  return {
    initView() {
      return {
        MonthHeaderTabs: context.getView('monthHeaderTabs')
      }
    }
  }
})()