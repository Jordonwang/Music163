<template>
  <div id="div" class="rating_page">
    <div class="nav">
      <img src="/static/icn_back.png" class="nav-back" @click="goBack">
      <p class="nav-title">我的消息</p>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {

      }
    },
    methods: {
      goBack(){
        this.$router.goBack()
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
  .nav{
    background: #3CAEEA;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    text-align: center;
  }
  .nav-back{
    margin: 6px 5px;
    float: left;
  }
  .nav-title{
    display: inline-block;
    color: white;
    text-align: center;
    vertical-align: top;
    margin: 10px 0 0 -15px;
  }
</style>
