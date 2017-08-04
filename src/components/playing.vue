<template>
  <router-link :to="{path:'/playmusic',query:{id:playingSongId}}">
    <div class="main">
      <span :class="{'stop':!isPlaying}"></span>
      <span :class="{'stop':!isPlaying}"></span>
      <span :class="{'stop':!isPlaying}"></span>
      <span :class="{'stop':!isPlaying}"></span>
    </div>
  </router-link>
</template>
<script>
  import {mapState} from 'vuex'
    export default{
        data(){
          return{
          }
        },
      computed:{
        ...mapState(['isPlaying','playingSongId'])
      }
    }
</script>
<style scoped>
  .main{
    width:20px;
    height: 20px;
    position: relative;
  }
  .main>span{
    width:1px;
    background: #fff;
    display: inline-block;
    position: absolute;
    bottom: 0;
    margin-left: 2px;
  }

  .main>span:nth-child(4){
    left: 0px;
    height:10px;
    animation: playing2 .5s infinite alternate ease-in forwards ;
  }
  .main>span:nth-child(1){
    height:20px;
    left: 6px;
    animation: playing1 .5s infinite alternate ease forwards ;
  }
  .main>span:nth-child(2){
    height:10px;
    left: 12px;
    animation: playing2 .5s infinite alternate ease forwards ;
  }
  .main>span:nth-child(3){
    height:20px;
    left: 18px;
    animation: playing1 .5s infinite alternate ease forwards ;
  }
  @keyframes playing1 {
    50%{
      height:5px;
    }
  }
  @keyframes playing2 {
    50%{
      height:20px;
    }
  }
  .main>span.stop{
    animation-play-state:paused;
  }
</style>
