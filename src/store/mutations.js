/**
 * Created by Administrator on 2017/6/27 0027.
 */
import {
  UPDATE_SONGSRC,
  UPDATE_PLAYINGSONGID,
  UPDATE_PLAYINGSONGNAME,
  UPDATE_PLAYINGSONGIMG,
  UPDATE_STARTTIME,
  UPDATE_TOTALTIME,
  UPDATE_SONGLIST,
  UPDATE_CURRENTSONGLISTINDEX,
  UPDATE_HOMEINIT,
  UPDATE_ISPLAYING,
  UPDATE_USERID,
  UPDATE_AVATARURL,
  UPDATE_LOADING
} from './mutation-types'
export default {
  [UPDATE_SONGSRC](state,songsrc){
    return state.songSrc = songsrc
  },
  [UPDATE_PLAYINGSONGID](state,id){
    return state.playingSongId = id
  },
  [UPDATE_PLAYINGSONGNAME](state,name){
    return state.songName = name
  },
  [UPDATE_PLAYINGSONGIMG](state,img){
    return state.songImg = img
  },
  [UPDATE_STARTTIME](state,time){
    return state.startTime = time
  },
  [UPDATE_TOTALTIME](state,time){
    return state.totalTime = time
  },
  [UPDATE_SONGLIST](state,list){
    return state.songlist = list
  },
  [UPDATE_CURRENTSONGLISTINDEX](state,index){
    return state.currentSongListIndex = index
  },
  [UPDATE_HOMEINIT](state,isTure){
    return state.homeInit = isTure
  },
  [UPDATE_ISPLAYING](state,isplay){
    return state.isPlaying = isplay
  },
  [UPDATE_USERID](state,ID){
    return state.userID = ID
  },
  [UPDATE_AVATARURL](state,url){
    return state.avatarUrl = url
  },
  [UPDATE_LOADING](state,flag){
    return state.loading = flag
  }
}
