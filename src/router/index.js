import Vue from 'vue'
import Router from 'vue-router'
// import NotFoundPage from '../pages/NotFoundPage'
import {routerMode} from '../config/env'

Vue.use(Router)

Router.prototype.goBack = function (num) {
  this.isBack = num
  console.log('Router.prototype.goBack'+num)
  window.history.go(-1)
}

const NotFoundPage = r => require.ensure([], () => r(require('../pages/NotFoundPage')), 'NotFoundPage')
const Home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const Friends = r => require.ensure([], () => r(require('@/pages/friends/friends')), 'friends')
const MyMusic = r => require.ensure([], () => r(require('@/pages/mymusic/mymusic')), 'mymusic')
const MyCount = r => require.ensure([], () => r(require('@/pages/mycount/mycount')), 'mycount')
const Commend = r => require.ensure([], () => r(require('@/pages/home/children/commend')), 'commend')
const MusicList = r => require.ensure([], () => r(require('@/pages/home/children/musiclist')), 'musiclist')
const RadioStation = r => require.ensure([], () => r(require('@/pages/home/children/radiostation')), 'radiostation')
const Scoreboard = r => require.ensure([], () => r(require('@/pages/home/children/Scoreboard')), 'Scoreboard')
const playListDetail = r => require.ensure([], () => r(require('@/pages/home/children/commendChildren/playlistdetail')), 'playlistdetail')
const playListDetailforTop = r => require.ensure([], () => r(require('@/pages/home/children/scoreboardChildren/playlistdetailfortop')), 'playListDetailforTop')
const playMusic = r => require.ensure([], () => r(require('@/pages/playMusic')), 'playMusic')
const pageTransition = r => require.ensure([], () => r(require('@/components/pagetransition')), 'pagetransition')
const message = r => require.ensure([], () => r(require('@/pages/mycount/children/message')), 'message')
const playingMV = r => require.ensure([], () => r(require('@/pages/home/children/commendChildren/playingMV')), 'playingMV')
const musicComment = r => require.ensure([], () => r(require('@/pages/musicComment')), 'musicComment')



var router =  new Router({
  mode:routerMode,
  routes: [
    {
      path: '/',
      redirect:'/home/commend',
      component:pageTransition
    },
    {
      path: '/home',
      redirect:'/home/commend',
      component:pageTransition
    },
    {
      path: '/home',
      component: Home,
      children:[{
        path:'commend',
        component:Commend,
        children:[{
          path:'playingmv',
          component:playingMV
        }]
      },{
        path:'musiclist',
        component:MusicList
      },{
        path:'radiostation',
        component:RadioStation
      },{
        path:'Scoreboard',
        component:Scoreboard,
        children:[{
          path:'detail',
          component:playListDetailforTop
        }]
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
      component: MyCount,
      children:[{
        path:'message',
        component:message
      }]
    },
    {
      path:'/playlist/detail',
      name:'playlistdetail',
      component:playListDetail,
    },
    {
      path:'/playmusic',
      name:'playMusic',
      component:playMusic
    },
    {
      path:'/musicComment/:id',
      name:'musicComment',
      component:musicComment,

    },
    {
      path: '*',
      component: NotFoundPage
    },
  ]
})
export default router
