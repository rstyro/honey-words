<template>
	<view class="content">
		<button type="primary" class="" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">授权获取用户信息</button>

	</view>
</template>

<script>
	import commons from '@/common/commons.js';  
	export default {
		data() {
			return {
				authority:'',
				userInfo:''
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			wxGetUserInfo:function(res){
				console.log("wxGetUserInfo-res:",res);
				var that = this;
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}else{
					var tagUserInfo = res.detail.userInfo;
					console.log("tagUserinfo:",tagUserInfo);
					// 微信登陆，获取一个Code，发送到后台获取openId
					uni.login({
					   provider: 'weixin',
					   success: (loginRes)=> {
					       console.log("login-loginRes:",JSON.stringify(loginRes));
						   // 请求自己的服务器
						   uni.request({
						       url: commons.baseUrl+'/pua/users/login',
							   method:"POST",
							   header: {
								   "content-type": "application/x-www-form-urlencoded",
								   "Authority":that.authority,
								   },
						       data: {
						   		code: loginRes.code,
						   		nickName: tagUserInfo.nickName,
						   		userUrl: tagUserInfo.avatarUrl,
						   		sex: tagUserInfo.gender,
						   		country: tagUserInfo.country,
						   		province: tagUserInfo.province,
						   		city: tagUserInfo.city
						       },
							   success: (res) => {
								   console.log("login-res:",res);
									if(res.statusCode == 200 && res.data.status == 200){
										that.showRedDot(res.data.msgCount);
										//保存token到本地
										that.saveDataToStorage(res.data);
									}
									
						       },fail(error) {
								   console.log(error);
								   that.showError();
						       }
						   });
					   }
					});
					
				}
			},
			// 自动登陆
			autoLogin:function(){
				var that = this;
				console.log("header:",that.header);
				console.log("authority:",that.authority);
			   // 请求自己的服务器
			   uni.request({
				   url: commons.baseUrl+'/pua/users/autoLogin',
				   method:"POST",
				   header: {
						   "content-type": "application/x-www-form-urlencoded",
						   "Authority":that.authority,
					},
				   dataType: "json",
				   data: {'Authority':that.authority},
				   success: (res) => {
					   console.log(res,"<<=res");
						if(res.statusCode == 200 && res.data.status == 200){
							//保存token到本地
							that.saveDataToStorage(res.data);
							that.showRedDot(res.data.msgCount);
						}else if(res.data.status == "70000"){
							uni.showToast({
								title: "token失效，请重新授权登录",
								icon: "none"
							});
						}else{
							that.showError();
						}
						
				   },fail(error) {
					   console.log(error);
					   that.showError();
				   }
			   });
			},
			init:function(){
				const catchToken = uni.getStorageSync("token");
				console.log("catchToken:",catchToken);
				if(catchToken){
					this.authority=catchToken;
					this.autoLogin();
				}
			},
			saveDataToStorage: function(data){
				console.log("storage-data:",data);
				if(data.token){
					uni.setStorageSync("token",data.token);
				}
				if(data.userInfo){
					uni.setStorageSync("userInfo",data.userInfo);
				}
				// 跳转到首页
				uni.switchTab({
				    url: '/pages/tabbar/tabbar-home/tabbar-home'
				});
			},
			showRedDot:function(amount){
				console.log("red-dot:",amount);
				if(amount> 0){
					uni.setTabBarBadge({
						index: 2,
						text: ''+amount
					});
				}
			},
			showError: function(){
				uni.showToast({
					title: "服务器异常，登录失败",
					icon: "none"
				});
			}
		}
	}
</script>

<style lang="scss">
	.content{
		margin: 40% auto;
		
		button{
			width: 60%;
		}
	}
</style>
