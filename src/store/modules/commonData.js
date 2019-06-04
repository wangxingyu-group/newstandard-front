// 定义全局变量
const state = {
  currentCustomer: null,
  callInNo: '13810600758',
  clientWidth: 0,
  minClientWidth: 1400,
  searchRow1: 'calc(100vh - 340px)',
  searchRow2: 'calc(100vh - 391px)',
  searchRow3: 'calc(100vh - 442px)',
  searchRow4: 'calc(100vh - 493px)',
  rightPanelShow: false
}
const mutations = {
  SET_CURRENT_CUSTOMER: (state, currentCustomer) => {
    state.currentCustomer = currentCustomer
  },
  SET_CALLIN_NO: (state, callInNo) => {
    state.callInNo = callInNo
  },
  SET_CLIENT_WIDTH: (state, clientWidth) => {
    state.clientWidth = clientWidth
  },
  SET_RIGHT_PANEL_SHOW: (state, rightPanelShow) => {
    state.rightPanelShow = rightPanelShow
  }
}

const actions = {
  setCurrentCustomer({ commit }, currentCustomer) {
    commit('SET_CURRENT_CUSTOMER', currentCustomer)
  },
  setCallInNo({ commit }, callInNo) {
    commit('SET_CALLIN_NO', callInNo)
  },
  setClientWidth({ commit }, clientWidth) {
    commit('SET_CLIENT_WIDTH', clientWidth)
  },
  setRightPanelShow({ commit }, rightPanelShow) {
    commit('SET_RIGHT_PANEL_SHOW', rightPanelShow)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
