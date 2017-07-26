<template>
	<div>

	<p>songID: {{songID}}</p>
    <audio autoplay controls="controls" :src="src"></audio>
	<type-loading v-if="loading"></type-loading>
	</div>
</template>
<script>
	import {getSongDetails,getSongUrl} from '@/service/getData'
  import typeLoading from '@/components/loading'

	export default{
		data(){
			return {
				loading:true,
				songID:'',
        src:''
			}
		},
		computed:{
		    id:function () {
		      return this.$route.query.id
		    }
    },
    components:{
      typeLoading
    },
    mounted(){
      this.id = this.$route.query.id;
      this.initData(this.id);
    },
    methods:{
      async initData(id){
        let songUrl = await getSongUrl(id)
        this.src = songUrl.data[0].url
        this.hideLoading();
      },
      hideLoading(){
          this.loading = false;
      }
    },
    watch:{
     '$route':function (to) {
         console.log(to)
         if(to.path=='/playmusic'){
           this.songID='';
           this.id='';
           this.initData(this.id);
           this.loading=true;
         }
       }
    }
	}
</script>
<style>

</style>
