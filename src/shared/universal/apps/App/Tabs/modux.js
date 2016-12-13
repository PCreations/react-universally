import React from 'react'
import { connect } from 'react-redux'
import moduxFactory from 'modux-js'


const types = {
  CHANGE_TAB: 'diggger-front/CHANGE_TAB'
}

export const init = activeTab => activeTab

const defaultInitialState = init(0)

export default moduxFactory(context => ({
  initReducer(initialState = defaultInitialState, action = {}) {
    return (activeTab = 0, action = {}) => {
      if (action.type === types.CHANGE_TAB) {
        return action.payload.tab
      }
      return activeTab
    }
  },
  actions: {
    changeTab(tab) {
      return {
        type: types.CHANGE_TAB,
        payload: { tab }
      }
    }
  },
  selectors: {
    getActiveTab(activeTab) { return activeTab }
  },
  initView({ actions, selectors }) {
    const ActiveTabProvider = ({
      renderTabs,
      activeTab,
      changeTab
    }) => renderTabs({ activeTab, changeTab })

    ActiveTabProvider.propTypes = {
      renderTabs: React.PropTypes.func.isRequired,
      activeTab: React.PropTypes.any.isRequired,
      changeTab: React.PropTypes.func.isRequired
    }

    const ActiveTabContainer = connect(
      state => ({
        activeTab: selectors.getActiveTab(state)
      }),
      dispatch => ({
        changeTab: tab => dispatch(actions.changeTab(tab))
      }),
      (stateProps, dispatchProps, ownProps) => ({
        renderTabs: ownProps.children,
        ...stateProps,
        ...dispatchProps
      })
    )(ActiveTabProvider)

    ActiveTabContainer.propTypes = {
      children: React.PropTypes.func.isRequired
    }

    return ActiveTabContainer
  }
}))