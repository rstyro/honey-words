<template>
	<view class="content">
		<mSearch :mode="2" button="inside" backgroundColor="#efeff1" @search="search($event)"></mSearch>
		<text v-if="isNull"  class="null-data">暂无数据</text>
		<view v-else class="honey-list-box" >
			<honeyList  :honeyList="list" @praiseMe="praiseHoney" @collectMe="collectHoney" ></honeyList>
		</view>
		
	</view>
</template>

<script>
	import commons from '@/common/commons.js';  
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	import honeyList from '@/pages/honey-words/honey-word-list/honey-word-list.vue';
	
	export default {
		data() {
			return {
				list:[],
				keyword:'',
				pageNo:1,
				pageSize:10,
				pages:0,
				typeCode:'sayLove',
				authority:'abc',
				isNull:true
			};
		},
		onLoad() {
			this.setToken();
			this.getList();
		}, 
		//下拉刷新
		onPullDownRefresh:function(){
		  this.pageNo=1;
		  // 清空数组
		  this.list.length=0;
		  this.getList();
		 },
		// 页面上拉触底事件的处理函数
		onReachBottom(){
			if(this.pages == this.pageNo){
				console.log("到底了");
				commons.showNoMore();
				return;
			}
			this.pageNo++;
			this.getList();
		},
		components: {
			mSearch,
			honeyList
		},
		methods: {
			search(val) {
				this.keyword=val;
				this.pageNo=1;
				// 清空数组
				this.list.length=0;
				this.getList();
			},
			setToken(){
				const cacheToken = uni.getStorageSync("token");
				console.log("cacheToken:",cacheToken);
				if(cacheToken){
					this.authority=cacheToken;
				}
			},
			praiseHoney(id){
				commons.praise(commons.baseUrl+commons.praiseUrl,this.authority,id,commons.sftType,this.list);
			},
			collectHoney(id){
				commons.collect(commons.baseUrl+commons.collectUrl,this.authority,id,commons.sftType,this.list);
			},
			getList(){
				uni.showNavigationBarLoading();
				var that = this;
				uni.request({
				    url: commons.baseUrl+commons.puaListUrl,
				    data: {
				        keyword: that.keyword,
						pageNo:that.pageNo,
						pageSize:that.pageSize,
						typeCode:that.typeCode
				    },
				    header: {
						'Authority':that.authority
				    }
				}).then(data=>{
					var [error, res] =data;
					console.log("res:",res);
					if(error){
						console.log(error);
					}
					if(typeof(res) != "undefined" && res.statusCode == 200 && res.data.status == 200){
						console.log("list:",res.data.data.records);
						if(this.pageNo == 1){
							uni.pageScrollTo({
							    scrollTop: 0,
							    duration: 30
							});
						}
						
						this.pages=res.data.data.pages;
						if(res.data.data.pages>0){
							this.isNull=false;
							this.list = this.list.concat(res.data.data.records);
						}else{
							this.isNull=true;
						}
							
					}else if(res.data.status == "70000"){
						uni.removeStorageSync("token");
						commons.showTokenError();
					}else{
						commons.requestError();
					}
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
				});
				
			},
		}
	};
</script>

<style>
.content{
	background: #efeff1;
}
.honey-list-box{
	width: 100%;
	padding-top: 80rpx;
	padding-bottom: 5rpx;
}
.null-data{
  position: absolute;
  top: 15%;
  width: 100%;
  text-align: center;
}
</style>
