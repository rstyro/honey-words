<template>
	<view class="center">
		<view class="center_top" :style='{backgroundImage: "url("+userInfo.picUrl+")"}'>
			<view class="mask"></view>
		</view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<view class="profily_header" :style='{backgroundImage: "url("+userInfo.picUrl+")"}'>

					</view>
					<text>{{userInfo.nickName}}</text>
					<image src="/static/img/me/setting.png" mode="" @click="settingPage"></image>
				</view>
				<view class="order_status">
					<view class="status" v-for="item in status"  :key="item.key" @click="topClick(item.key)">
						<image class="icon" :src="item.url" mode="aspectFill"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="baiban">

			</view>
			<view class="center_menu">
				<view class="menu_item" v-for="item in menus" :key="item.key" @click="menuClick(item.key)" v-if="item.isShow">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{item.name}}</text>
					<text v-if="item.redDot" class="messageRedDot"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commons from '@/common/commons.js';  
	export default {
		data() {
			return {
				status: [{
						key: 1,
						name: '收藏',
						url: '/static/img/collect.png'
					},
					{
						key: 2,
						name: '鸡汤',
						url: '/static/img/coffee.png'
					},
					{
						name: '打赏',
						url: '/static/img/reward.png',
						key: 3,
					}
				],
				menus: [
					{
						key: 1,
						name: '发布消息',
						icon: '/static/img/publish.png',
						redDot:false,
						isShow: false
					},
					{
						key: 2,
						name: '系统消息',
						icon: '/static/img/me/message.png',
						redDot:false,
						isShow: true
					},
					{
						name: '清除缓存',
						icon: '/static/img/clean.png',
						key: 3,
						redDot:false,
						isShow: true
					},
					
					{
						name: '意见反馈',
						icon: '/static/img/feedback.png',
						key: 4,
						redDot:false,
						isShow: true
					},
					{
						name: '关于我',
						icon: '/static/img/about.png',
						key: 5,
						redDot:false,
						isShow: true
					}

				],
				userInfo:{
					picUrl:"/static/logo.png",
					nickName:"帅大叔"
				}
			};
		},
		onLoad() {
			this.init();
		},
		//下拉刷新
		onPullDownRefresh:function(){
		  this.init();
		 },
		methods: {
			init(){
				const msgNumber = uni.getStorageSync("msgNumber");
				console.log("!!msgNumber:",msgNumber);
				if(msgNumber){
					this.menus[1].redDot=true;
				}
				const userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					this.userInfo=userInfo;
					if(this.userInfo.userId == 1){
						this.menus[0].isShow=true;
					}
				}else{
					commons.showTokenError("是否登录查看更多内容");
				}
				uni.stopPullDownRefresh();
				console.log("userInfo:",userInfo);
			},
			topClick(key){
				switch(key){
					case 1:
						this.collectPage();
						break;
					case 2:
						this.chickenSoup();
						break;
					case 3:
						this.rewardMoney();
						break;
				}
			},
			menuClick(key){
				switch(key){
					case 1:
						this.publishMessage();
						break;
					case 2:
						this.systemMessage();
						break;
					case 3:
						this.cleanCache();
						break;
					case 4:
						this.feedback();
						break;
					case 5:
						this.aboutMe();
						break;
				}
			},
			settingPage(){
				if(!this.userInfo.userId){
					commons.showTokenError();
					return;
				}
				uni.navigateTo({
				    url: '/pages/tabbar/tabbar-me/menus/setting/setting',
				    animationType: 'pop-in',
				    animationDuration: 1000
				});
			},
			collectPage(){
				if(!this.userInfo.userId){
					commons.showTokenError("是否需要登录查看");
					return;
				}
				uni.navigateTo({
				    url: '/pages/tabbar/tabbar-me/menus/collect/collect',
				    animationType: 'pop-in',
				    animationDuration: 1000
				});
			},
			chickenSoup(){
				uni.navigateTo({
				    url: '/pages/tabbar/tabbar-me/menus/chicken-soup/chicken-soup',
				    animationType: 'pop-in',
				    animationDuration: 1000
				});
			},
			rewardMoney(){
				// uni.navigateTo({
				//     url: '/pages/tabbar/tabbar-me/menus/reward/reward',
				//     animationType: 'pop-in',
				//     animationDuration: 1000
				// });
				
				//跳转 给赞
				wx.navigateToMiniProgram({
				  appId: 'wx18a2ac992306a5a4',
				  path: 'pages/apps/largess/detail?id=CZVcGJq6ko0%3D',
				  envVersion: 'release',// release、develop	
				  success(res) {
				    // 打开成功
					console.log("打开过");
				  },
				  fail(res){
					  console.log("失败了");
				  }
				})
			},
			publishMessage(){
				uni.navigateTo({
				    url: '/pages/tabbar/tabbar-me/menus/publish-message/publish-message',
				    animationType: 'zoom-out',
				    animationDuration: 1000
				});
			},
			systemMessage(){
				if(!this.userInfo.userId){
					commons.showTokenError("登录才有此功能");
					return;
				}
				this.menus[1].redDot=false;
				uni.removeStorageSync("msgNumber");
				uni.removeTabBarBadge({
					index: 2
				});
				uni.navigateTo({
				    url: '/pages/tabbar/tabbar-me/menus/system-message/system-message',
				    animationType: 'zoom-out',
				    animationDuration: 1000
				});
			},
			cleanCache(){
				uni.removeStorageSync("token");
				uni.removeStorageSync("userInfo");
				uni.showToast({
					title: '清除成功',
					duration: 2000
				});
			},
			feedback(){
				if(!this.userInfo.userId){
					commons.showTokenError("需要登录才可反馈");
					return;
				}
				uni.navigateTo({
				    url: '/pages/tabbar/tabbar-me/menus/feedback/feedback',
				    animationType: 'zoom-out',
				    animationDuration: 1000
				});
			},
			aboutMe(){
				uni.navigateTo({
				    url: '/pages/tabbar/tabbar-me/menus/about/about',
				    animationType: 'fade-in',
				    animationDuration: 1000
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
			// background-image: url('/static/logo.png');
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
				background: url('https://www.lrshuai.top/upload/mini/right.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			image {
				width: 40upx;
				height: 40upx;
			}
			
			 .messageRedDot{
			  display: inline-block;
			  position: absolute;
			  right: 90upx;
			  top: 40upx;
			  width: 20upx;
			  height: 20upx;
			  background: #d00;
			  color: #fff;
			  border-radius: 50%;
			  text-align: center;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>
