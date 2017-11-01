/**
 * Created by Administrator on 2017/6/27 0027.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state = {
  songSrc:'',
  playingSongId:'',
  songName:'',
  songImg:'',
  startTime:'00:00',
  totalTime:'00:00',
  isPlaying:false,
  homeInit:false,
  songlist:[],
  avatarUrl:'',
  currentSongListIndex:'',
  userID:'',
  loading:false
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
