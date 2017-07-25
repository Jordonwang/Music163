import Vue from 'vue'
import Router from 'vue-router'
// import NotFoundPage from '../pages/NotFoundPage'
import {routerMode} from '../config/env'

Vue.use(Router)

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

const NotFoundPage = r => require.ensure([], () => r(require('../pages/NotFoundPage')), 'NotFoundPage')
const Home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const Friends = r => require.ensure([], () => r(require('@/pages/friends/friends')), 'friends')
const MyMusic = r => require.ensure([], () => r(require('@/pages/mymusic/mymusic')), 'mymusic')
const MyCount = r => require.ensure([], () => r(require('@/pages/mycount/mycount')), 'mycount')
const Commend = r => require.ensure([], () => r(require('@/pages/home/children/commend')), 'mycount')
const MusicList = r => require.ensure([], () => r(require('@/pages/home/children/musiclist')), 'musiclist')
const RadioStation = r => require.ensure([], () => r(require('@/pages/home/children/radiostation')), 'radiostation')
const Scoreboard = r => require.ensure([], () => r(require('@/pages/home/children/Scoreboard')), 'Scoreboard')
const playListDetail = r => require.ensure([], () => r(require('@/pages/home/children/children/playlistdetail')), 'playlistdetail')



var router =  new Router({
  mode:routerMode,
  routes: [
    {
      path: '/',
      redirect:'/home/commend'

    },
    {
      path: '/home',
      component: Home,
      children:[{
        path:'/home/commend',
        component:Commend
      },{
        path:'/home/musiclist',
        component:MusicList
      },{
        path:'/home/radiostation',
        component:RadioStation
      },{
        path:'/home/Scoreboard',
        component:Scoreboard
      }]
    },
    {
      path: '/friends',
      name: 'Friends',
      component: Friends
    },
    {
      path: '/mymusic',
      name: 'MyMusic',
      component: MyMusic
    },
    {
      path: '/mycount',
      name: 'MyCount',
      component: MyCount
    },
    {
      path:'/playlist/detail',
      name:'playlistdetail',
      component:playListDetail,
    },
    {
      path: '*',
      component: NotFoundPage
    },
  ]
})
export default router
