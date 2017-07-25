<template>
  <div>
    <button style="display: block;padding: 10px 20px" @click="goBack"> < </button>
    <img :src="playlist.coverImgUrl" alt="playlist.description" width="30%">
    <p v-text="playlist.description"></p>
    <ul>
      <li v-for="(list,index) in playlist.tracks" :keys="index">
        <span>{{index+1}}</span>
        <p>{{list.name}}</p>
      </li>
    </ul>
    {{loading}}
    <type-loading v-if="loading"></type-loading>
  </div>
</template>
<script>
    import route from '@/router'
    import {getRecomdDetails} from '@/service/getData'
    import typeLoading from '@/components/loading'

    export default{
      data(){
        return{
          id:'',
          playlist:{
            coverImgUrl:'default.png'
          },
          loading:true,
        }
      },
      computed:{
        ids:function () {
          return this.$route.query.id
        }
      },
      created(){

      },
      components:{
        typeLoading
      },
      methods:{
        goBack(){
          route.goBack()
        },
        async getRecomdDetails(id){
          let recomdDetails = await getRecomdDetails(id)
          this.playlist = recomdDetails.playlist;
          this.loading=false
        }
      },
      mounted(){
        this.id = this.$route.query.id
        this.getRecomdDetails(this.ids)
      },
      watch:{
        '$route':function (to) {
            console.log(to)
          if(to.path=='/playlist/detail'){
            this.playlist=[];
            this.loading=true;
            this.getRecomdDetails(this.ids);
          }
        }
      }
    }
</script>
<style>
  v-clock{
    display: none;
  }
</style>
