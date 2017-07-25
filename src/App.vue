<template>
  <div id="app">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
  </div>
</template>

<script>
  import store from './store'
//  import {mapState, mapMutations} from 'vuex'
export default {
  name: 'app',
  data(){
      return {
          msgOne:'msg',
          menus: [
            {id: 1, path: '/home', name: 'home', title: '首页'},
            {id: 2, path: '/about', name: 'about', title: '关于'},
            {id: 3, path: '/service', name: 'service', title: '服务'},
            {id: 4, path: '/hello', name: 'hello', title: '测试'}
          ],
        transitionName:""
      }
  },
  computed:{
      add(){
          return store.state.data
      }
  },
  methods:{
      addnum(){
        store.commit('ADD_NUM')
      },
      reducenum(){
          store.commit('REDUCE_NUM',100)
      }
  },
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果
  watch: {
    '$route' (to, from) {
      if(to.path == '/about'){
          console.log(1)
        this.transitionName = 'slide-right';
      }else{
        this.transitionName = 'slide-left';
      }
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  max-width: 480px;
  margin:0 auto;
}
.back-transition {
  transition: transform .5s ease;
}
.back-enter{
  transform: translate(100%,0);
}
.back-leave {
  transform: translate(-100%,0);
}
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
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
.commend{
   margin-top: 76px;
 }
</style>
