<template>
  <div>
    <p>您已登录</p>
    <router-link to="/">HOme</router-link>
    <button @click="back">返回</button>
    <button @click="logOut">退出登录</button>

  </div>
</template>

<script>
  export default {
    name: 'main',
    data () {
      return {
        msg: 'Menu',
        menus: [
          {id: 1, path: '/home', name: 'home', title: '首页'},
          {id: 2, path: '/about', name: 'about', title: '关于'},
          {id: 3, path: '/service', name: 'service', title: '服务'},
          {id: 4, path: '/hello', name: 'hello', title: '测试'}
        ]
      }
    },
    methods:{
        logOut(){
            window.sessionStorage.removeItem('code')
            window.location.href = '/'
        },
        back(){
            window.history.go(-2)
        }
    },
    beforecreate (){
        if(!window.sessionStorage.getItem('code')){
            window.location.href = '/login'
        }
    }
  }
</script>

<style lang="" scoped>
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
</style>
