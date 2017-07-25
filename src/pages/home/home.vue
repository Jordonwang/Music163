<template>
  <div>
    <div class="head">
      <i class="el-icon-setting"></i>
      <input class="search" type="text" placeholder="搜索音乐 歌词 电台">
      <i class="el-icon-more"></i>
    </div>
    <div class="nav">
      <ul>
        <li>
          <router-link to="/home/commend">个性推荐</router-link>
        </li>
        <li>
          <router-link to="/home/musiclist">歌单</router-link>
        </li>
        <li>
          <router-link to="/home/radiostation">主播电台</router-link>
        </li>
        <li>
          <router-link to="/home/Scoreboard">排行榜</router-link>
        </li>
      </ul>
    </div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <footer-view></footer-view>
  </div>
</template>
<script>
  import Vue from 'vue'
  import footerView from '@/components/footer'
//  import {getBannerImg} from '@/service/getData'
//  import VueAwesomeSwiper from 'vue-awesome-swiper'

//  Vue.use(VueAwesomeSwiper)

  export default{
    data(){
      return {
      }
    },
    components:{
        footerView
    },
    computed:{
    },
    created(){
    },
    mounted() {
    },
    methods:{
    }
  }
</script>
<style lang="scss">
  .banner{
    width: 100%
  }
  .swiper-pagination-bullet-active{
    background:#fff;
  }
  .swiper-pagination-bullet{
    width: 6px;
    height: 6px;
  }
  .swiper-container-autoheight, .swiper-container-autoheight .swiper-slide{
    min-height: 140px;
  }
  .head{
    background:#3CAEEA;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    i{
      color: #fff;
    }
    .search{
      width:70%;
      margin: 3px;
      height: 30px;
      border-radius: 15px;
      border: 1px solid #3CAEEA;
      text-indent: 68px;
    }
  }
  .nav{
    background: rgba(248, 248, 250, 0.86);
    position: fixed;
    top: 38px;
    left: 0;
    z-index: 2;
    width: 100%;
    ul{
      list-style: none;
      padding-top: 10px;
  li{
        adding-bottom: 8px;
        width:24%;
        display:inline-block;
        a{
          text-decoration: none;
          color: #000;
          font-size: 14px;
          padding-bottom: 7px;
          width: 100%;
          display: inline-block;
          text-align: center;
        }
        .router-link-active{
          border-bottom: 2px solid red;
        }
      }
    }

  }
</style>
