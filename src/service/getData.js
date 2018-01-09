/**
 * Created by Administrator on 2017/7/19 0019.
 */
import fetch from '../util/fetch'
/*
* 登录
* */
export const sendLogin = (mobile,password) => fetch('/login/cellphone', {
  phone:mobile,
  password:password
}, 'GET');

/*
*获取banner图
*/
export const getBannerImg = () => fetch('/banner')
/*
* 获取推荐歌单
* */
export const getRecmdList = () => fetch('/recommend/resource')
/*
* 推荐电台
* */
export const getNewSong = () => fetch('/personalized/djprogram')
/*
* 获取歌单详情
* */
export const getRecomdDetails = (id) => fetch('/playlist/detail',{
  id:id
})
/*
* 获取歌曲详情
* */
export const getSongDetails = (id) => fetch('/song/detail',{
  ids:id
})
/*
* 获取歌曲url
* */
export const getSongUrl = (id) => fetch('/music/url',{
  id:id
})
/*
 * 获取歌词
 * */
export const getSonglyric = (id) => fetch('/lyric',{
  id:id
})
/*
* 搜索
* */
export const getSearch = (keywords) => fetch('/search',{
  keywords:keywords,
  limit :10
})
/*
*获取电台详细
**/
export const getdjdetail = (id) => fetch('/dj/detail',{
	rid:id
})
/*
* 获取精品歌单
* */
export const getTopSongList = (limit) => fetch('/top/playlist/highquality',{
	limit:limit || 11
})
/*
* 云音乐排行榜
* */
export const getTopList = (idx) => fetch('/top/list',{
  idx:idx
})
/*
* 获取用户歌单
* */
export const getUserList = (userId) => fetch('/user/playlist',{
  uid:userId
})
/*
* 获取动态消息
* */
export const getFriendsInfo = () => fetch('/event')
/*
 * 获取推荐电台
 * */
export const getdjrecommend = () => fetch('/dj/recommend')
/*
 * 电台分类
 * */
export const getdjcatelist = () => fetch('/dj/catelist')

/*
 * 电台分类推荐
 * */
export const getdjbytype = (type) => fetch('/dj/recommend/type',{
  type:type
})
/*
 * 获取MV
 * */
export const getNewMV = (limit) => fetch('/mv/first',{
  limit:6
})
/*
 * 获取MV详细信息
 * */
export const getMVdetail = (id) => fetch('/mv',{
  mvid:id
})
/*
 * 播放MV
 * */
export const playMV = (url) => fetch('/mv/url',{
  url:url
})
/*
* 获取歌曲评论
* */
export const getMusicComment = (id,offset) => fetch('/comment/music',{
  id:id,
  limit:20,
  offset:offset*20 || 0
})
