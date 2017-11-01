/**
 * Created by Administrator on 2017/7/27 0027.
 */
import {getSongUrl,getSonglyric,getSongDetails,getUserList} from '@/service/getData'
import {
  UPDATE_SONGSRC,
  UPDATE_PLAYINGSONGID,
  UPDATE_PLAYINGSONGIMG,
  UPDATE_PLAYINGSONGNAME,
  UPDATE_USERID,
  UPDATE_AVATARURL
} from './mutation-types'

export default {
  //获取音乐url
  async GetSongUrl({commit,state},id){
    let songurl = await getSongUrl(id);
    commit(UPDATE_SONGSRC,songurl.data[0].url)
  },
  //获取播放音乐详细信息
  async GetSongDetail({commit,state},id){
    let songdetail = await getSongDetails(id)
    commit(UPDATE_PLAYINGSONGID,songdetail.songs[0].id)
    commit(UPDATE_PLAYINGSONGIMG,songdetail.songs[0].al.picUrl)
    commit(UPDATE_PLAYINGSONGNAME,songdetail.songs[0].name)
  },
  //更新用户ID
  async getUserId({commit,state},id){
    commit(UPDATE_USERID,id)
  },
  //更新用户头像
  async setUserAvatarUrl({commit,state},url){
    commit(UPDATE_AVATARURL,url)
  }
}
