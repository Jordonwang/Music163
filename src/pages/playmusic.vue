<template>
	<div style="overflow: hidden">
    <img id="bg" :src="songImg" alt="">
    <div id="bg2"></div>
    <header>
      <a @click="goBack" href="javascript:void(0)"></a>
      <span>{{songName}}</span>
    </header>
    <div class="main">
      <transition name="fade">
        <div class="songPic" v-show="!showlyric">
          <div class="outpic" :style="'height:'+outpicWidth+'px'">
            <div class="innerpic" @click="showlyric = !showlyric">
                <img :src="songImg" alt="">
                <div></div>
            </div>
          </div>
        </div>
      </transition>
      <div class="lyric animated fadeInUp" v-show="showlyric" @click="showlyric = !showlyric">
        <div>
          <p @click="ddd" v-if="lyric.length>0" v-for="lyr in lyric" :class="(lyr.time<startTime)?'active':''">{{lyr.lyc}}</p>
          <p v-if="lyric.length==0">轻音乐，暂无歌词</p>
        </div>
      </div>
      <div class="more" v-show="!showlyric">
        <ul>
          <li><img src="/static/heart.png" alt=""></li>
          <li><img src="/static/dwn.png" alt=""></li>
          <router-link tag="li" :to="'/musicComment/'+id"><img  src="/static/comment.png" alt=""></router-link>
          <li><img src="/static/more.png" alt=""></li>
        </ul>
      </div>
      <div class="process">
        <span v-text="startT" v-if="startT=='NaN:NaN'?startT='00:00':startT">00:00</span>
        <div><span id="process" :style="'width:'+processWidth+'%'"><i @touchend="ctrlProgressEnd" @touchstart="ctrlProgress"></i></span></div>
        <span v-text="totalT" v-if="totalT=='NaN:NaN'?totalT='00:00':totalT">00:00</span>
      </div>
      <ul class="setting">
        <li><img src="/static/orderloop.png" alt=""></li>
        <li @click="prevSong"><img src="/static/left-arrow.png" alt=""></li>
        <li @click="isplay"><img id="pused" src="/static/pused.png" alt=""></li>
        <li @click="nextSong"><img src="/static/right-arrow.png" alt=""></li>
        <li><img src="/static/menu.png" alt=""></li>
      </ul>
      <img src="/static/cyc.png" alt="" v-show="!showlyric">
      <span v-show="!showlyric"></span>
    </div>
	  <type-loading v-if="loading"></type-loading>
    <router-view></router-view>
	</div>
