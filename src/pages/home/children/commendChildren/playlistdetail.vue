<template>
  <div>
    <img id="bg" :src="src" alt="">
    <header>
      <a @click="goBack" href="javascript:void(0)"></a>
      <span>歌单</span>
    </header>
    <div class="desc">
      <img :src="playlist.coverImgUrl" :alt="playlist.description" width="30%">
      <p>{{playlist.name}}</p>
      <p v-if="playlist.tags">标签:<span v-for="val in playlist.tags">{{val}},</span></p>
    </div>
    <div v-if="playlist.subscribedCount" class="count">
      <ul>
        <li>
          <img src="/static/music.png" alt="添加收藏">
          <span v-text="million(playlist.subscribedCount)">0</span>
        </li>
        <li>
          <img src="/static/music.png" alt="评论">
          <span v-text="million(playlist.commentCount)">0</span>
        </li>
        <li>
          <img src="/static/music.png" alt="转发">
          <span v-text="million(playlist.shareCount)">0</span>
        </li>
        <li>
          <img src="/static/music.png" alt="下载">
          <span>下载</span>
        </li>
      </ul>
    </div>
    <ul class="main">
      <li v-if="playlist.trackCount">播放全部(共{{playlist.trackCount}}首)</li>
      <li v-for="(list,index) in playlist.tracks" :keys="index">
        <router-link :to="{path:'/playmusic',query:{id:list.id}}">
          <span>{{index+1}}</span>
          <div>
            <p>{{list.name}}</p>
            <p>{{list.ar[0].name}}</p>
          </div>
        </router-link>
      </li>
    </ul>
    <type-loading v-if="loading"></type-loading>
    <dialog-info v-if="dialog" :contentMsg="contentMsg" @cancle="cancleEvent" @confirm="confirmevent"></dialog-info>
  </div>
</template>
<script>
    import route from '@/router'
    import {getRecomdDetails,getdjdetail} from '@/service/getData'
    import typeLoading from '@/components/loading'
    import {mapMutations} from 'vuex'
    import dialogInfo from '@/components/dialog'

    export default{
      data(){
        return{
          id:'',
          playlist:{},
          loading:true,
          src:'',
          dialog:false,
          contentMsg:''
        }
      },
      computed:{
        ids:function () {
          return this.$route.query.id
        },
        type:function(){
          return this.$route.query.type
        }
      },
      created(){

      },
      components:{
        typeLoading,dialogInfo
      },
      methods:{
        ...mapMutations([
          'UPDATE_SONGLIST'
        ]),
        goBack(){
          this.$router.goBack(1)
        },
        async getRecomdDetails(id){
//            debugger
          let recomdDetails = await getRecomdDetails(id)
          this.playlist = recomdDetails.playlist;
          if(recomdDetails.code!= 200){
              this.$dialog.alert({mes:recomdDetails.msg,callback:()=>{
                  this.goBack()
                }});
          }else{
            this.src = recomdDetails.playlist.coverImgUrl;
            console.log(recomdDetails.playlist.trackIds)
            this.UPDATE_SONGLIST(recomdDetails.playlist.trackIds)
            this.loading=false
          }
        },
        async getdjdetails(id){
          let djdetails = await getdjdetail(id)
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
        },
        confirmevent(){
          this.contentMsg = ''
          this.dialog = false;
          this.$router.replace('/')
        }
      },
      created(){
      },
      mounted(){
        this.id = this.$route.query.id;
        this.getRecomdDetails(this.ids)
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
    filter: blur(50px);
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
    overflow: auto
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
