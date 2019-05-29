// 定义全局变量
const state = {
  currentCustomer: null,
  callInNo: '13810600758',
  clientWidth: 0,
  minClientWidth: 1400
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
