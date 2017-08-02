<template>
  <div class="rating_page">

    <img id="bg" :src="src" alt="">
    <!--<div id="bg" :style="{background:src}"></div>-->

    <header>
      <a @click="goBack" href="javascript:void(0)"></a>
      <span>{{type}}</span>
    </header>
    <div class="desc">

      <img :src="desc.coverImgUrl" :alt="desc.description" width="30%">
      <p>{{desc.description}}</p>
      <p>标签:<span v-for="v in desc.tags">{{v}},</span></p>

    </div>
    <div class="count">
      <ul>
        <li>
          <img src="/static/music.png" alt="添加收藏">

          <span v-text="million(desc.subscribedCount)"></span>
        </li>
        <li>
          <img src="/static/music.png" alt="评论">
          <span v-text="million(desc.commentCount)"></span>
        </li>
        <li>
          <img src="/static/music.png" alt="转发">
          <span v-text="million(desc.shareCount)"></span>
        </li>
        <li>
          <img src="/static/music.png" alt="下载">
          <span>下载</span>
        </li>
      </ul>
    </div>
    <ul class="main">

      <li>播放全部(共{{desc.trackCount}}首)</li>
      <li v-for="(list,index) in desc.tracks" :keys="index">
        <router-link :to="{path:'/playmusic',query:{id:list.id}}">
          <span>{{index+1}}</span>
          <div>
            <p>{{list.name}}</p>

            <p>{{list.artists[0].name}}</p>

          </div>
        </router-link>
      </li>
    </ul>

    <type-loading v-if="loading"></type-loading>

  </div>
</template>
<script>
  import route from '@/router'

  import Vue from 'vue'
  import {getTopList} from '@/service/getData'

  import typeLoading from '@/components/loading'
  import {mapMutations} from 'vuex'

  export default{
    data(){
      return{
        id:'',
        loading:true,
        src:'',
        desc:''
      }
    },
    computed:{
      type:function(){
        switch (this.$route.query.type){
          case '0':
            return "新歌榜"
          case '1':
            return "热歌榜"
          case '2':
            return "原创歌曲榜"
          default:
            return "电音榜"
        }
      }
    },
    created(){

    },
    components:{
      typeLoading
    },
    methods:{
      ...mapMutations([
        'UPDATE_SONGLIST'
      ]),
      goBack(){
        this.$router.goBack(1)
      },
      async getList(id){
        let res = await getTopList(id)
        this.desc = res.result
        this.src = res.result.coverImgUrl
        this.loading = false
      },
      million(value){
        function replaceStr(oldStr, childStr){
          oldStr = oldStr.replace(eval('/'+ childStr +'/g'),'万')
          return oldStr
        }
        value = value +''
        if(value>9999){
          var val = value.substr(-4,4)
          return  replaceStr(value,val)
        }else if(value=='' || value == "undefined" || value ==null){
          return 0
        }else{
          return value
        }
      }
    },
    mounted(){
      this.id = this.$route.query.id;
      this.getList(this.$route.query.type)
    },
    watch:{
      '$route':function (to) {
        if(to.path=='/playlist/detail'){
          this.playlist=[];
          this.loading=true;
          this.getRecomdDetails(this.ids);
        }
      }
    }
  }
</script>
<style scoped>
  .rating_page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 202;
  }
  header{
    text-align: center;
    height:30px;
    line-height: 30px;
    color: #ffffff;
    position: fixed;
    width: 100%;
  }
  header>a{
    position: absolute;
    width: 20px;
    height: 20px;
    display: block;
    left: 0;
    margin-top: 5px;
    left: 10px;
  }
  header>a:after{
    content: '';
    display: block;
    width:10px;
    height:10px;
    border-right: 1px solid #fff;
    border-top: 1px solid #fff;
    transform:rotate(225deg);
    margin-top: 5px;
    margin-left: 5px;
  }
  #bg{
    position: fixed;
    z-index:-1;
    filter: blur(200px);
    width: 100%
  }
  .desc{
    overflow: auto;
    padding:15px;
    color: #ffffff;
    padding-top: 45px;
  }
  .desc>img{
    float: left;
  }
  .desc>p{
    width: 66%;
    float: right;
  }
  .count{
    padding-bottom: 3px;
    color: #ffffff;
  }
  .count>ul{
    display: flex;
    align-items: center;
    list-style: none;
  }
  .count>ul>li{
    text-align: center;
  }
  .count>ul>li>img{
    width: 25%
  }
  .count>ul>li>span{
    display: block;
    font-size: 13px;
  }
  .main{
    background:#ffffff;
    padding:10px;
    overflow: scroll;
    height: 65%;
  }
  .main>li{
    height: 40px;
    line-height: 40px;
    padding-bottom: 3px
  }
  .main>li span{
    width: 10%;
    float: left;
    text-align: center;
  }
  .main>li>a{
    display: block;
    color: #000000;
    text-decoration: none;
    width: 100%;
    float: right;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
  }
  .main>li>a>div>p{
    height:20px;
    line-height:20px;
    overflow: hidden;
  }
  .main>li>a>div>p:last-child{
    font-size: 13px;
    color: #adadad;
    border-bottom: 1px solid #E6E6E6
  }
</style>
