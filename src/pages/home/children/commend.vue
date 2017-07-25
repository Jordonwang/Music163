<template>
  <div class="commend">
    <!--<swiper :options="swiperOption" ref="mySwiperA">-->
      <!--<swiper-slide v-for="src in imgSrc" :key="src.pic">-->
        <!--<img class="banner" :src="src.pic" :alt="src.typeTitle">-->
      <!--</swiper-slide>-->
      <!--<div class="swiper-pagination" slot="pagination"></div>-->
      <!--<div class="swiper-scrollbar"  slot="scrollbar"></div>-->
    <!--</swiper>-->
    <div class="recmdList">
      <header>
        <p class="header">推荐歌单</p>
        <ul>
          <li v-for="(val,index) in recommend" v-if="index>2?false:true">
            <router-link :to="{path:'/playlist/detail',query:{id:val.id}}">
            <!--<router-link :to="'/playlist/detail/'+{{val.id}}">-->
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
            <router-link :to="{path:'/playlist/detail',query:{id:val.id}}">
              <img :src="val.picUrl" :alt="val.name" >
              <p>{{val.name}}</p>
            </router-link>
          </li>
        </ul>
      </header>
    </div>
    <type-loading v-if="loading"></type-loading>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {getBannerImg,getRecmdList,getNewSong} from '@/service/getData'
//  import VueAwesomeSwiper from 'vue-awesome-swiper'
  import typeLoading from '@/components/loading'

//  Vue.use(VueAwesomeSwiper)
  export default{
    data(){
      return {
        imgSrc:[],
        recommend:[],
        newSong:[],
        loading:true,
        swiperOption: {
          // 所有配置均为可选（同Swiper配置）
          autoplay: 3000,
          notNextTick: true,
          speed: 500,
          loop: true,
          grabCursor : true,
          setWrapperSize :true,
//          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          scrollbar:'.swiper-scrollbar',
          mousewheelControl : true,
          autoplayDisableOnInteraction : false,
          observer:true,
          observeParents:true,
          onTransitionStart(swiper){
//            console.log(swiper)
          }
        }
      }
    },
    components:{
      typeLoading
    },
    computed:{
      swiper() {
//        return this.$refs.mySwiperA.swiper
      },

    },
    created(){
      this.initData();
    },
    mounted() {

    },
    methods:{
      async initData(){
        let baners = await getBannerImg()
        this.imgSrc = baners.banners

        let recmodList = await getRecmdList();
        this.recommend = recmodList.recommend

        let newSong = await getNewSong();
        this.newSong = newSong.result
        this.hideLoading();
      },
      hideLoading(){
        this.loading = false;
      }
    }
  }
</script>
<style lang="scss">

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
          height: 40px;
          overflow: hidden;
        }
      }
    }
  }
</style>
