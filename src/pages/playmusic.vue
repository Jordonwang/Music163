<template>
	<div>
    <img id="bg" :src="songImg" alt="">
    <header>
      <a @click="goBack" href="javascript:void(0)"></a>
      <span>{{songName}}</span>
    </header>
    <div class="main">
      <div class="songPic">
        <div class="outpic">
          <div class="innerpic">
              <img @click="isplay" :src="songImg" alt="">
              <div></div>
          </div>
        </div>
      </div>
      <div class="more">
        <ul>
          <li><img src="/static/heart.png" alt=""></li>
          <li><img src="/static/dwn.png" alt=""></li>
          <li><img src="/static/comment.png" alt=""></li>
          <li><img src="/static/more.png" alt=""></li>
        </ul>
      </div>
      <div class="process">
      	<span>{{startT}}</span>
      	<div><span id="process" :style="'width:'+processWidth+'%'"><i></i></span></div>
      	<span>{{totalT}}</span>
      </div>
      <div class="setting"></div>
      <img src="/static/cyc.png" alt="">
      <span></span>
    </div>

	<type-loading v-if="loading"></type-loading>
	</div>
</template>
<script>
  import route from '@/router'
  import {getSongUrl,getSonglyric,getSongDetails} from '@/service/getData'
  import typeLoading from '@/components/loading'
  import {mapState,mapMutations} from 'vuex'
  export default{
    data(){
      return {
        loading:true,
        songID:'',
        src:'',
        audio:false,
        isPlaying:true,
      }
    },
    computed:{
      ...mapState(['playingSongId','songSrc','songName','songImg','startTime','totalTime','playingSongId']),
      id () {
        return this.$route.query.id
      },
      processWidth () {
        return (this.startTime/this.totalTime)*100
      },
      startT () {
        return this.changeTime(this.startTime)
      },
      totalT () {
        return this.changeTime(this.totalTime)
      }
    },
    components:{
      typeLoading
    },
    mounted(){
      this.initData(this.id);
      var outpicWidth = document.querySelector('.outpic').clientWidth
      document.querySelector('.outpic').style.height = outpicWidth + 'px'
      this.hideLoading();
    },
    methods:{
      ...mapMutations([
        'UPDATE_SONGSRC',
        'UPDATE_PLAYINGSONGID',
        'UPDATE_PLAYINGSONGIMG',
        'UPDATE_PLAYINGSONGNAME',
        'UPDATE_STARTTIME',
        'UPDATE_TOTALTIME'
      ]),
      goBack(){
        route.goBack()
      },
      async initData(id){
        let songUrl = await getSongUrl(id)
        let songDetail = await getSongDetails(id)
        let songlyric = await getSonglyric(id)

        this.UPDATE_SONGSRC(songUrl.data[0].url)
        this.UPDATE_PLAYINGSONGID(songDetail.songs[0].id)
        this.UPDATE_PLAYINGSONGIMG(songDetail.songs[0].al.picUrl)
        this.UPDATE_PLAYINGSONGNAME(songDetail.songs[0].name)
      },
      hideLoading(){
        this.loading = false;
      },
      isplay(){
      	var audio = document.querySelector('#audio');
      	var play = document.querySelector('.main').lastChild;
      	var img = document.querySelector('.innerpic').firstChild;
      	var pused = document.querySelector('.innerpic').lastChild;
      	if (this.isPlaying) {
      		this.isPlaying = !this.isPlaying
      		play.setAttribute('class','play')
      		img.setAttribute('class','stop')
          pused.setAttribute('class','pused')
      		audio.pause()
      	}else{
      		this.isPlaying = !this.isPlaying
      		play.removeAttribute('class')
          pused.removeAttribute('class')
      		img.setAttribute('class','start')
      		audio.play()
      	}
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
       if(to.path=='/playmusic'){
           console.log('this.playingSongId++++'+this.playingSongId)
           console.log('this.id++++'+this.id)
         if(!(this.playingSongId === this.id)){
           window.location.reload()
         }
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
    padding-top: 85px;
  }
  .main>span{
    display: block;
    background: url("/static/needle-ip6.png");
    background-size: 100% 100%;
    width:96px;
    height: 137px;
    position: absolute;
    top:44px;
    left: 46%;
    transition:all .3s;
    transform-origin:0px 18px;
  }
  .main>img{
    position: absolute;
    top: 41px;
    left: 45%;
    width: 9%;
    z-index: 1;
  }
  .main>.play{
  	transform: rotate(-45deg);

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
    position: relative;
  }
  .main>.songPic>.outpic>.innerpic>.pused{
    background: url(/static/download.png) no-repeat;
    width: 30%;
    height: 30%;
    position: absolute;
    top: 35%;
    background-size: contain;
    left: 35%;
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
    padding: 0 16px;
  }
  .process>span{
    font-size:12px;
    color: #fff;
  }
  .process>div{
  	width: 70%;
  	height: 2px;
  	background:#ccc ;
  	margin: 0 20px
  }
  .process>div>span{
  	height: 100%;
  	display: block;
  	width: 0px;
  	background: #168bf5;
    position: relative;
    transition:all 0.5s;
  }
  .process>div>span>i{
    width: 14px;
    height: 14px;
    background: #fff;
    display: block;
    position: absolute;
    right: 0;
    top: -6px;
    border-radius: 50%;
  }
  .process>div>span>i:after{
    content: '';
    display: block;
    width: 4px;
    height:4px;
    border-radius: 50%;
    background: #168bf5;
    position: absolute;
    top:5px;
    left:5px;

  }
</style>
