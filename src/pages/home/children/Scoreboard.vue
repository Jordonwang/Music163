<template>
  <div class="commend">
    <p>云音乐官方榜</p>
    <ul>
      <li>
        <router-link :to="{path:'/home/Scoreboard/detail',query:{type:'0'}}">
          <div>新歌榜</div>
          <ul>
            <li v-for="(song,index) in list0" v-if="!(index>2)">{{index+1}}.{{song.name}}</li>
          </ul>
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/home/Scoreboard/detail',query:{type:'1'}}">
          <div>热歌榜</div>
          <ul>
            <li v-for="(song,index) in list1" v-if="!(index>2)">{{index+1}}.{{song.name}}</li>
          </ul>
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/home/Scoreboard/detail',query:{type:'2'}}">
          <div>原创歌曲榜</div>
          <ul>
            <li v-for="(song,index) in list2" v-if="!(index>2)">{{index+1}}.{{song.name}}</li>
          </ul>
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/home/Scoreboard/detail',query:{type:'4'}}">
          <div>电音榜</div>
          <ul>
            <li v-for="(song,index) in list4" v-if="!(index>2)">{{index+1}}.{{song.name}}</li>
          </ul>
        </router-link>
      </li>
    </ul>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
    import axios from 'axios'
    export default{
        data(){
          return {
            list0:[],
            list1:[],
            list2:[],
            list4:[],
          }
        },
        created(){

        },
        mounted(){
          this.getTOPList()
        },
        methods:{
            async getTOPList(){
                var _this = this;
                axios.all([this.getTOPList0(),this.getTOPList1(),this.getTOPList2(),this.getTOPList4()])
                  .then(axios.spread(function (list0,list1,list2,list4) {
                    _this.list0 = list0.data.result.tracks;
                    _this.list1 = list1.data.result.tracks;
                    _this.list2 = list2.data.result.tracks;
                    _this.list4 = list4.data.result.tracks;
                  }))
            },
            getTOPList0(){
                return axios.get('/top/list?idx=0');
            },
            getTOPList1(){
                return axios.get('/top/list?idx=1');
            },
            getTOPList2(){
              return axios.get('/top/list?idx=2');
            },
            getTOPList4(){
              return axios.get('/top/list?idx=4');
            },
        }
    }
</script>
<style scoped lang="scss">
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
.commend{
  p{
    padding-left: 5px ;
    border-left: 2px solid rgba(22,139,245,0.38);
    margin: 5px;
  }
  ul{
     @at-root{
       li{
         border-bottom:1px solid #e6e6e6;
       }
     }
    li{
      display:block;
      margin-bottom:5px;
      a{
        display:flex;
        text-decoration:none;
        color:#000;
        div{
          width:120px;
          height:120px;
          display: inline-block;
          font-family: "cursive";
          font-size:18px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;
        }
        ul{
          display: inline-block;
          list-style: none;
          padding-left: 10px;
          li{
            padding: 5px 0;
            border-bottom:none
          }
        }
      }
    }
    li:nth-child(1) div{
      background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
    }
    li:nth-child(2) div{
      background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    }
    li:nth-child(3) div{
      background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
    }
    li:nth-child(4) div{
      background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
    }
  }
}
</style>
