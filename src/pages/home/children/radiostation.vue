<template>
  <div class="commend">
    <div class="commendradio">
      <p class="p">电台个性推荐</p>
      <ul>
        <li v-for="(val,index) in commendRadio" v-if="index<9">
          <router-link to="/">
            <div>
              <img :src="val.picUrl" alt="">
              <span v-text="val.name"></span>
            </div>
            <p v-text="val.copywriter"></p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="catelist">
      <p class="p">电台分类</p>
      <ul>
        <li v-for="val in catelist">
          <p v-text="val.name"></p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {getdjrecommend,getdjcatelist} from '@/service/getdata'
  export default{
    data(){
      return{
        commendRadio:[],
        catelist:[]
      }
    },
    methods:{
      async getcommendradio(){
        let res = await getdjrecommend()
        this.commendRadio = res.djRadios
      },
      async getcatelist(){
        let res = await getdjcatelist()
        this.catelist = res.categories
      }
    },
    mounted(){
      this.getcommendradio()
      this.getcatelist()
    }
  }
</script>
<style scoped lang="scss">
  .commend{

    .commendradio{
      .p{
        margin: 5px;
        border-left: 3px solid #4b9df5;
        padding-left: 5px;
      }
      ul{
        text-align:center;
        li{
          width:31%;
          display:inline-block;
          padding: 3px;
          a{
            text-decoration: none;
            color:#000;
            div{
              position:relative;
              img{
                width:100%;
              }
              span{
                position:absolute;
                bottom: 5px;
                left: 2px;
                font-size:12px;
                color: #ffffff;
              }
            }
            p{
              text-align: left;
              font-size:14px;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              position: relative;
              height:2.8em;
              line-height: 1.4em;
              overflow: hidden;
            }
          }
        }
      }
    }
  .catelist{
    .p{
      margin: 5px;
      border-left: 3px solid #4b9df5;
      padding-left: 5px;
    }
    ul{
      text-align:center;
      li{
        width:33%;
        display: inline-block;
        p{
          border-radius: 3px;
          border: 1px solid #4b9df5;
          margin: 2px;
        }
      }
    }
  }
  }
</style>