</template>
<script>
  import route from '@/router'
  import {getSongUrl,getSonglyric,getSongDetails} from '@/service/getData'
  import typeLoading from '@/components/loading'
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default{
    data(){
      return {
        loading:true,
        songID:'',
        src:'',
        audio:false,
        isPlaying:true,
        playingSrc:'',
        curTime:0,
        showlyric:false,
        outpicWidth:'',
        lyric:[]
      }
    },
    computed:{
      ...mapState(['playingSongId','songSrc','songName','songImg','startTime','totalTime','playingSongId','songlist','currentSongListIndex']),
      id () {
        return this.$route.query.id
      },
      processWidth () {
        if((this.startTime==this.totalTime) && this.startTime>0){
          if(this.songlist.length>0){
            this.nextSong()
          }else{
            var audio = document.querySelector('#audio');
            this.UPDATE_STARTTIME(0)
            audio.currentTime = 0
          }
        }
        let val = (this.startTime/this.totalTime)*100
        return val.toFixed(2)
      },
      startT () {
        if(this.changeTime(this.startTime)=='NaN:NaN'){
          return '00:00'
        }else{
          return this.changeTime(this.startTime)
        }
      },
      totalT () {
        if(this.changeTime(this.totalTime)=='NaN:NaN'){
            return '00:00'
        }else{
          return this.changeTime(this.totalTime)
        }
      }
    },
    components:{
      typeLoading
    },
    mounted(){
      this.initData(this.id);
      this.outpicWidth = document.querySelector('.outpic').clientWidth

      for (var i = 0;i<this.songlist.length;i++) {
      	if(this.id == this.songlist[i].id){
      		this.UPDATE_CURRENTSONGLISTINDEX(i)
      	}
      }
      this.playingSrc = 'url('+this.songImg+')'
    },
    updated(){
    },
    methods:{
      ...mapMutations([
        'UPDATE_SONGSRC',
        'UPDATE_PLAYINGSONGID',
        'UPDATE_PLAYINGSONGIMG',
        'UPDATE_PLAYINGSONGNAME',
        'UPDATE_STARTTIME',
        'UPDATE_TOTALTIME',
        'UPDATE_CURRENTSONGLISTINDEX',
        'UPDATE_ISPLAYING'
      ]),
      ...mapActions([
        'GetSongUrl',
        'GetSongDetail'
      ]),
      ddd(e){
        console.log(e)
      },
      ctrlProgressEnd(){
        var audio = document.querySelector('#audio');
        this.UPDATE_STARTTIME(this.curTime)
        audio.currentTime = this.curTime
        this.UPDATE_ISPLAYING(true)
      },
      ctrlProgress(ev){
        var audio = document.querySelector('#audio');
        var process = document.querySelector('#process')
        var processParent = document.querySelector('#process').parentNode.clientWidth;
        var processLeft = document.querySelector('#process').parentNode.offsetLeft;
        var _this = this;
        this.UPDATE_ISPLAYING(false)
        ev.target.addEventListener('touchmove',(ev)=>{
          let l = ev.changedTouches[0].clientX
          if(l>(processParent+processLeft)) {
            process.style.width = processParent.toFixed(2) +'px'
          } else if(l<processLeft){
            process.style.width = '0px'
          } else{
            process.style.width = l-processLeft.toFixed(2) + 'px'
          }
          _this.curTime = (l-processLeft)/processParent*audio.duration
        })
      },
      goBack(){
        route.isBack = 2
        route.goBack()
      },
      trlycTime(arr,r){
          if(arr){
            console.log(arr)
            let obj = []
            arr.forEach(function (v,i) {
              let minute = Number(v.substring(1,3))*60
              let second = Number(v.substring(4,6))
              console.log(minute+second)
              obj.push({
                time:minute+second,
                lyc:r[i+1]
              })
            })
            this.lyric = obj
          }
      },
      initData(id){
        var _this = this;
        this.GetSongUrl(id)
        this.GetSongDetail(id)
        getSonglyric(id).then(function (res) {
          if(res.qfy && res.sfy){
            // _this.lyric = '轻音乐，无歌词'
          }else{
            let r = res.lrc.lyric.split(/\[[^\]]*\]/)
            console.log(res.lrc.lyric.match(/\[[^\]]*\]/g))
            _this.trlycTime(res.lrc.lyric.match(/\[[^\]]*\]/g),r)
            // _this.lyric = r
          }
        })
        this.UPDATE_ISPLAYING(true)
        this.hideLoading();
      },
      //下一首
      nextSong(){

        let index = this.currentSongListIndex
        if(this.songlist.length<1){
          this.$dialog.toast({mes:'暂无播放列表',timeout: 1500})
          return
        }
        if(index == this.songlist.length-1){
            index = 0
        }
        index ++
        this.UPDATE_CURRENTSONGLISTINDEX(index)
      	let id = this.songlist[index].id
        this.initData(id)
      },
      //上一首
      prevSong(){
        if(this.songlist.length<1){
          this.$dialog.toast({mes:'暂无播放列表',timeout: 1500})
          return
        }
        let index = this.currentSongListIndex
        if(index==0){
          index = this.songlist.length
        }
        index --
        this.UPDATE_CURRENTSONGLISTINDEX(index)
        let id = this.songlist[index].id
        this.initData(id)
      },
      hideLoading(){
        this.loading = false;
      },
      isplay(){
      	var audio = document.querySelector('#audio');
      	var play = document.querySelector('.main').lastChild;
      	var img = document.querySelector('.innerpic').firstChild;
      	var pused = document.querySelector('.innerpic').lastChild;
      	var stop = document.querySelector('#pused');

      	if (this.isPlaying) {
          this.UPDATE_ISPLAYING(false)
      		this.isPlaying = !this.isPlaying
      		play.setAttribute('class','play')
      		img.setAttribute('class','stop')
          pused.setAttribute('class','pused')
          stop.src = "/static/play.png"
      		audio.pause()
      	}else{
          this.UPDATE_ISPLAYING(true)
      		this.isPlaying = !this.isPlaying
      		play.removeAttribute('class')
          pused.removeAttribute('class')
      		img.setAttribute('class','start')
          stop.src = "/static/pused.png"
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
     '$route':function (to,from,next) {
       console.log(to)
       console.log(from)
       if(to.path=='/playmusic'){
           console.log('this.playingSongId++++'+this.playingSongId)
         console.log('this.id++++'+this.id)
         console.log('this.paramsId++++'+from.params.id)
         if(!(this.playingSongId === this.id || from.params.id ==this.playingSongId)){
           window.location.reload()
         }
       }
     },
      'startTime':function (to,from) {
          console.log(to,from)
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
  header>span{
    width: 50%;
    overflow: hidden;
    display: inline-block;
    height: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  #bg{
    position: fixed;
    z-index:-2;
    filter: blur(100px);
    width: 100%;
    height: 100%
  }
  #bg2{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(68,66,68,0.37);
    z-index: -1;
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
    animation: play 18s infinite linear
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
    z-index:2;
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
    background: url("/static/disc.png") no-repeat;
    background-size: 100% 100%;
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
    margin: 4% 0;
    position: fixed;
    width: 100%;
    bottom: 1.5rem;
    left: 0;
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
    transition: all 0.1s;
  }
  .process>div>span>i{
    width: 14px;
    height: 14px;
    background: #fff;
    display: block;
    position: absolute;
    right: -7px;
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
  .more{
  	margin-top: 13%
  }
  .more>ul{
  	display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 20px 50px;
  }
  .more>ul>li{
    text-align: center;
  }
  .more>ul>li>img{
  	width: 45%
  }
  ul.setting{
    height: 1rem;
  	display: flex;
    justify-content: space-around;
    list-style: none;
    position: fixed;
    width: 100%;
    bottom: 15px;
    align-items: center;
    z-index: 2;
  }
  ul.setting>li{
    text-align: center;
  }
  ul.setting>li>img{
	  width: 45%
  }
  .lyric{
    text-align: center;
    color: #fff;
    height: 9rem;
    /*animation: showlyc 1s linear;*/
    animation-delay:1s;
    overflow: scroll;
    color: #bebebe;
  }
  .lyric p{
    padding: 0.1rem 0;
  }
  .lyric .active{
    color: #ffffff;
  }
  @keyframes showlyc {
    0%{
      /*transform: translateY(100%);*/
      opacity: 0;
    }
    100%{
      /*transform: translateY(0%);*/
      opacity: 1;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
