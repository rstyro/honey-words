<template>
	<view>
		<view v-for="(item,index) in list" :key="item.id">
			<uni-swipe-action :options="options"  @click="bindClick">
				<view class="cont" @click="showDetail(index)">SwipeAction 基础使用场景</view>
			</uni-swipe-action>
		</view>
	</view>

</template>

<script>
	import commons from '@/common/commons.js';  
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	export default {
		components: {
			uniSwipeAction
		},
		data() {
			return {
				pageNo:1,
				pageSize:10,
				pages:0,
				authority:'',
				list:[{
					id:1,
					title:"测试",
					content:"测试内容",
					readFlag: true
				},{
					id:2,
					title:"测试",
					content:"测试内容",
					readFlag: true
				}],
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '确认',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			bindClick(e) {
				console.log(index);
				console.log(e);
				uni.showToast({
					title: `点击了${e.content.text}按钮`,
					icon: 'none'
				})
			},
			getList(){
				var that = this;
				const cacheToken = uni.getStorageSync("token");
				console.log("cacheToken:",cacheToken);
				uni.request({
				    url: commons.baseUrl+"/sys/sysmsg/list",
				    data: {
						pageNo:that.pageNo,
						pageSize:that.pageSize,
				    },
				    header: {
						'Authority':cacheToken
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
				});
			}
			,
			showDetail(index){
				uni.showToast({
					title:  ''+index,
					icon: 'none'
				})
			}
		}
	}
</script>

<style>
.cont {
	height: 90upx;
	line-height: 90upx;
	padding: 0 30upx;
	position: relative;
	background: #fff;
}
.cont::before {
	position: absolute;
	z-index: 3;
	left: 0;
	right: 0;
	top: 0;
	height: 1px;
	content: '';
	transform: scaleY(0.5);
	background-color: $uni-border-color;
}
.cont::after {
	position: absolute;
	z-index: 3;
	left: 0;
	right: 0;
	bottom: 0;
	height: 1px;
	content: '';
	transform: scaleY(0.5);
	background-color: $uni-border-color;
}
	
</style>