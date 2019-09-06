<template>
	
	<view class="content">
		<mSearch :mode="2" button="inside" backgroundColor="#efeff1" @search="search($event)"></mSearch>
		<view class="honey-list-box">
			<honeyList :honeyList="list" :praiseMe="praiseHoney" :collectMe="collectHoney" ></honeyList>
		</view>
	</view>
</template>

<script>
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
				isFinish:true,
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
				this.showNoMore();
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
					this.authority='205dbd17d32142c8a574254d79f559c0'
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
				if(res.data.status == 200 && res.data.data.pages>0){
					console.log("list:",res.data.data.records);
					if(this.pageNo == 1){
						uni.pageScrollTo({
						    scrollTop: 0,
						    duration: 30
						});
					}
					this.pages=res.data.data.pages;
					this.list = this.list.concat(res.data.data.records);
				}else if(res.data.status == "70000"){
					this.showTokenError();
				}else{
					this.requestError();
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
				//请求
				uni.request({
				        url: this.api.baseUrl+this.api.collectUrl,
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
							console.log("index",index);
							this.list[index].collectFlag= !this.list[index].collectFlag;
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
			},
			showTokenError(){
				uni.showModal({
					title: '提示',
					content: 'token失效，请重新授权登录',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.reLaunch({
								url: '/pages/auth/auth'
							});
						}
					}
				});
			},
			requestError(){
				uni.showToast({
					title: "服务器异常，请求失败",
					icon: "none"
				});
			},
			showNoMore(){
				uni.showToast({
					title: "没有更多的数据了",
					icon: "none"
				});
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
</style>
