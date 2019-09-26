<template>
	<view>
		<view class="title">公告</view>
		<view v-if="isNull" class="cont">暂无公告</view>
		<view v-else v-for="(item,index) in list" :key="item.id">
			<uni-swipe-action :options="options"  @click="bindClick($event,index)">
				<view class="cont" @click="showDetail(item)">{{item.title}}</view>
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
				list:[],
				isNull: true,
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				operate:{
					read:"read",
					del:"del"
				}
			}
		},
		onLoad() {
			const cacheToken = uni.getStorageSync("token");
			console.log("cacheToken:",cacheToken);
			if(cacheToken){
				this.authority=cacheToken;
			}
			this.getList();
		},
		methods: {
			bindClick(e,index) {
				var item = this.list[index];
				console.log("item:",item);
				var oper = this.operate.read;
				if(e.index == 1){
					oper = this.operate.del;
					this.list.splice(index,1);
				}
				this.operateMsg(oper,item.id);
				
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
			showDetail(item){
				uni.showModal({
				    title: item.title,
				    content: item.content,
					showCancel: false,
				    success: res =>{
						if(res.confirm){
							console.log("true");
							this.operateMsg(this.operate.read,item.id);
						}
					}
				});
			},
			operateMsg(operate,id){
				const cacheToken = uni.getStorageSync("token");
				var url = "/sys/sysmsgRead/readMsg";
				if(operate == this.operate.del){
					url = "/sys/sysmsgRead/delMsg";
				}
				uni.request({
				    url: commons.baseUrl+url,
				    data: {msgId:id},
				    header: {'Authority':cacheToken}
				}).then(data=>{
					var [error, res] =data;
					console.log("res:",res);
					console.log("error:",error);
					
				});
			}
		}
	}
</script>

<style>
.title{
	text-align: center;
	padding: 10rpx;
	border-bottom: 1rpx solid #CCCCCC;
}
.cont {
	height: 90upx;
	line-height: 90upx;
	padding: 0 30upx;
	position: relative;
	background: #fff;
	border-bottom: 1rpx solid #CCCCCC;
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