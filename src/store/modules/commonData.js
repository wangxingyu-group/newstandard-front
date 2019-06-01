// 定义全局变量
const state = {
  currentCustomer: null,
  callInNo: '13810600758',
  clientWidth: 0,
  minClientWidth: 1400,
  searchRow1: 'calc(100vh - 332px)',
  searchRow2: 'calc(100vh - 383px)',
  searchRow3: 'calc(100vh - 434px)',
  searchRow4: 'calc(100vh - 485px)'
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
