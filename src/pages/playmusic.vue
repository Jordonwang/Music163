<template>
	<div>
    <img id="bg" :src="songDetail.songs[0].al.picUrl" alt="">
    <header>
      <a @click="goBack" href="javascript:void(0)"></a>
      <span>{{songDetail.songs[0].name}}</span>
    </header>
    <div class="main">
      <div class="songPic">
        <div class="outpic">
          <div class="innerpic">
            <div>
              <img :src="songDetail.songs[0].al.picUrl" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="more"></div>
      <div class="process"></div>
      <div class="setting"></div>
    </div>
    <!--<audio autoplay controls="controls" :src="src" ></audio>-->
	<type-loading v-if="loading"></type-loading>
	</div>
</template>
<script>
  import route from '@/router'
	import {getSongUrl,getSonglyric,getSongDetails} from '@/service/getData'
  import typeLoading from '@/components/loading'

	export default{
		data(){
			return {
				loading:true,
				songID:'',
        src:'',
        songDetail:{
          songs:[{'al':{'picUrl':''}}]
        }
			}
		},
		computed:{
      id:function () {
        return this.$route.query.id
      }
    },
    components:{
      typeLoading
    },
    mounted(){
      this.id = this.$route.query.id;
      this.initData(this.id);
      var outpicWidth = document.querySelector('.outpic').clientWidth
      document.querySelector('.outpic').style.height = outpicWidth + 'px'
      console.log(outpicWidth)
    },
    methods:{
      goBack(){
        route.goBack()
      },
      async initData(id){
        let songUrl = await getSongUrl(id)
        let songDetail = await getSongDetails(id)
        let songlyric = await getSonglyric(id)
        this.src = songUrl.data[0].url
        this.songDetail = songDetail
        this.hideLoading();
      },
      hideLoading(){
        this.loading = false;
      }
    },
    watch:{
     '$route':function (to) {
         console.log(to)
         if(to.path=='/playmusic'){
           this.songID='';
           this.id='';
           this.initData(this.id);
           this.loading=true;
         }
       }
    }
	}
</script>
<style>
  header{
    text-align: center;
    height:40px;
    line-height: 40px;
    color: #ffffff;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.47);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
    background: rgb(187, 187, 187);
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
    width:15px;
    height:15px;
    border-right: 1px solid #fff;
    border-top: 1px solid #fff;
    transform:rotate(225deg);
    margin-top: 5px;
    margin-left: 5px;
  }
  #bg{
    position: fixed;
    z-index:-1;
    filter: blur(100px);
    width: 100%;
    height: 100%;
  }
  .main{
    position: relative;
    margin-top: 100px;
  }
  .main:after{
    content: '';
    display: block;
    background: url("/static/needle-ip6.png");
    background-size: 100% 100%;
    width:96px;
    height: 137px;
    position: absolute;
    top:-68px;
    left: 45%;
    /*transform: rotate(-45deg);*/
    /*transform-origin:left 18px;*/
  }
  .main>.songPic>.outpic>.innerpic img{
    width:100%;
  }
  .main>.songPic>.outpic>.innerpic{
    text-align: center;
    border-radius: 50%;
    overflow: hidden;
    width: 182px;
    height: 182px;
    margin: 0 auto;
    margin-top: 60px;
  }
  .main>.songPic>.outpic{
    margin: 30px;
    background: url("/static/disc.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    zoom: 1;
  }
</style>
