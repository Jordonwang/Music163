<template>
  <div id="div" class="rating_page">
    <div class="nav">
      <img src="static/icn_back.png">
      <p class="nav-title">我的消息</p>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {

      }
    }
  }
</script>

<style scoped>
  .nav{
    background: #3CAEEA;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
  }
  .nav-title{
    padding-top: 10px;
    color: white;
  }
  .rating_page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 202;
  }
</style>
