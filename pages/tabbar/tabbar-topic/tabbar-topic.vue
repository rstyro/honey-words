<template>
	<view class="content">
		<view class="app">
		    <WaterfallFlow :list="list" :loading="loading" @click="choose"></WaterfallFlow>
		</view>
	</view>
</template>

<script>
	import commons from '@/common/commons.js'; 
	import encryptUtil from '@/components/encrypt-util/encrypt-util.vue';
	// 瀑布流组件
	import WaterfallFlow from '@/components/nairenk-waterfall-flow/nairenk-waterfall-flow.vue';
	export default {
		components: {
			WaterfallFlow
		},
		data() {
			return {
				loading: true,
				authority:'',
				list: [], // 列表
				pageNo:1,
				pageSize:10,
				pages:0
			}
		},
		onLoad() {
			this.setToken();
			this.getList();
		}, 
		//下拉刷新
		onPullDownRefresh:function(){
		  this.pageNo=1;
		  this.loading = true;
		  // 清空数组
		  this.list.splice(0,this.list.length);
		  this.getList();
		 },
		onReachBottom() {
			if(this.pages == this.pageNo){
				commons.showNoMore();
				this.loading = false;
				console.log("到底了");
				return;
			}
			this.loading = true;
			this.pageNo++;
			this.getList();
		},
		//分享
		onShareAppMessage(res) {
		    if (res.from === 'menu') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '单身贵族必备神器，撩不到另一半算我输。',
		      path: '/pages/tabbar/tabbar-topic/tabbar-topic'
		    }
		  },
		methods: {
			// 选中
			choose(item) {
				if(!this.authority){
					commons.showTokenError("Soory,主题详情需要登录才可浏览哟");
					return;
				}
				// item 返回选中 JSON 对象
				console.log("chooose:",item);
				uni.navigateTo({
				    url: '/pages/tabbar/tabbar-topic/topic/topic-item/topic-item?topicId='+item.id,
				    animationType: 'zoom-out',
				    animationDuration: 1000
				});
			},
			// 模拟加载数据
			getList() {
				var that = this;
				var url = commons.baseUrl+commons.puaTopicListUrl;
				uni.request({
				    url: url,
				    data: {
				        keyword: that.keyword,
						pageNo:that.pageNo,
						pageSize:that.pageSize,
						type:"topic"
				    },
				    header: {
						'Authority':that.authority
				    }
				}).then(data=>{
					 var [error, res]  = data;
					 console.log("res-topic:",res);
					 console.log("error-topic:",error);
					 if (typeof(res) != "undefined" && res.statusCode == 200 && res.data.status == 200){
						 const aeskey = encryptUtil.rsaDecrypt(res.data.key);
						 var resultData = JSON.parse(encryptUtil.aesDecrypt(res.data.data,aeskey));
						 // var resultData = res.data.data;
					 	that.pages=resultData.pages;
					 	if(resultData.pages>0){
					 		var resultList = resultData.records;
					 		for(var item of resultList){
					 			item.picPath =commons.preUrl+item.picPath;
					 		}
					 		this.list = this.list.concat(resultList);
					 	}
					 }
					 this.loading=false;
					 uni.stopPullDownRefresh();
				});
				
			},
			setToken(){
				const cacheToken = uni.getStorageSync("token");
				if(cacheToken){
					this.authority=cacheToken;
				}
			}
		}
	}
</script>

<style>
	.app{
		border-radius: 50upx;
	}
</style>
