<template>
    <div class="bg" v-if="">
        <div class="main">
            <p class="header">提示</p>
            <div class="content" v-text="contentMsg">默认消息</div>
            <div class="footer">
              <button v-text="cleData" @click="cleFn"></button>
              <button v-text="cfmData" @click="cfmFn"></button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
      data(){
        return {
          cfmData:'确认',
          cleData:'取消'
        }
      },
      props:['contentMsg'],
      mounted(){

      },
      methods:{
        cleFn(){
          this.$emit("cancle",'子组件的数据cancle')
        },
        cfmFn(){
          this.$emit("confirm",'子组件的数据confirm')
        }
      }
    }
</script>
<style scoped>
  .bg{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    background: rgba(58,58,58,0.6);
    z-index: 666;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main{
    width:50%;
    background: #ffffff;
    border-radius: 5px;
    text-align: center;
    position: relative;
    animation: test .3s;
    overflow: hidden;
  }
  .header{
    background: rgba(189, 191, 193, 0.24);
    padding: 2px;
    font-size: 14px;
  }
  .content{
    padding: 10px;
    font-size:15px;
  }
  @keyframes test {
    70%{
      transform: scale(1.1);
    }
    100%{
      transform: scale(1);
    }
  }
  .footer{
    height: 30px;
    width: 100%;
  }
  .footer>button{
    width: 48%;
    margin: 0;
    padding: 0;
    border:none;
    display: inline-block;
    height: 100%;
    background: #fff;
  }
</style>
