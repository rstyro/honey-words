<template>
	<view>
		<view class="card-box" v-for="item in list" :key="item.id" @click="toDetail(item.id)">
			<image mode="aspectFill" class="template-img" :src="imgUrl(item.img)"></image>
			<view class="template-desc">{{item.description}}</view>
			<view  class="card-actions row-box">
				<view class="card-actions-item" >
					<uni-icons type="eye" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">{{conversionNum(item.browseNum)}}</text>
				</view>
				<view class="card-actions-item" >
					<uni-icons type="heart" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">{{conversionNum(item.likeNum)}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import { getTemplateList,refreshToken} from '@/common/deerapi.js';
	import commons from '@/common/commons.js';

	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			this.getDataList();
		},
		//下拉刷新
		onPullDownRefresh: function() {
			this.getDataList();
			uni.stopPullDownRefresh();
		},
		// 页面上拉触底事件的处理函数
		onReachBottom() {
			commons.showNoMore();
			return;
		},

		methods: {
			// 图片拼接
			imgUrl(url) {
				return commons.deerPreUrl + url;
			},
			getDataList() {
				getTemplateList().then(res => {
					// console.log("res:", res);
					if (res.data.status == "200") {
						this.list = res.data.data;
					}
				}).catch(err => {
					console.log("err:", err);
				});
				refreshToken().then(res=>{
					// console.log("refreshToken-res:",res);
					if (res.data.status == "200") {
						uni.setStorageSync("deerToken",res.data.data.token);
					}
				}).catch(err=>{
					
				})
			},
			toDetail(id) {
				
				uni.navigateTo({
					url: '/pages/tabbar/tabbar-template/template-item/template-item?templateId=' + id,
					animationType: 'slide-in-right',
					animationDuration: 1000
				});
			},
			conversionNum(value) {
				if (value < 1000) {
					return value;
				}
				let k = (value / 1000).toFixed(1);
				if (k > 1000) {
					k = Math.round(k);
				}
				return k + "k";
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.card-box{
		margin: 20rpx;
		padding: 20rpx;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		border-radius: 5rpx;
		
		.template-img{
			width: 100%;
			overflow: hidden;
		}
		
		.template-desc{
			margin-top: 20rpx;
			color: #555;
		}
		
		.card-actions {
			padding: 30rpx 0px 10rpx;
			justify-content: flex-end;
			color: #999;

			.card-actions-item:nth-child(n+1) {
				margin-right: 20rpx;
			}
		}
	}
	
	
</style>
