import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'

import { StateInterface, UserInfo } from './interface'

Vue.use(Vuex)

const state: StateInterface = {
  user: null
}

const actions = {

}
const mutations = {
  setUser (state, user: UserInfo) {
    state.user = user
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
