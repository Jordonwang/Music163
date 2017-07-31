<template>
  <div>
    <div class="head">
      <i v-if="searchIcon" class="el-icon-setting"></i>
      <input v-model="keywords" @click="searchSong" @input="getSearchData" :style="'width:'+searchwidth+'%'" class="search" type="text" placeholder="搜索音乐 歌词 电台">
      <i v-if="searchIcon" class="el-icon-more"></i>
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
    <!--<transition name="router-fade" mode="out-in">-->
      <!--<keep-alive>-->
        <!--<router-view></router-view>-->
      <!--</keep-alive>-->
    <!--</transition>-->
    <footer-view></footer-view>
  </div>
</template>
<script>
  import Vue from 'vue'
  import footerView from '@/components/footer'
  import pageTrans from '@/components/pagetransition'
  import { getSearch } from '@/service/getData'

  export default{
    data(){
      return {
        searchIcon:true,
        searchwidth:70,
        keywords:'',
        searchVal:[]
      }
    },
    components:{
        footerView,pageTrans
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
    top: 38px;
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
