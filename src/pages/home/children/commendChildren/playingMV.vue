<template>
  <div class="rating_page">
    <!--<video :src="url" controls="controls" autoplay></video>-->
  </div>
</template>
<script>
    import {getMVdetail,playMV} from '@/service/getData'
    export default{
        data(){
            return{
                url:''
            }
        },
        computed:{
            id(){
                return this.$route.query.id
          }
        },
        methods:{
            async getMVDetail(id){
              let detail = await getMVdetail(id)
              this.url = detail.data.brs[480]
//              location.replace(detail.data.brs[480])
              await playMV(detail.data.brs[480])
            },
            async playMV(url){
              await playMV(url)
            }
        },
        mounted(){
            this.getMVDetail(this.id)

        },

    }
</script>
<style scoped>
  .rating_page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 202;
  }
</style>
