<template>
	
	<view class="content">
		<mSearch :mode="2" button="inside" backgroundColor="#efeff1" @search="search($event)"></mSearch>
		<text v-if="isNull"  class="null-data">暂无数据</text>
		<view v-else class="honey-list-box" >
			<honeyList  :honeyList="list" :praiseMe="praiseHoney" :collectMe="collectHoney" ></honeyList>
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
				authority:'',
				isNull:true,
				api:{
					baseUrl:"http://localhost:8689",
					listUrl:"/pua/speechcraft/list",
					praiseUrl:"/pua/praise/praiseMe",
					collectUrl:"/pua/collect/collectMe"
				},
				tableType:{
					topic:"topic",
					sft:"speechcraft"
				}
			};
		},
		onLoad() {
			this.api.baseUrl=getApp().globalData.baseUrl;
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
				}else{
					 this.authority='a050ddf856ea4b0c9c38f10a1692248e'
					// this.authority='cd8ef7dcd3254932824e30526db19a6c'
				}
			},
			async getList(){
				uni.showNavigationBarLoading();
				var that = this;
				var [error, res] = await uni.request({
				    url: that.api.baseUrl+that.api.listUrl,
				    data: {
				        keyword: that.keyword,
						pageNo:that.pageNo,
						pageSize:that.pageSize,
						typeCode:that.typeCode
				    },
				    header: {
						'Authority':that.authority
				    }
				});
				console.log("res:",res);
				if(error){
					console.log(error);
				}
				if(res.data.status == 200){
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
			},
			praiseHoney(id){
				//请求
				uni.request({
				        url: this.api.baseUrl+this.api.praiseUrl,
					    method:"POST",
						header: {
							'Authority':this.authority,
							"content-type": "application/x-www-form-urlencoded"
						},
						data:{
							tableType:this.tableType.sft,
							tableId:id
						}
				  }).then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
				        var [error, res]  = data;
						if(res.data.status == 200){
							let index = this.list.findIndex(item => item.id === id );
							var item = this.list[index];
							item.praiseFlag = !item.praiseFlag
							if(item.praiseFlag){
								++item.praiseNum;
							}else{
								item.praiseNum = (item.praiseNum>0)?item.praiseNum-1:item.praiseNum
							}
							this.list[index]=item;
							console.log("点赞成功")
						}else{
							uni.showToast({
								title: res.data.message,
								icon: "none"
							});
						}
						if(error){
							console.log(error);
						}
				    })
			},
			collectHoney(id){
				var that = this;
				//请求
				uni.request({
				        url: that.api.baseUrl+that.api.collectUrl,
					    method:"POST",
						header: {
							'Authority':that.authority,
							"content-type": "application/x-www-form-urlencoded"
						},
						data:{
							tableType:that.tableType.sft,
							tableId:id
						}
				  }).then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
				        var [error, res]  = data;
						if(res.data.status == 200){
							let index = that.list.findIndex(item => item.id === id );
							console.log("index",index);
							that.list[index].collectFlag= !that.list[index].collectFlag;
							console.log("收藏成功,id={}",id)
						}else{
							uni.showToast({
								title: res.data.message,
								icon: "none"
							});
						}
						if(error){
							console.log(error);
						}
				    })
			}
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
