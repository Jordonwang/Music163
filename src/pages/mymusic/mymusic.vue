<template>
    <div class="div">
      <div class="nav">
        <p class="nav-title">我的音乐</p>
      </div>
      <div class="header">
        <ul class="list">
          <li v-for="val in list" class="li">
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
      <div class="music-list">
        <div class="created-music" @click="changeCreatedHeight">
          <img src="/static/icn_drop.png" class="drop-img" width="13px" height="7px">
          <p class="created-title">我创建的歌单({{createdSongTitle}})</p>
          <ul>
            <li class="created-count" v-for="val in playlist" v-if="val.ordered==false">
              <router-link :to="{path:'/playlist/detail',query:{id:val.id}}">
                <div class="songListLeft">
                  <img :src="val.coverImgUrl" width="45px" height="45px" class="img-icon">
                </div>
                <div class="songListRight">
                  <p class="SongTitle">{{val.name}}</p>
                  <p class="SongCount">{{val.trackCount}}首</p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="collected-music" @click="changeCollectedHeight">
          <img src="/static/icn_drop.png" class="drop-img" width="13px" height="7px">
            <p class="collected-title">我收藏的歌单({{collectedSongTitle}})</p>
            <ul>
              <li class="collected-count" v-for="val in playlist" v-if="val.ordered==true">
                <router-link :to="{path:'/playlist/detail',query:{id:val.id}}">
                  <div class="songListLeft">
                    <img :src="val.coverImgUrl" width="50px" height="45px" class="img-icon">
                  </div>
                  <div class="songListRight">
                    <p class="SongTitle">{{val.name}}</p>
                    <p class="SongCount">{{val.trackCount}}首</p>
                  </div>
                </router-link>
              </li>
            </ul>

        </div>
      </div>
      <!--<transition name="router-slid" mode="out-in">-->
        <!--<router-view></router-view>-->
      <!--</transition>-->
      <footer-view></footer-view>
      <type-loading v-if="loading"></type-loading>
    </div>


</template>
<script>
  import Vue from 'vue'
  import footerView from '@/components/footer'
  import typeLoading from '@/components/loading'
  import {getUserList,getRecomdDetails} from '@/service/getData'
  import {mapState,mapMutations,mapActions} from 'vuex'
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
          }],
        playlist:[],
        loading:true,
        createdSongTitle:'',
        collectedSongTitle:'',
        isOrdered:false
      }
    },
    components:{
      footerView,
      typeLoading
    },
    computed: {
      ...mapState(['userID']),

    },
    mounted() {
      console.log('mounted')
      this.initData();
    },
    updated(){
      var a = document.getElementsByClassName('created-count')
      this.createdSongTitle = a.length

      var b = document.getElementsByClassName('collected-count')
      this.collectedSongTitle = b.length
    },
    methods:{
      async initData(){
        let userList = await getUserList(localStorage.getItem('userId'));
        this.playlist = userList.playlist

//        let recomdDetails = await getRecomdDetails(this.playlist.id);
        this.hideLoading();
      },
      hideLoading(){
        this.loading = false;
      },
      changeCreatedHeight() {
        var height = document.querySelector('.created-music').style.height;
        var a = document.getElementsByClassName('drop-img')[0]
        a.transform()
        console.log(a)
        if (height == '25px'){
          document.querySelector('.created-music').style.height = 'auto'
          // 顺时针90
        }else {
          document.querySelector('.created-music').style.height = 25 + 'px'
          // 逆时针90
        }

      },
      changeCollectedHeight() {
        var height = document.querySelector('.collected-music').style.height;
        if (height == '25px'){
          document.querySelector('.collected-music').style.height = 'auto'
        }else {
          document.querySelector('.collected-music').style.height = 25 + 'px'
        }

      }
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
    margin-left: 10px;
    margin-right: 10px;
  }
  .img-icon{
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
  .li{
    height: 50px;
    line-height: 0px;
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
  .music-list{
    margin-bottom: 50px;
  }
  .created-music{
    overflow: hidden;
  }
  .created-music>.drop-img{
    margin-left: 10px;
    margin-top: 10px;
  }
  .created-music>.created-title{
    display: inline-block;
    height: 25px;
    margin-top: 5px;
    margin-left: 10px;
    font-size: 13px;
  }
  .created-count{
    height: 50px;
    line-height: 0px;
  }
  .collected-music{
    overflow: hidden;
  }
  .collected-music>.drop-img{
    margin-left: 10px;
    margin-top: 10px;
  }
  .collected-music>.collected-title{
    display: inline-block;
    height: 25px;
    margin-top: 5px;
    margin-left: 10px;
    font-size: 13px;
  }
  .collected-count{
    height: 50px;
    line-height: 0px;
  }
  .songListLeft{
    display: inline-block;
    width: 10%;
    margin-left: 10px;
    margin-right: 10px;
  }
  .songListLeft>.img-icon{
    vertical-align: middle;
  }
  .songListRight{
    display: inline-block;
    width: 90%;
    height: 50px;
    margin-left: 10px;
    border-bottom: 1px solid #f0f0f0;
    text-align: left;
  }
  .songListRight>.SongTitle{
    font-size: 16px;
    height: 2em;
    line-height: 2em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .songListRight>.SongCount{
    font-size: 12px;
    height: 1.5em;
    line-height: 1.5em;
    color: darkgrey;
    margin-top: -5px;
  }

</style>
