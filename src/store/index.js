/**
 * Created by Administrator on 2017/6/27 0027.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import info from './modules/info'

Vue.use(Vuex)

const state ={
    data:0,
}

export default new Vuex.Store({
  state,
  mutations,
  modules:{
    info
  }
})
