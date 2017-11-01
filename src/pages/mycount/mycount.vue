<template>

  <div class="div">
    <div class="nav">
      <p class="nav-title">账号</p>
    </div>
    <div class="header" v-if="!userID">
      <p class="title">登录网易云音乐</p>
      <p class="desc">手机电脑多端同步,320k高音质无限下载</p>
      <div class="login-wrap">
        <button @click="showLogin" class="login-title">立即登录</button>
      </div>
      <p class="line"></p>
    </div>
    <div class="header" v-if="userID">
      <img :src="avatarUrl"></img>
      <p>
        您已登录!
        <a @click="loginOut" href="javascript:void(0)">退出登录</a>
      </p>
      <p class="line"></p>
    </div>
    <div class="showLogin" :style="'display:'+showlogin+';top:'+top+';'">

      <a href="javascript:void(0)" class="goback">
        <span @click="goMycount"></span>
      </a>
      <div class="login">
        <img src="/static/welcome.png" alt="">
      </div>
      <button @click="phoneLogin">手机号登录</button>
      <button>注册</button>
      <a class="visitor" href="/">游客试用</a>
      <transition name="router-slid" mode="out-in">
        <span id="phoneLogin" v-if="phonelogin" class="phoneLogin">
          <header>
            <a @click="goBack" href="javascript:void(0)"></a>
            <span>手机号登录</span>
          </header>
          <div>
            <input v-model="username" type="text" placeholder="手机号">
          </div>
          <div>
            <input v-model="userpwd" type="password" placeholder="密码">
          </div>
          <button @click="login">登录</button>
        </span>
      </transition>
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
    <dialog-info showCancle="" v-if="dialog" :contentMsg="contentMsg" @confirm="confirmevent"></dialog-info>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    <footer-view></footer-view>
  </div>
</template>
<script>
  import footerView from '@/components/footer'
  import {sendLogin} from '@/service/getData'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import dialogInfo from '@/components/dialog'

  export default {
    data() {
      return {
        username: '',
        userpwd: '',
        showlogin: 'none',
        top: '100%',
        phonelogin: false,
        dialog: false,
        contentMsg: '',
        list1: [{
          to: '/mycount/message',
          title: '我的消息',
          imgSrc: '/static/icn_mail.png'
        }],
        list2: [{
          to: '/mycount/message',
          title: '会员中心',
          imgSrc: '/static/icn_vip.png'
        },
          {
            to: '/mycount/message',
            title: '商城',
            imgSrc: '/static/icn_store.png'
          },
          {
            to: '/mycount/message',
            title: '在线听歌免流量',
            imgSrc: '/static/icn_combo.png'
          }],
        list3: [{
          to: '/mycount/message',
          title: '设置',
          imgSrc: '/static/icn_set.png'
        },
          {
            to: '/mycount/message',
            title: '扫一扫',
            imgSrc: '/static/icn_scan.png'
          },
          {
            to: '/mycount/message',
            title: '个性换肤',
            imgSrc: '/static/icn_skin.png'
          },
          {
            to: '/mycount/message',
            title: '夜间模式',
            imgSrc: '/static/icn_night.png'
          },
          {
            to: '/mycount/message',
            title: '定时关闭',
            imgSrc: '/static/icn_time.png'
          },
          {
            to: '/mycount/message',
            title: '音乐闹钟',
            imgSrc: '/static/icn_alamclock.png'
          },
          {
            to: '/mycount/message',
            title: '驾驶模式',
            imgSrc: '/static/icn_vehicle.png'
          }],
        list4: [{
          to: '/mycount/message',
          title: '分享网易云音乐',
          imgSrc: '/static/icn_share.png'
        },
          {
            to: '/mycount/message',
            title: '关于',
            imgSrc: '/static/icn_about.png'
          }]
      }
    },
    computed: {
      ...mapState(['userID', 'avatarUrl']),
    },
    mounted() {
      if (localStorage.getItem('userId')) {
        this.getUserId(localStorage.getItem('userId'))
      }
      if (localStorage.getItem('avatarUrl')) {
        this.setUserAvatarUrl(localStorage.getItem('avatarUrl'))
      }
    },
    components: {
      footerView, dialogInfo
    },
    methods: {
      ...mapActions(['getUserId', 'setUserAvatarUrl']),
      goBack() {
        this.phonelogin = false
      },
      loginOut() {
        this.contentMsg = '退出成功!'
        this.dialog = true
        localStorage.removeItem('userId')
        this.getUserId('')
      },
      confirmevent() {
        this.dialog = false
        if (localStorage.getItem('userId')) {
          this.top = '100%'
          this.phonelogin = false
          this.$router.push('/mycount')
        }
      },
      login() {
        var _this = this;
        if (this.username == '' || this.userpwd == '') {
          _this.contentMsg = '手机号或密码不能为空!'
          _this.dialog = true
          return
        }
        sendLogin(this.username, this.userpwd).then(function (res) {
          if (res.code == 200) {
//              debugger
            localStorage.setItem('userId', res.account.id);
            localStorage.setItem('avatarUrl', res.profile.avatarUrl);
            _this.setUserAvatarUrl(res.profile.avatarUrl)
            _this.getUserId(res.account.id)
            _this.contentMsg = '登录成功!'
            _this.dialog = true
          } else {
            localStorage.setItem('userId', '');
            _this.contentMsg = res.code
            _this.dialog = true
          }
        }).catch(function () {
          localStorage.setItem('userId', '');
          _this.contentMsg = '网络错误!'
          _this.dialog = true
        })
      },
      showLogin() {
        this.showlogin = 'block'
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        var _this = this;
        setTimeout(function () {
          _this.top = 0
        }, 100)
      },
      phoneLogin() {
        this.phonelogin = true
      },
      goMycount() {
        this.top = '100%'
      }
    }
  }
