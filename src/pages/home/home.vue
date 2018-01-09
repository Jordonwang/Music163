<template>
  <div>
    <div class="head">
      <i @click="dialogTest" v-if="searchIcon" class="el-icon-setting"></i>
      <input v-model="keywords" @click="searchSong" @input="getSearchData" :style="'width:'+searchwidth+'%'" class="search" type="text" placeholder="搜索音乐 歌词 电台">
      <i v-if="searchIcon">
        <is-play></is-play>
      </i>
      <span v-if="!searchIcon" @click="hideSearch" class="close">关闭</span>
    </div>
    <div class="searchDetail" v-if="!searchIcon">
      <ul v-if="searchVal.length>0">
        <li v-for="val in searchVal">
          <router-link :to="{path:'/playmusic',query:{id:val.id}}">
            {{val.name}}
          </router-link>
        </li>
      </ul>
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
    <page-trans></page-trans>

    <dialog-info showCancle="false" v-if="dialog" contentMsg="Test Msg" @cancle="cancleEvent" @confirm="confirmevent"></dialog-info>

    <footer-view></footer-view>
  </div>
</template>
<script>
  import Vue from 'vue'
  import footerView from '@/components/footer'
  import pageTrans from '@/components/pagetransition'
  import { getSearch } from '@/service/getData'

  import dialogInfo from '@/components/dialog'
  import isPlay from '@/components/playing'


  export default{
    data(){
      return {
        searchIcon:true,
        searchwidth:76,
        keywords:'',
        searchVal:[],
        dialog:false
      }
    },
    components:{
        footerView,pageTrans,dialogInfo,isPlay
    },
    computed:{
    },
    created(){
    },
    mounted() {
    },
    methods:{
      searchSong(event){
        this.searchIcon = false;
        this.searchwidth = 80
      },
      hideSearch(){
        this.searchIcon =true
      },
      async getSearchData(){
        console.log(this.keywords)
        let searchData = await getSearch(this.keywords)
        if(searchData.code == 400){
          this.searchVal = [{name:'暂无数据'}]
        }else{
          this.searchVal = searchData.result.songs
         console.log(searchData)
        }
      },
      dialogTest(){
        this.dialog = true
      },
      cancleEvent(data){
          console.log(data);
          this.dialog = false;
      },
      confirmevent(){
        this.dialog = false;
      }
    }
  }
</script>
<style lang="scss">
  .banner{
    width: 100%
  }
  .head{
    background:#3CAEEA;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    box-sizing:border-box;
    padding:0 5px;
    i{
      color: #fff;
    }
    .search{
      width:76%;
      margin: 3px;
      height: 30px;
      border-radius: 15px;
      border: 1px solid #3CAEEA;
      text-indent: 68px;
      transition: all .3s;
    }
    .close{
      line-height: 100%;
      color: #ffffff;
      padding-right: 16px;
    }
  }
  .searchDetail{
    width:100%;
    height:100%;
    background: rgba(224,225,225,1);
    position: absolute;
    top:0;
    left: 0;
    z-index: 6;
    li{
      padding:10px;
      a{
        text-decoration:none
      }
    }
  }
  .nav{
    background: rgba(248, 248, 250, 0.86);
    position: fixed;
    top: 36px;
    left: 0;
    z-index: 4;
    width: 100%;
    ul{
      list-style: none;
      padding-top: 10px;
      text-align:center;
  li{
        adding-bottom: 8px;
        width:23.5%;
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
          border-bottom: 2px solid #3CAEEA;
          color:#3CAEEA
        }
      }
    }
  }
  .search:focus{
    outline-offset:0px;
    outline: -webkit-focus-ring-color auto 0px;
  }
</style>
