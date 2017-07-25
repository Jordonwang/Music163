<template>
  <div class="load_bg">
    <div class="typing_loader"></div>
  </div>
</template>
<script>
    export default{

    }
</script>
<style>
  .load_bg{
    background: rgba(1,0,1,0.35);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
  }
  .typing_loader{
    width: 6px;
    height: 6px;
    border-radius: 50%;
    -webkit-animation: typing 1s linear infinite alternate;
    -moz-animation: Typing 1s linear infinite alternate;
    animation: typing 1s linear infinite alternate;
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translateX(-15px);
  }
  @keyframes typing {
    0%{
      background-color: rgba(255,255,255, 1);
      box-shadow: 12px 0px 0px 0px rgba(255,255,255,0.2), 24px 0px 0px 0px rgba(255,255,255,0.2);
    }
    25%{
      background-color: rgba(255,255,255, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(255, 255, 255, 1), 24px 0px 0px 0px rgba(255,255,255,0.2);
    }
    75%{
      background-color: rgba(255,255,255, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(255,255,255,0.2), 24px 0px 0px 0px rgba(255,255,255,1);
    }
  }
</style>
