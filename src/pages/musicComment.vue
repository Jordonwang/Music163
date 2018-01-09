<template>
    <div class="main">
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller" noDataText="暂时没数据啦">
      <yd-navbar :title="'评论('+ total +')'" bgcolor="#3CAEEA" color="#ffffff">
        <div @click="goBack" slot="left">
          <yd-navbar-back-icon color="#ffffff"></yd-navbar-back-icon>
        </div>
      </yd-navbar>
      <div class="hed">
        <div class="l">
          <img :src="songImg" alt="">
        </div>
        <div class="r">
          <p>{{songName}}</p>
          <span>{{ar}}</span>
        </div>
      </div>
      <div class="hot" v-if="hotComments.length>0">热门评论</div>
      <ul>
        <li class="list" v-for="hComments in hotComments">
          <div class="l">
            <img width="100%" :src="hComments.user.avatarUrl" alt="">
          </div>
          <div class="r">
            <div class="hd">
              <div>
                <p>{{hComments.user.nickname}}</p>
                <p>{{hComments.time | time}}</p>
              </div>
              <div>
                <img  src="/static/friendslove.png" alt="">
                <span>{{hComments.likedCount}}</span>
              </div>
            </div>
            <p class="p">{{hComments.content}}</p>
          </div>
        </li>
      </ul>
      <div class="hot" v-if="commentList.length>0">最新评论</div>

        <ul>
        <li class="list" v-for="hComments in commentList">
          <div class="l">
            <img width="100%" :src="hComments.user.avatarUrl" alt="">
          </div>
          <div class="r">
            <div class="hd">
              <div>
                <p>{{hComments.user.nickname}}</p>
                <p>{{hComments.time | time}}</p>
              </div>
              <div>
                <img  src="/static/friendslove.png" alt="">
                <span>{{hComments.likedCount}}</span>
              </div>
            </div>
            <p class="p">{{hComments.content}}</p>
          </div>
        </li>
      </ul>

      <p class="noComment" v-if="commentList.length==0">暂无评论哦</p>
      </scroller>
    </div>
</template>

<script>
    import {getSongUrl,getSongDetails,getMusicComment} from '@/service/getData'
    import {mapState,mapMutations,mapActions} from 'vuex'
    import Vue from 'vue'
    import VueScroller from 'vue-scroller'
    Vue.use(VueScroller)

    export default {
        name: "music-comment",
        data(){
          return {
            commentList : [],
            hotComments:[],
            total:'0',
            currentPage:1,
            noData:''
          }
        },
        computed:{
          ...mapState(['playingSongId','songName','songImg','art']),
          id(){
            return this.$route.params.id
          },
          ar(){
            var arr = ''
            if(this.art){
              this.art.forEach(function (i) {
                arr+=i+' '
              })
            }

            return arr
          }
        },
      methods:{
          ...mapActions(['']),
        async infinite(done) {
          if(this.noData) {
            setTimeout(()=>{
              this.$refs.myscroller.finishInfinite(2);
            })
            return;
          }
          let self = this;//this指向问题

          setTimeout(() => {
              getMusicComment(this.id,self.currentPage).then(function (res) {

              if(res.comments.length>0){
                let len = res.comments.length
                for(var i =0;i<len;i++){
                  self.commentList.push(res.comments[i])
                }
                self.currentPage++
              }else{
                self.noData= '暂无更多数据'
              }
                self.$refs.myscroller.resize();
                done()
            })
          }, 1500)
        },
        refresh() {
          console.log('refresh')
          var _this = this
          getMusicComment(this.id).then(function (res) {
            if(res.comments.length>0){
              _this.commentList = res.comments
              _this.hotComments = res.hotComments
              _this.total = res.total
              _this.$refs.myscroller.finishPullToRefresh()
            }
          })
        },
          goBack(){
            this.$router.go(-1)
          },
          async getComment(id){
            console.log(111)
            let res = await getMusicComment(id)
            console.log(res)
            this.commentList = res.comments
            this.hotComments = res.hotComments
            this.total = res.total
          }
        },
        filters: {
        time: function (now) {
          if (!now) return ''
          now = new Date(now)
          var year=now.getFullYear();
          var month=now.getMonth()+1;
          var date=now.getDate();
          return year+"年"+month+"月"+date+"日"
        }
        },
        created(){
        },
        mounted(){
          this.getComment(this.id)
        }
    }
</script>

<style scoped lang="scss">
  .main{
    background: #fff;
  }
.hed{
  padding: 0.2rem;
  box-sizing: border-box;
  display: flex;
  .l{
    width: 20%;
    img{
      width: 100%;
    }
  }
  .r{
    width: 80%;
    padding: 0.1rem 0 0.1rem 0.2rem;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-around;
    p{
      font-size: 0.3rem;
    }
    span{
      font-size: 0.2rem;
      color: #c1c1c1;
    }
  }
}
  .hot{
    background: #e8e8e8;
    padding: 0.1rem 0.2rem 0.1rem 0.2rem;
    color: #000000;
  }
  ul{
    padding-top: 0.1rem;
  }
  .list{
    display: flex;
    margin: 0.1rem;
    .l{
      width: 10%;
      img{
        border-radius: 50%;
      }
    }
    .r{
      width: 90%;
      padding:0 0.1rem 0.2rem 0;
      margin-left: 0.2rem;
      border-bottom: 1px solid #e0e0e0;
      .hd{
        display: flex;
        justify-content: space-between;
        div{
        }
        div:first-child{
          display: inline-flex;
          flex-direction: column;
          p:last-child{
            color: #979797;
            margin-top: 0.1rem;
          }
        }
        div:last-child{
          display: inline-flex;
          flex-direction: row-reverse;
          align-items: center;
          height: 0.3rem;
          img{
            width: 0.3rem;
            margin-top: -0.1rem;
          }
          span{
            margin-right: 0.1rem;
            color: #a4a4a4;
          }
        }
      }
      .p{
        font-size: 0.28rem;
        padding-top: 0.15rem;
        padding-bottom: 0.05rem;
      }
    }
  }
  .list:last-child{
    .r{
      border-bottom:none
    }
  }
  .noComment{
    text-align: center;
    padding: 0.1rem;
  }
</style>
