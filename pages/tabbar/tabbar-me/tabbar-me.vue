<template>
	<view class="center">
		<view class="center_top" :style='{backgroundImage: "url("+header+")"}'>
			<view class="mask"></view>
		</view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<view class="profily_header">

					</view>
					<text>帅大叔</text>
					<image src="/static/img/me/setting.png" mode=""></image>
				</view>
				<view class="order_status">
					<view class="status" v-for="item in status">
						<image class="icon" :src="item.url" mode="aspectFill"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="baiban">

			</view>
			<view class="center_menu">
				<view class="menu_item" v-for="item in menus">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: [{
						key: 1,
						name: '收藏',
						url: '/static/img/honey/heart-active.png'
					},
					{
						key: 2,
						name: '点赞',
						url: '/static/img/honey/praise-active.png'
					},
					{
						key: 3,
						name: '消息',
						url: '/static/img/me/message.png'
					}
				],
				menus: [
					{
						name: '清除缓存',
						icon: '/static/img/clean.png',
						key: 3,
					},
					{
						name: '打赏',
						icon: '/static/img/reward.png',
						key: 4,
					},
					{
						name: '意见反馈',
						icon: '/static/img/feedback.png',
						key: 5,
					},
					{
						name: '关于我',
						icon: '/static/img/about.png',
						key: 6,
					}

				],
				userInfo:{},
				header:'/static/logo.png'
			};
		},
		onLoad() {
			const userInfo = uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo;
			}else{
				this.showTokenError();
			}
			console.log("userInfo:",userInfo);
		},
		methods: {
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
			}
		},
		computed: {

		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.profily,
	.profily_header {
		border-radius: 8px;
	}

	.center {
		height: 100%;

		&_top {
			height: 25%;
			// background-image: url('/static/logo.png');
			background-repeat: no-repeat;
			background-position: 0% 50%;
			background-size: cover;

			// background: #E6E6E6;
			.mask {
				background: rgba(0, 0, 0, .4);
				height: 100%;
			}
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				// border:1px solid #F7F7F7;
				margin: 0 auto;
				top: -100upx;
				left: 5%;
				background: #FEFEFE;
				padding: 35upx;
				box-sizing: border-box;
				box-shadow: 0px 2px 5px #EDEDED;
			}
		}
	}

	.base {
		display: flex;
		align-items: center;
		border-bottom: 2px solid #F6F6F6;
		padding-bottom: 35upx;
		position: relative;
		.profily_header {
			height: 120upx;
			width: 120upx;
			background-image: url('/static/logo.png');
			background-size: 100%;
		}

		text {
			margin-left: 20px;
			font-size: 30upx;
		}
		
		image{
			position: absolute;
			height: 40upx;
			width: 40upx;
			right: 0px;
			top:0px;
		}
	}

	.order_status {
		display: flex;
		justify-content: space-between;
		margin-top: 35upx;

		.status {
			width: 140upx;
			font-size: 24upx;
			text-align: center;
			letter-spacing: .5px;
			display: flex;
			flex-direction: column;
			.icon {
				width: 50upx;
				height: 50upx;
				margin: 0 auto;
				margin-bottom: 5px;
				
			}
		}
	}

	.baiban {
		background: #FEFEFE;
		height: 300upx;
	}

	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 28upx;
			letter-spacing: 1px;
			padding: 14px 5%;
			background: #FEFEFE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #EFEFEF;

			&:hover {
				background: #F6F6F6 !important;
			}

			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('/static/img/me/right.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			image {
				width: 40upx;
				height: 40upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>
