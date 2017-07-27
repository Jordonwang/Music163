/**
 * Created by Administrator on 2017/6/27 0027.
 */
import {
  UPDATE_SONGSRC,
  UPDATE_PLAYINGSONGID,
  UPDATE_PLAYINGSONGNAME,
  UPDATE_PLAYINGSONGIMG,
  UPDATE_STARTTIME,
  UPDATE_TOTALTIME
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
  }
}
