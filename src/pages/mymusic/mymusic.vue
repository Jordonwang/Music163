<template>
    <div class="div">
      <div class="nav">
        <p class="nav-title">我的音乐</p>
      </div>
      <div class="header">
        <ul class="list">
          <li v-for="val in list">
            <router-link :to="val.to">
              <div class="list-left">
                <img :src="val.imgSrc" width="30px" height="30px" class="img-icon">
              </div>
              <div class="list-right">
                <span class="list-title">{{val.title}}</span>
                <img src="/static/right_arrow.png" class="arrow" width="12px" height="16px">
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="created-music">

      </div>
      <!--<transition name="router-slid" mode="out-in">-->
        <!--<router-view></router-view>-->
      <!--</transition>-->
      <footer-view></footer-view>
    </div>


</template>
<script>
  import footerView from '@/components/footer'
//  import {sendLogin} from '@/service/getData'
  export default{
    data() {
      return {
        list:[{
          to:'/message',
          title: '本地音乐',
          imgSrc:'/static/my_icn_music.png'
        },
          {
            to:'/message',
            title: '最近播放',
            imgSrc:'/static/my_icn_recent.png'
          },
          {
            to:'/message',
            title: '我的电台',
            imgSrc:'/static/my_icn_radio.png'
          },
          {
            to:'/message',
            title: '我的收藏',
            imgSrc:'/static/my_icn_fav.png'
          }]
      }
    },
    components:{
      footerView
    }
  }
</script>
<style scoped>
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
  .div{
    background: #f5f5f5;
  }
  .nav{
    background: #3CAEEA;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    text-align: center;
  }
  .nav-title{
    color: white;
    text-align: center;
    padding: 10px 0 0 0px;
  }
  .list-left{
    display: inline-block;
    width: 10%;
    margin: 20px 10px;

  }
  .img-icon{
    /*margin: 10px 10px;*/
    vertical-align: middle;
  }
  .list-right{
    display: inline-block;
    width: 90%;
    border-bottom: 1px solid #f0f0f0;
  }
  .list-title{
    font-size: 16px;
  }
  .arrow{
    float: right;
    right: 10px;
    margin-top: 15px;
    margin-right: 10px;
  }
  a{
    text-decoration: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: black;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: white;
  }

</style>
