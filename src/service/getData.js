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
