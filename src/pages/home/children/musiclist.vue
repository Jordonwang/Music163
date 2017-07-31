<template>
  <div class="commend">
    <ul class="songList">
    	<li v-for="(list,index) in songList">
    		<router-link :to="{path:'/playlist/detail',query:{id:list.id,type:'topsong'}}">
    			<img class="bg" v-if="(index==0)" :src="list.coverImgUrl" alt="list.name">
    			<div class="first">
    				<img :src="list.coverImgUrl" :alt="list.name" width="100%">
    				<span v-if="!(index==0)" v-text="list.creator.nickname"></span>
    			</div>
    			<div class="last">
    				<p v-if="(index==0)">精品歌单</p>
    				<p v-text="list.name"></p>
    				<p v-text="list.copywriter" v-if="(index==0)"></p>
    			</div>
    		</router-link>
    	</li>
    </ul>
  </div>

</template>
<script>
	import {getTopSongList} from '@/service/getData'
  	export default{
  		data(){
  			return {
  				songList:[]
  			}
  		},
  		methods:{
  			async getTopSongListPage(){
  				let songData = await getTopSongList()
  				this.songList = songData.playlists
  			}
  		},
  		mounted(){
			let songData = this.getTopSongListPage()
  			console.log(songData)

  		},
  		created(){

  		}
  	}
</script>
<style scoped lang="scss">

	.songList {
		text-align:center;
		li{
			width: 47%;
			display: inline-block;
			padding:1%;
			a{
				text-decoration:none;
				color:#000;
				.first{
					position:relative;
					span{
						position:absolute;
						bottom:10px;
						left:10px;
						z-index:1;
						color:#fff
					}
				}
				p{
				  text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          position: relative;
          height:2.8em;
          line-height: 1.4em;
          overflow: hidden;
          text-align:left;
          font-size: 13px;
				}
			}
		}
	}
	.songList li:first-child{
		width: 100%;
		padding:0;
		position:relative;
		overflow: hidden;
		a{
			width:100%;
			height:100%;
			display:block;
			padding:10px 0;
			color:#ffffff;
			img{
				width:60%;
				display:inline-block;
				border-radius:50%;
			}
			.first{
				width:38%;
				display:inline-block;
			}
			.last{
				width:60%;
				display:inline-block;
				text-align:left;
				p{
					height:2em;
					line-height: 2em;
				}
			}
			.bg{
				border-radius:0;
				position:absolute;
				left:0;
				width:100%;
				height:100%;
				filter: blur(50px);
			}
		}
	}
</style>
