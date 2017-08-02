<template>

  <div class="div">
    <!--<input v-model="username" type="text" placeholder="账号">-->
    <!--<input v-model="userpwd" type="password" placeholder="密码">-->
    <!--<p>-->
      <!--<button @click="login">登录</button>-->
    <!--</p>-->

    <div class="nav">
      <p class="nav-title">账号</p>
    </div>
    <div class="header" v-if="!userID">
        <p class="title">登录网易云音乐</p>
        <p class="desc">手机电脑多端同步,320k高音质无限下载</p>
        <div class="login-wrap">
          <button @click="login" class="login-title">立即登录</button>
        </div>
        <p class="line"></p>
    </div>
    <div class="header" v-if="userID">
        登录成功

      <p class="line"></p>
    </div>

    <div class="list">
      <ul class="list-one">
        <li v-for="val in list1">
          <router-link :to="val.to">
            <img :src="val.imgSrc" alt="" width="26px" height="24px">
            <span>{{val.title}}</span>
            <img src="/static/right_arrow.png" class="arrow" width="12px" height="16px">
          </router-link>
        </li>
      </ul>
      <ul class="list-one">
        <li v-for="val in list2">
          <router-link :to="val.to">
            <img :src="val.imgSrc" alt="" width="26px" height="24px">
            <span>{{val.title}}</span>
            <img src="static/right_arrow.png" class="arrow" width="12px" height="16px">
          </router-link>
        </li>
      </ul>
      <ul class="list-one">
        <li v-for="val in list3">
          <router-link :to="val.to">
            <img :src="val.imgSrc" alt="" width="26px" height="24px">
            <span>{{val.title}}</span>
            <img src="static/right_arrow.png" class="arrow" width="12px" height="16px">
          </router-link>
        </li>
      </ul>
      <ul class="list-one">
        <li v-for="val in list4">
          <router-link :to="val.to">
            <img :src="val.imgSrc" alt="" width="26px" height="24px">
            <img src="static/right_arrow.png" class="arrow" width="12px" height="16px">
            <span>{{val.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="footer"></div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    <footer-view></footer-view>
  </div>


</template>
<script>
  import footerView from '@/components/footer'
  import {sendLogin} from '@/service/getData'
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default{
      data(){
        return {
          username:'15014093499',
          userpwd:'zxcvbnm3499',

          list1:[{
            to:'/mycount/message',
            title: '我的消息',
            imgSrc:'/static/icn_mail.png'
        }],
          list2:[{
            to:'/mycount/message',
            title: '会员中心',
            imgSrc:'/static/icn_vip.png'
          },
            {
              to:'/mycount/message',
              title: '商城',
              imgSrc:'/static/icn_store.png'
          },
            {
              to:'/mycount/message',
              title: '在线听歌免流量',
              imgSrc:'/static/icn_combo.png'
            }],
          list3:[{
            to:'/mycount/message',
            title: '设置',
            imgSrc:'/static/icn_set.png'
          },
            {
              to:'/mycount/message',
              title: '扫一扫',
              imgSrc:'/static/icn_scan.png'
            },
            {
              to:'/mycount/message',
              title: '个性换肤',
              imgSrc:'/static/icn_skin.png'
            },
            {
              to:'/mycount/message',
              title: '夜间模式',
              imgSrc:'/static/icn_night.png'
            },
            {
              to:'/mycount/message',
              title: '定时关闭',
              imgSrc:'/static/icn_time.png'
            },
            {
              to:'/mycount/message',
              title: '音乐闹钟',
              imgSrc:'/static/icn_alamclock.png'
            },
            {
              to:'/mycount/message',
              title: '驾驶模式',
              imgSrc:'/static/icn_vehicle.png'
            }],
          list4:[{
            to:'/mycount/message',
            title: '分享网易云音乐',
            imgSrc:'/static/icn_share.png'
          },
            {
              to:'/mycount/message',
              title: '关于',
              imgSrc:'/static/icn_about.png'
            }]
        }
      },
    computed: {
      ...mapState(['userID']),
      user() {
          return localStorage.getItem('isLogin') === this.userID;
        }
    },
    mounted(){
      if(localStorage.getItem('isLogin')){
          this.getUserId(localStorage.getItem('isLogin'))
      }
    },
    components:{
      footerView
    },
    methods:{
      ...mapActions(['getUserId']),
      login(){
         var _this = this;
        let res = sendLogin(this.username,this.userpwd).then(function (res) {
            if(res.code==200){
              localStorage.setItem('isLogin', res.account.id);
              alert('登录成功')
              _this.getUserId(res.account.id)
            }else{
              localStorage.setItem('isLogin', 'false');
              alert(res.msg)
            }
        }).catch(function () {
          localStorage.setItem('isLogin', 'false');
          alert('网络错误!')
        })
      }
    }
  }
</script>
<style scoped>
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
  .div{
    background: #f5f5f5;
  }
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
  .header{
    margin: 0 auto;
    position: relative;
    width: 100%;
    background: white;
  }
  .title{
    padding-top: 20px;
  }
  .login-wrap{
    margin: 10px 10px 20px 10px;
    border: 1px solid #cccccc;
    border-radius: 2px;
    height: 35px;
  }
  .login-title{
    text-align: center;
    font-size: 18px;
    width: 100%;
    height: 30px;
  }
  .line{
    background: #f5f5f5;
    /*width: 100%;*/
    height: 10px;
  }
  .list{
    margin-bottom: 50px;
    height: 570px;
    background: #f5f5f5;
  }
  .list-one{
    line-height: 0;
    background: white;
    margin-bottom: 10px;
  }
  .arrow{
    float: right;
    right: 10px;
    margin-top: 10px;
  }
  p{
    text-align: center;
  }
  a{
    text-decoration: none;
    display: inline-block;
    justify-content: flex-start;
    align-items: center;
    color: black;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: white;
    border-bottom: 1px solid #f0f0f0;
  }
  img{
    margin: 8px 10px;
    vertical-align: top;
  }
  span{
    font-size: 15px;
  }

</style>
