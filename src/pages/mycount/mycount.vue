<template>

  <div class="div">
    <input v-model="username" type="text" placeholder="账号">
    <input v-model="userpwd" type="password" placeholder="密码">
    <p>
      <button @click="login">登录</button>
    </p>

    <footer-view></footer-view>
  </div>


</template>
<script>
  import footerView from '@/components/footer'
  import {sendLogin} from '@/service/getData'
  export default{
      data(){
        return {
          username:'',
          userpwd:''
        }
      },
    components:{
      footerView
    },
    methods:{
      login(){
        let res = sendLogin(this.username,this.userpwd).then(function (res) {
            if(res.code==200){
              alert('登录成功')
            }else{
              alert(res.msg)
            }
        }).catch(function () {
          alert('网络错误!')
        })
      }
    }
  }
</script>
<style scoped>
  .div{
    padding: 10px;
  }
</style>
