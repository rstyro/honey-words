<template>
	<view class="content">
		<view class="app">
		        <WaterfallFlow :list="list" :loading="loading" @click="choose" ></WaterfallFlow>
		</view>
		<view style="text-align: center;">我是有底线的</view>
	</view>
</template>

<script>
	import commons from '@/common/commons.js';  
	// 瀑布流组件
	import WaterfallFlow from '@/components/nairenk-waterfall-flow/nairenk-waterfall-flow.vue';
	export default {
		data() {
			return {
				loading: true,
				authority:'',
				list: [], // 列表
				pageNo:1,
				pageSize:4,
				pages:0,
				api:{
					baseUrl:"http://localhost:8689",
					listUrl:"/pua/speechcraftType/list",
					praiseUrl:"/pua/praise/praiseMe",
					collectUrl:"/pua/collect/collectMe",
					pre:"https://www.lrshuai.top/miniadmin/show"
				},
			}
		},
		onLoad() {
			this.setToken();
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
				console.log(item);
				// uni.navigateTo({
				//     url: '/pages/topic/topic-item/topic-item?topicId='+item.id,
				//     animationType: 'zoom-out',
				//     animationDuration: 1000
				// });
			},
			// 模拟加载数据
			async getList() {
				var that = this;
				var url = commons.baseUrl+that.api.listUrl;
				var [error, res] = await uni.request({
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
				});
				console.log("res:",res);
				this.pages=res.data.data.pages;
				if(res.data.data.pages>0){
					var resultList = res.data.data.records;
					for(var item of resultList){
						item.picPath =commons.preUrl+item.picPath;
					}
					this.list = this.list.concat(resultList);
				}
				
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
		},
		components: {
			WaterfallFlow
		}
	}
</script>

<style>

</style>
