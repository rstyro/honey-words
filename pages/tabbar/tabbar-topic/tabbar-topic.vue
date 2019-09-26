<template>
	<view class="content">
		<view class="app">
		    <WaterfallFlow :list="list" :loading="loading" @click="choose"></WaterfallFlow>
		</view>
	</view>
</template>

<script>
	import commons from '@/common/commons.js';  
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

		methods: {
			// 选中
			choose(item) {
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
					 console.log("res:",res);
					 console.log("error:",error);
					 if (typeof(res) != "undefined" && res.statusCode == 200 && res.data.status == 200){
					 	that.pages=res.data.data.pages;
					 	if(res.data.data.pages>0){
					 		var resultList = res.data.data.records;
					 		for(var item of resultList){
					 			item.picPath =commons.preUrl+item.picPath;
					 		}
					 		this.list = this.list.concat(resultList);
					 	}
					 }
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
