<template>
  <div>
    <header>
      <is-play></is-play>
      <p>朋友动态</p>
      <is-play></is-play>
    </header>
    <ul>
      <li v-for="(val,index) in infoList">
        <div class="left">
          <img :src="val.user.avatarUrl" alt="">
        </div>
        <div class="right">
          <header>
            <span v-text="val.user.nickname"></span>
            <span v-text="val.info.commentThread.resourceTitle"></span>
          </header>
          <div class="main" v-if="val.info.commentThread.resourceTitle == '发布的短视频'">
            <p>{{val.json | JsonMSG}}</p>
            <div>
              <video @click="playVideo" :src="val.json | JsonSRC" :poster="val.json | JsonIMG"></video>
              <img src="/static/play.png" alt="">
            </div>
          </div>
          <div class="main" v-else>
            <p>{{val.json | JsonMSG}}</p>
            <div class="pics">
              <ul>
                <li v-for="val in val.pics">
                  <img @click="showImg" :src="val.squareUrl" alt="">
                </li>
              </ul>
            </div>
          </div>
          <div class="footer">
            <p v-text="val.rcmdInfo.reason"></p>
            <ul>
              <li>
                <img src="/static/friendslove.png" alt="">
                <span v-text="val.info.likedCount"></span>
              </li>
              <li>
                <img src="/static/friendcomment.png" alt="">
                <span v-text="val.info.commentCount"></span>
              </li>
              <li>
                <img src="/static/friendshare.png" alt="">
                <span v-text="val.info.shareCount"></span>
              </li>
              <li>
                <img src="/static/friendmore.png" alt="">
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div class="showImg" v-if="showImgs">
      <img @click="hideImg" :src="showImgSrc" alt="">
    </div>
    <type-loading v-if="loading"></type-loading>
    <footer-view></footer-view>
  </div>
</template>
<script>
  import footerView from '@/components/footer'
  import {getFriendsInfo} from '@/service/getData'
  import Vue from 'vue'
  import typeLoading from '@/components/loading'
  import isPlay from '@/components/playing'

  Vue.filter('JsonMSG',function (val) {
    var value = JSON.parse(val)
    return value.msg
  })
  Vue.filter('JsonSRC',function (val) {
    var value = JSON.parse(val)
    return value.video.nosKey
  })
  Vue.filter('JsonIMG',function (val) {
    var value = JSON.parse(val)
    return value.video.coverUrl
  })
  export default{
    data(){
      return{
        infoList:[],
        videosrc:'',
        loading:true,
        showImgs:false,
        showImgSrc:''
      }
    },
    components:{
      footerView,typeLoading,isPlay
    },
    mounted(){
      this.getInfo()
    },
    methods:{
      async getInfo(){
        let list = await getFriendsInfo()
        this.infoList = list.event
        this.loading = false
      },
      playVideo(event){
          console.log(event)
        event.target.setAttribute('autoplay','autoplay')
      },
      showImg(e){
        this.showImgSrc = e.target.currentSrc
        this.showImgs = true
      },
      hideImg(){
        this.showImgs = false
      }
    }
  }
</script>
<style scoped>
  header{
    height:40px;
    line-height: 40px;
    background: #3CAEEA;
    text-align: center;
    color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center
  }
  ul>li>div{
    display: inline-block;
  }
  ul>li{
    overflow: auto;
    padding: 10px;
  }
  ul>li>.left{
    width:40px;
    height:40px;
    float: left;
    border-radius: 50%;
    overflow: hidden;
  }
  ul>li>.left>img{
    width:100%;
  }
  ul>li>.right{
    width:87%;
    float: right;
  }
  ul>li>.right>header{
    height:30px;
    line-height: 20px;
    background: #ffffff;
    color: #000000;
    text-align: left;
    display: block;
  }
  ul>li>.right>header span{
    font-size:14px;
  }
  ul>li>.right>header>span:first-child{
    color: #4b9df5;
  }
  ul>li>.right>.main video{
    width:100%;
  }
  ul>li>.right>.main p{
    padding: 5px 0;
    font-size:15px;
  }
  ul>li>.right>.main>div{
    position: relative;
  }
  ul>li>.right>.main>div>img{
    width:15%;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  ul>li>.right>.main>.pics>ul>li{
    width:30%;
    display: inline-block;
    padding: 2px;
  }
  ul>li>.right>.main>.pics>ul>li>img{
    width:100%;
  }
  .footer{
    color: #9c9c9c;
  }
  .footer>p{
    font-size:14px;
  }
  .footer>ul{
    display: flex;
    font-size:14px;
    justify-content: center;
    align-items: center;
  }
  .footer>ul>li{
    display: inline-block;
    display: flex;
    align-items: center;
  }
  .footer>ul>li>img{
    width:24%;
    padding-right: 5px;
  }
  .showImg{
    width:100%;
    height: 100%;
    background: rgba(19,14,13,0.8);
    display: flex;
    justify-content:center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .showImg>img{
    width:100%;
    animation: show .5s;
  }
  @keyframes show {
    0%{
      transform: scale(.3);
    }
    100%{
      transform: scale(1);
    }
  }
</style>
