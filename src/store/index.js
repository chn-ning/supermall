import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 安装Vuex插件
Vue.use(Vuex)

const state = {
  cartList: []
}

//创建store实例对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

//导出store实例并在Vue实例挂载
export default store