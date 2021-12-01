<template>
	<view class="template-detail-box">
		<view class="template-detail-title">{{work.title }}</view>
		<view class="template-actions-box row-box">
			<view class="template-actions-item">
				<uni-icons type="eye" size="18" color="#999"></uni-icons>
				<text class="card-actions-item-text">{{work.browseNum}}</text>
			</view>

			<view class="template-actions-item">
				<uni-icons type="heart" size="18" color="#999"></uni-icons>
				<text class="card-actions-item-text">{{work.commentNum}}</text>
			</view>

			<view class="template-actions-item">
				<uni-icons type="fire" size="18" color="#999"></uni-icons>
				<text class="card-actions-item-text">{{work.heatNum}}</text>
			</view>
		</view>
		<view class="template-actions-img-box">
			<image class="template-actions-img" :src="work.img" @error="imageError"></image>
		</view>
		<view>
			{{work.description}}
		</view>
		<view class="template-like-box">
			<uni-icons v-if="!work.likeFlag" type="heart" size="38" color="#ff0000"></uni-icons>
			<uni-icons v-else type="heart-filled" size="38" color="#ff0000"></uni-icons>
		</view>
		<view class="btn-box row-box">
			<button class="btn-info" @click="toView">
				<uni-icons type="eye" size="18" color="#fff"></uni-icons> 立即预览
			</button>
			<button class="btn-success" @click="toMave">
				<uni-icons type="compose" size="18" color="#fff"></uni-icons>立即定制
			</button>
		</view>

	</view>
</template>

<script>
	import {
		getTemplateDetail
	} from '@/common/deerapi.js';
	import commons from '@/common/commons.js';

	export default {
		data() {
			return {
				id: 0,
				work: {
					url: '',
					likeNum: 168,
				},
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			if (option.hasOwnProperty("templateId")) {
				this.id = option.templateId;
				// const cacheToken = uni.getStorageSync("token");
				// if(cacheToken){
				// 	this.authority=cacheToken;
				// }else{
				// 	commons.showTokenError("主题详情需要登录才可浏览哟");
				// 	return;
				// }
				this.getDetail();
			}
		},
		methods: {
			getDetail() {
				getTemplateDetail(this.id).then((res) => {
					console.log("res:", res);
					if (res.data.status == "200") {
						this.work = res.data.data;
						this.work.url = commons.baseViewUrl + this.work.viewName + "?d=" + this.work
							.encryptOptions;
						this.work.img = commons.deerPreUrl + this.work.img;
					}

				})
			},
			imageError: function(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			toView() {
				uni.navigateTo({
					url: '/pages/tabbar/tabbar-template/template-view/template-view?url=' + this.work.url,
					animationType: 'slide-in-bottom',
					animationDuration: 1000
				});
			},
			toMave() {
				let makePage = "";
				if("heartMake"== this.work.customizeName){
					
				}else if("treeMake"== this.work.customizeName){
					makePage = "/pages/tabbar/tabbar-template/template-item/treeMake/treeMake";
				}
				
				uni.navigateTo({
					url: makePage+'?id=' + this.work.id+"&d="+this.work.encryptOptions,
					animationType: 'slide-in-bottom',
					animationDuration: 1000
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.template-detail-box {
		padding: 20rpx;

		.template-detail-title {
			height: 100rpx;
			line-height: 100rpx;
			font-size: 46rpx;
			font-weight: 600;
			text-align: center;
		}

		.template-actions-box {
			color: #999;

			.template-actions-item {
				margin-right: 30rpx;
			}
		}

		.template-actions-img-box {
			margin-top: 20rpx;
			overflow: hidden;

			.template-actions-img {
				width: 100%;
			}
		}

		.template-like-box {
			margin-top: 50rpx;
			text-align: center;
		}

		.btn-box {
			margin-top: 120rpx;

			// .btn-info {
			// 	background-color: #409eff;
			// 	color: #fff;

			// 	&:hover {
			// 		cursor: pointer;
			// 		background-color: #409eff;
			// 	}

			// 	&:active {
			// 		cursor: pointer;
			// 		background-color: #55aaff;
			// 	}
			// }

			// .btn-success {
			// 	background-color: #09BB07;
			// 	color: #fff;

			// 	&:hover {
			// 		cursor: pointer;
			// 		background-color: #09BB07;
			// 	}

			// 	&:active {
			// 		cursor: pointer;
			// 		background-color: #55aa00;
			// 	}
			// }
		}
	}
</style>
