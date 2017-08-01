<template>
    <div class="bg">
        <div class="main">
            <p class="header">提示</p>
            <div class="content">你还未登录,请先登录</div>
            <div class="footer">
              <button>取消</button>
              <button>确认</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{

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
    height: 100px;
    background: #ffffff;
    border-radius: 5px;
    text-align: center;
    position: relative;
  }
  .footer{
    position: absolute;
    bottom: 0;
    left:0;
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
