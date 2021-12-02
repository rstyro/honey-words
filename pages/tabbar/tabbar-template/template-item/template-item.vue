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
				<text class="card-actions-item-text">{{work.likeNum}}</text>
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
			<vue-star  class="icon-like" :active="work.likeFlag" animate="animated bounce" >
				<image slot="icon" @click="like" v-if="work.likeFlag" class="star-icon" src="/static/img/honey/heart-active.png"></image>
				<image slot="icon" @click="like" v-else class="star-icon" src="/static/img/honey/heart.png"></image>
			</vue-star>
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
	import VueStar from '@/components/star-animated/star-animated.vue';
	import { getTemplateDetail,addLike} from '@/common/deerapi.js';
	import commons from '@/common/commons.js';

	export default {
		components: {
			VueStar
		},
		data() {
			return {
				id: 0,
				work: {
					url: '',
					likeNum: 168,
				},
				dto:{
					tableId:-1,
					tableType:'template',
				}
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			if (option.hasOwnProperty("templateId")) {
				this.id = option.templateId;
				this.dto.tableId = option.templateId;
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
			like(){
				const deerToken = uni.getStorageSync("deerToken");
				if(!deerToken){
					commons.showTokenError("需要登录才可操作哟");
					return;
				}
				addLike(this.dto).then((res) => {
					console.log("res:", res);
					if(this.work.likeFlag){
						this.work.likeNum-=1;
					}else{
						this.work.likeNum+=1;
					}
					this.work.likeFlag = !this.work.likeFlag;
				}).catch(err=>{
					console.log("err=",err);
				})
			},
			toView() {
				uni.navigateTo({
					url: '/pages/tabbar/tabbar-template/template-view/template-view?url=' + encodeURIComponent(this.work.url),
					animationType: 'slide-in-bottom',
					animationDuration: 1000
				});
			},
			toMave() {
				const deerToken = uni.getStorageSync("deerToken");
				if(!deerToken){
					commons.showTokenError("需要登录才可定制模板哟");
					return;
				}
				let makePage = "";
				if("heartMake"== this.work.customizeName){
					makePage = "/pages/tabbar/tabbar-template/template-item/heartMake/heartMake";
				}else if("heartbeatMake"== this.work.customizeName){
					makePage = "/pages/tabbar/tabbar-template/template-item/heartbeatMake/heartbeatMake";
				}else if("treeMake"== this.work.customizeName){
					makePage = "/pages/tabbar/tabbar-template/template-item/treeMake/treeMake";
				}else if("particleMake"== this.work.customizeName){
					makePage = "/pages/tabbar/tabbar-template/template-item/particleMake/particleMake";
				}else if("pointBoomMake"== this.work.customizeName){
					makePage = "/pages/tabbar/tabbar-template/template-item/pointBoomMake/pointBoomMake";
				}
				if(makePage == ""){
					uni.showToast({
						icon: "none",
						title: '该模板定制页面正在拼命开发中...',
						duration: 1000
					});
					return;
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
		
		.icon-like{
			margin: 0rpx auto;
			
			.star-icon{
				width: 120rpx;
				height: 120rpx;
				vertical-align: middle;
			}
		}
		
		
	}
</style>
