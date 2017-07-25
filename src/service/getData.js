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
  id:id,
  // limit:30
})
