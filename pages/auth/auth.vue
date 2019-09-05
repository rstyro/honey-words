<template>
	<view class="content">
		<button type="primary" class="" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">授权获取用户信息</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:'',
				userInfo:'',
				header: { 'Cookie': '', "content-type": "application/x-www-form-urlencoded" },
			}
		},
		onLoad() {
			console.log("baseUrl:",getApp().globalData.baseUrl);
			this.init();
		},
		methods: {
			wxGetUserInfo:function(res){
				console.log("res:",res);
				var that = this;
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}else{
					var tagUserInfo = res.detail.userInfo;
					// 微信登陆，获取一个Code，发送到后台获取openId
					uni.login({
					   provider: 'weixin',
					   success: function (loginRes) {
					       console.log("loginRes:",JSON.stringify(loginRes));
						   // 请求自己的服务器
						   uni.request({
						       url: getApp().globalData.baseUrl+'/pua/user/login',
							   method:"POST",
							   header:that.header,
						       data: {
						   		code: loginRes.code,
						   		nick_name: tagUserInfo.nickName,
						   		user_url: tagUserInfo.avatarUrl,
						   		sex: tagUserInfo.gender,
						   		country: tagUserInfo.country,
						   		province: tagUserInfo.province,
						   		city: tagUserInfo.city
						       },success: (res) => {
								   console.log("res:",res);
									if(res.statusCode == 200 && res.data.status == 200){
										//保存token到本地
										that.saveDataToStorage(res.data.data);
									}
									
						       },fail(error) {
								   that.showError();
						       }
						   });
					   }
					});
					
				}
			},
			// 自动登陆
			autoLogin:function(token){
				var that = this;
			   // 请求自己的服务器
			   uni.request({
				   url: getApp().globalData.baseUrl+'/pua/user/autoLogin',
				   method:"POST",
				   header: {
					"content-type": "application/x-www-form-urlencoded", 
					'Authority':token
				   },
				   dataType: "json",
				   data: {
					'token': token,
					'Authority':token
				   },
				   success: (res) => {
					   console.log(res);
						if(res.statusCode == 200 && res.data.status == 200){
							//保存token到本地
							that.saveDataToStorage(res.data.data);
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
				const token = uni.getStorageSync("token");
				if(token){
					this.autoLogin(token);
				}
			},
			saveDataToStorage: function(data){
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
