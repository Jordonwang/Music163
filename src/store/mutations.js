/**
 * Created by Administrator on 2017/6/27 0027.
 */
import {ADD_NUM,REDUCE_NUM} from './mutation-types'
export default {
  [ADD_NUM](state){
    console.log(state)
    return state.data+=10
  },
  [REDUCE_NUM](state,n){
    return state.data-=n
  }
}
