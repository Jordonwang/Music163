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
              <img @click="isplay" :src="songDetail.songs[0].al.picUrl" alt="">
          </div>
        </div>
      </div>
      <div class="more"></div>
      <div class="process">
      	<span>{{time.start}}</span>
      	<div><span id="process"></span></div>
      	<span>{{time.end}}</span>
      </div>
      <div class="setting"></div>
      <span></span>
    </div>
    <audio id="audio" autoplay :src="src" @timeupdate="initProcess"></audio>
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
	        audio:false,
	        isPlaying:true,
	        songDetail:{
	          songs:[{'al':{'picUrl':''}}]
	        },
	        time:{
	        	start:'00:00',
	        	end:'00:00'
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
      this.initData(this.id);
      var _this = this;
      var outpicWidth = document.querySelector('.outpic').clientWidth
      document.querySelector('.outpic').style.height = outpicWidth + 'px'
      // setInterval(function () {
      // 	_this.initProcess()
      // },1000)
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
      },
      isplay(){
      	var audio = document.querySelector('#audio');
      	var play = document.querySelector('.main').lastChild;
      	var img = document.querySelector('.innerpic').lastChild
      	if (this.isPlaying) {
      		this.isPlaying = !this.isPlaying
      		play.setAttribute('class','play')
      		img.setAttribute('class','stop')
      		audio.pause()
      	}else{
      		this.isPlaying = !this.isPlaying
      		play.removeAttribute('class')
      		img.setAttribute('class','start')
      		audio.play()
      	}
      },
      initProcess(){
      	var audio = document.querySelector('#audio');
      	var proces = document.querySelector('#process');
      	var time = parseInt(audio.currentTime);
      	var timeLength = audio.duration;
      	if(time == timeLength){
      		isplay()
      	}
		proces.style.width = (time/timeLength) * 100 +'%' 
      	this.time.start = this.changeTime(time);
        this.time.end = this.changeTime(timeLength);
      },
      changeTime(time){
      	  var minute = parseInt(time / 60);
		  if (minute < 10) {
		    minute = '0' + minute;
		  }
		  var secound = parseInt(time % 60);
		  if (secound < 10) {
		    secound = '0' + secound;
		  }
		  return minute + ':' + secound;
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
<style scoped>
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
  .main>span{
    display: block;
    background: url("/static/needle-ip6.png");
    background-size: 100% 100%;
    width:96px;
    height: 137px;
    position: absolute;
    top:-68px;
    left: 45%;
    transition:all .3s
  }
  .main>.play{
  	transform: rotate(-45deg);
    transform-origin:left 18px;
  }
  .main>.songPic>.outpic>.innerpic img{
    width:100%;
    animation: play 8s infinite linear
  }
  .main>.songPic>.outpic>.innerpic img.stop{
  	animation-play-state: paused;
  }
  .main>.songPic>.outpic>.innerpic img.start{
  	animation-play-state: running;
  }
  @keyframes play {
  	100%{
  		transform: rotate(360deg);
  	}
  }
  .main>.songPic>.outpic>.innerpic{
    text-align: center;
    border-radius: 50%;
    overflow: hidden;
    width: 60%;
    height: 60%;
    margin: 0 auto;
  }
  .main>.songPic>.outpic{
    margin: 30px;
    background: url("/static/disc.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    zoom: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .process{
  	display: flex;
  	height: 10px;
  	line-height: 10px;
  	justify-content: center;
  	align-items: center;
  }
  .process>div{
  	width: 70%;
  	height: 2px;
  	background:#ccc ;
  	margin: 0 10px
  }
  .process>div>span{
  	height: 100%;
  	display: block;
  	width: 0px;
  	background: #000
  }
</style>
