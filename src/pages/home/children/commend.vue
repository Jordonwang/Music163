<template>
  <div class="commend">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="src in imgSrc" :key="src.pic">
          <img class="banner" :src="src.pic" :alt="src.typeTitle">
        </div>
      </div>
    </div>
    <div v-if="userID" class="recmdList">
      <header>
        <p class="header">推荐歌单</p>
        <ul>
          <li v-for="(val,index) in recommend" v-if="index>2?false:true">
            <router-link :to="{path:'/playlist/detail',query:{id:val.id}}">
            <img :src="val.picUrl" :alt="val.name" >
            <p>{{val.name}}</p>
            </router-link>
          </li>
        </ul>
      </header>
    </div>
    <div class="recmdList">
      <header>
        <p class="header">推荐电台</p>
        <ul>
          <li v-for="(val,index) in newSong" v-if="index>5?false:true">
            <router-link :to="{path:'/playlist/detail',query:{id:val.id,type:'dj'}}">
              <img :src="val.picUrl" :alt="val.name" >
              <p>{{val.name}}</p>
            </router-link>
          </li>
        </ul>
      </header>
    </div>
    <div class="recmdList mv">
      <header>
        <p class="header">最新MV</p>
        <ul>
          <li v-for="(val,index) in newMV">
            <router-link :to="{path:'/home/commend/playingmv',query:{id:val.id}}">
              <img :src="val.cover" :alt="val.name" >
              <p>{{val.briefDesc}}</p>
              <p>{{val.artistName}}</p>
            </router-link>
          </li>
        </ul>
      </header>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="paddingbtm"></div>
    <type-loading v-if="loading"></type-loading>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {getBannerImg,getRecmdList,getNewSong,getNewMV} from '@/service/getData'
  import typeLoading from '@/components/loading'
  import {mapState,mapMutations} from 'vuex'

  export default{
    data(){
      return {
        imgSrc:[],
        recommend:[],
        newSong:[],
        newMV:[],
        loading:true,
      }
    },
    components:{
      typeLoading
    },
    computed:{
      ...mapState(['userID'])
    },
    created(){
      console.log('created')
    },
    mounted() {
      console.log('mounted')
      this.initData();
      var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,//可选选项，自动滑动
        paginationClickable: true,
        speed: 500,
        loop: true,
        observer:true,
        observeParents:true,
        autoplayDisableOnInteraction : false,
      })
    },
    methods:{
      ...mapMutations(['UPDATE_HOMEINIT']),
      async initData(){
        let baners = await getBannerImg()
        this.imgSrc = baners.banners

        let recmodList = await getRecmdList();
        this.recommend = recmodList.recommend

        let newSong = await getNewSong();
        this.newSong = newSong.result
        this.hideLoading();
        this.UPDATE_HOMEINIT(true)

        let NewMV = await getNewMV()
        this.newMV = NewMV.data
      },
      hideLoading(){
        this.loading = false;
      }
    }
  }
</script>
<style lang="scss">
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
  .paddingbtm{
    padding-bottom: 50px;
  }
  .recmdList{
    .header{
      padding-left: 10px;
      margin: 10px;
      font-size:18px;
      border-left: 1px solid #ccc;
    }
    ul
      li{
      width:30%;
      padding: 0 1.5%;
      display:inline-block;
      a{
        text-decoration: none;
        color: #000;
        img{
          width:100%;
        }
        p{
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          position: relative;
          height:2.8em;
          line-height: 1.4em;
          overflow: hidden;
          font-size: 14px;
        }
      }
    }
  }
  .mv{
    header{
      ul{
        li{
          img{
            height:90px;
          }
        }
      }
    }
  }
</style>
