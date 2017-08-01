<template>
  <div id="app">
    <audio id="audio" autoplay :src="songSrc" @timeupdate="initProcess"></audio>
    <div class="welcome animated fadeOut" v-if="!homeInit">
      <img src="/static/welcome.png" alt="">
    </div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import store from './store'
  import {mapState, mapMutations} from 'vuex'

export default {
  name: 'app',
  data(){
      return {
      }
  },
  computed:{
      ...mapState(['songSrc','startTime','totalTime','homeInit'])
  },
  methods:{
    ...mapMutations([
      'UPDATE_STARTTIME',
      'UPDATE_TOTALTIME',
      'UPDATE_ISPLAYING'
    ]),
    initProcess(){
      var audio = document.querySelector('#audio');
      var time = parseInt(audio.currentTime);
      var timeLength = parseInt(audio.duration);
//      console.log('time'+time+'---timeLength'+timeLength)
      if(time==timeLength){

      }
      this.UPDATE_STARTTIME(time)
      this.UPDATE_TOTALTIME(timeLength)
    }
  },
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
//      console.log(toDepth)
//      console.log(fromDepth)
//      this.transitionName = toDepth < fromDepth ? 'fadeInLeft' : 'fade'
//      if(to.path == "/myCount"){
//        console.log(1)
//
//        this.transitionName = 'fades';
//      }else{
//        this.transitionName = 'fade';
//      }
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 480px;
  margin:0 auto;
}
.back-transition {
  transition: transform .5s ease;
}
.back-enter{
  transform: translate(100%,0);
}
.back-leave {
  transform: translate(-100%,0);
}
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.flexRowBetween{
  position: fixed;
  bottom:0;
  left:0;
  display: flex;
  justify-content:center;
  padding-left: 0;
  margin: 0;
  width: 100%;
}
.flexRowBetween>li{
  list-style: none;
  float: left;
  width:25%;
  border: 1px solid #2c3e50;
  padding: 6px 0;
}
.flexRowBetween>li>a{
  text-decoration: none;

}
.commend{
   margin-top: 76px;
 }
.welcome{
  width:100%;
  height: 100%;
  position: absolute;
  top:0;
  left: 0;
  z-index:-1;
  display: flex;
  justify-content:center;
  align-items: center;
  background: linear-gradient(225deg,rgb(243, 199, 164),rgb(226, 92, 89));
}
.welcome>img{
  width:30%;
}
</style>
