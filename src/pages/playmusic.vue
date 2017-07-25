<template>
	<div>
		
	<p>songID: {{songID}}</p>
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
				songID:''
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
      		this.initData()
      	},
      	methods:{
      		async initData(){
		        let songDetails = await getSongDetails(this.id);
		        this.songID = songDetails.songs[0].al.id;
		        let songUrl = await getSongUrl(this.songID)
		        this.hideLoading();
		    },

		    hideLoading(){
		        this.loading = false;
		    }
      	},
      	watch:{
	       '$route':function (to) {
	           console.log(to)
	         if(to.path=='playmusic'){
	           this.playlist=[];
	           this.loading=true;
	           this.getSongUrl(this.ids);
	         }
	       }
   		}
	}
</script>
<style>
	
</style>