</script>
<style scoped>
  header {
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: #4b9df5;
    color: #ffffff;
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }

  header > a {
    position: absolute;
    width: 20px;
    height: 20px;
    display: block;
    left: 0;
    margin-top: 5px;
    left: 10px;
    background: transparent;
    border: none;

  }

  header > a:after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-right: 1px solid #fff;
    border-top: 1px solid #fff;
    transform: rotate(225deg);
    margin-top: 8px;
    margin-left: 5px;
  }

  .goback {
    background: transparent;
    border-bottom: none;
  }

  .goback > span {
    display: block;
    width: 15px;
    height: 15px;
    border-right: 1px solid #fff;
    border-top: 1px solid #fff;
    transform: rotate(225deg);
    margin-top: 15px;
    margin-left: 15px;
  }

  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }

  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }

  .div {
    background: #f5f5f5;
  }

  .nav {
    background: #3CAEEA;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
  }

  .nav-title {
    padding-top: 10px;
    color: white;
  }

  .header {
    margin: 0 auto;
    position: relative;
    width: 100%;
    background: white;
    text-align: center;
  }

  .header img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 20px;
  }

  .header > p {
    padding: 10px 20px 20px 20px;
  }

  .title {
    padding-top: 20px;
  }

  .login-wrap {
    margin: 10px 10px 20px 10px;
    border-radius: 2px;
    height: 35px;
  }

  .login-title {
    text-align: center;
    font-size: 18px;
    width: 100%;
    height: 30px;
  }

  .line {
    background: #f5f5f5;
    /*width: 100%;*/
    height: 10px;
  }

  .list {
    margin-bottom: 50px;
    height: 570px;
    background: #f5f5f5;
  }

  .list-one {
    line-height: 0;
    background: white;
    margin-bottom: 10px;
  }

  .arrow {
    float: right;
    right: 10px;
    margin-top: 10px;
  }

  p {
    text-align: center;
  }

  a {
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

  img {
    margin: 8px 10px;
    vertical-align: top;
  }

  span {
    font-size: 15px;
  }

  .showLogin {
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgb(255, 193, 178), rgba(248, 255, 253, 1));
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 6;
    display: none;
    transition: all .3s;
    text-align: center;
  }

  .showLogin > div {
    text-align: center;
    width: 80px;
    height: 80px;
    margin: 50px auto 40px;
    background: #f72929;
    border-radius: 12px;
  }

  .showLogin > div > img {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .showLogin > button {
    width: 80%;
    margin: 20px auto;
    height: 40px;
    line-height: 0px;
    padding: 10px 0;
    display: block;
    border: 1px solid #c76262;
    border-radius: 20px 20px;
    background: transparent;
    color: #c76262;
    font-size: 16px;
  }

  .visitor {
    background: transparent;
    text-align: center;
    display: inline;
    color: #9c9c9c;
    border-bottom: 1px solid #9c9c9c;
    font-size: 14px;
  }

  .phoneLogin {
    width: 100%;
    height: 100%;
    background: #fff;
    display: block;
    position: fixed;
    top: 0;
  }

  .phoneLogin > div {
    border-bottom: 1px solid #E6E6E6;
    width: 90%;
    margin: 0 auto
  }

  .phoneLogin > div > input {
    width: 80%;
    height: 30px;
    margin: 5px;
    border: none;
  }

  .phoneLogin > button {
    width: 80%;
    margin: 20px auto;
    background: #4b9df5;
    height: 40px;
    border-radius: 20px;
    border: none;
    color: #fff;
    font-size: 15px;
  }
</style>
