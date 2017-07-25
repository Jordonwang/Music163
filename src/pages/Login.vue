<template>
  <div>
    <p>Login</p>
    <router-link to="/">Home</router-link>
    <label for="user">User</label>
    <input v-model="user" type="text" id="user">

    <label for="pwd">Pwd</label>
    <input v-model="psd" type="password" id="pwd">

    <input type="button" value="登录" @click="login">
  </div>
</template>

<script>
  export default {
    name: 'login',
    data(){
      return {
          user:'',
          psd:''
      }
    },
    methods:{
        login(){
            if(this.user=='Jordon' && this.psd =='123456'){
                window.sessionStorage.setItem('code',this.user)
                this.$router.push('/main')
                // window.location.href ='/main'
            }else{
                alert('用户密码错误!')
            }
        }
    },
    created(){
        if(window.sessionStorage.getItem('code')){
            window.location.href ='/main'
        }
    }
  }
</script>

<style>

</style>
