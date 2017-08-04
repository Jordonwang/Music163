<template>
  <div>
    <p>404</p>
    <p>Page not found</p>
    <a href="/">HOME</a>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data(){
      return {

      }
    },
    methods:{

    },
    created(){

    }
  }
</script>

<style scoped>
  div{
    position: absolute;
    width: 100%;
    height:100%;
    background: radial-gradient(circle,rgba(161,219,98,0.36),rgba(66,219,199,0.36));
    text-align: center;
  }
  p{
    display: block;
    font-size:20px;
    color: #ffffff;
    text-align: center;
    margin-top: 100px;
    font-size:28px;
  }
  a{
    display: block;
    margin-top: 50px;
    color: #ffffff;
    font-size:28px;
  }
</style>
