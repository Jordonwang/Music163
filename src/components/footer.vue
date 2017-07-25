<template>
  <ul>
    <li v-for="val in footerList">
      <img :src="val.imgSrc" alt="">
      <router-link :to="val.to">{{val.title}}</router-link>
    </li>
  </ul>
</template>
<script>
  export default {
      data(){
        return {
            footerList:[{
                to:'/home',
                title:'主页',
                imgSrc:'/static/home.png'
            },{
                to:'/friends',
                title:'朋友',
                imgSrc:'/static/friends.png'
            },{
                to:'/mymusic',
                title:'音乐',
                imgSrc:'/static/music.png'
            },{
                to:'/mycount',
                title:'账号',
                imgSrc:'/static/me.png'
            }]
        }
      }
  }
</script>
<style lang="scss" scoped>
  ul{
    position: fixed;
    bottom: 0;
    left:0;
    list-style: none;
    display: flex;
    padding-left:0;
    width:100%;
    background:rgba(16, 14, 14, 0.8);
    margin: 0px;
    padding-top: 5px;
    max-width: 480px;
    margin: 0 auto;
    right: 0;
    li{
      display:flex;
      flex: 1;
      justify-content:center;
      flex-direction: column;
      align-items: center;
      img{
        width:20%
      }
      a{
        padding:1px 0 3px 0;
        text-decoration:none;
        color:#fff;
        font-size: 12px;
      }
    }

  }
</style>
