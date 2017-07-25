<template>
  <div>
    <img id="bg" src="" alt="">
    <header>
      <a @click="goBack" href="javascript:void(0)"></a>
      <span>歌单</span>
    </header>
    <div class="desc">
      <img :src="playlist.coverImgUrl" alt="playlist.description" width="30%">
      <p>{{playlist.name}}</p>
    </div>

    <p v-text="playlist.description"></p>
    <ul>
      <li v-for="(list,index) in playlist.tracks" :keys="index">
        <span>{{index+1}}</span>
        <p>{{list.name}}</p>
      </li>
    </ul>
    {{loading}}
    <type-loading v-if="loading"></type-loading>
  </div>
</template>
<script>
    import route from '@/router'
    import {getRecomdDetails} from '@/service/getData'
    import typeLoading from '@/components/loading'

    export default{
      data(){
        return{
          id:'',
          playlist:{
//            coverImgUrl:''
          },
          loading:true,
        }
      },
      computed:{
        ids:function () {
          return this.$route.query.id
        }
      },
      created(){

      },
      components:{
        typeLoading
      },
      methods:{
        goBack(){
          route.goBack()
        },
        async getRecomdDetails(id){
          let recomdDetails = await getRecomdDetails(id)
          this.playlist = recomdDetails.playlist;
          document.getElementById('bg').src = recomdDetails.playlist.coverImgUrl;
          this.loading=false
        }
      },
      mounted(){
        this.id = this.$route.query.id;
        this.getRecomdDetails(this.ids);
      },
      watch:{
//        '$route':function (to) {
//            console.log(to)
//          if(to.path=='/playlist/detail'){
//            this.playlist=[];
//            this.loading=true;
//            this.getRecomdDetails(this.ids);
//          }
//        }
      }
    }
</script>
<style>
  header{
    text-align: center;
    height:30px;
    line-height: 30px;
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
    border-right: 1px solid #000;
    border-top: 1px solid #000;
    transform:rotate(225deg);
    margin-top: 5px;
    margin-left: 5px;
  }
  #bg{
    position: fixed;
    z-index:-1;
    filter: blur(50px);
  }
  .desc{
    overflow: auto;
    padding:15px;
  }
  .desc>img{
    float: left;
  }
  .desc>p{
    width: 66%;
    float: right;
  }
</style>
