<template>
  <ul>
    <li v-for="val in footerList">
      <router-link :to="val.to">
        <span class="icon iconfont" :class="val.icon"></span>
        <!--<img :src="val.imgSrc" :alt="val.title">-->
        <span>{{val.title}}</span>
      </router-link>
    </li>
  </ul>
</template>
<script>
  export default {
    data() {
      return {
        footerList: [{
          to: '/home/commend',
          title: '主页',
          imgSrc: '/static/home.png',
          icon: 'icon-home'
        }, {
          to: '/friends',
          title: '朋友',
          imgSrc: '/static/friends.png',
          icon: 'icon-friends'
        }, {
          to: '/mymusic',
          title: '音乐',
          imgSrc: '/static/music.png',
          icon: 'icon-music'
        }, {
          to: '/mycount',
          title: '账号',
          imgSrc: '/static/me.png',
          icon: 'icon-me'
        }]
      }
    }
  }
</script>
<style lang="scss" scoped>
  ul {
    position: fixed;
    bottom: 0;
    left: 0;
    list-style: none;
    display: flex;
    padding-left: 0;
    width: 100%;
    background: rgba(16, 14, 14, 0.9);
    margin: 0px;
    max-width: 480px;
    margin: 0 auto;
    right: 0;
    z-index: 1;
    li {
      display: flex;
      flex: 1;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      a {
        padding: 5px 0 3px 0;
        text-decoration: none;
        color: #b3b3b3;
        font-size: 12px;
        text-align: center;
        img {
          width: 20%
        }
        span {
          display: block
        }
      }
      a.router-link-active {
        /*background: #3CAEEA*/
        color:#fff;
        font-weight: bold;
      }
    }
  }
</style>
