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
				header: {"content-type": "application/x-www-form-urlencoded","Authority":''},
			}
		},
		onLoad() {
			console.log("baseUrl:",getApp().globalData.baseUrl);
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
					// 微信登陆，获取一个Code，发送到后台获取openId
					uni.login({
					   provider: 'weixin',
					   success: (loginRes)=> {
					       console.log("login-loginRes:",JSON.stringify(loginRes));
						   // 请求自己的服务器
						   uni.request({
						       url: getApp().globalData.baseUrl+'/pua/users/login',
							   method:"POST",
							   header:that.header,
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
			   // 请求自己的服务器
			   uni.request({
				   url: getApp().globalData.baseUrl+'/pua/users/autoLogin',
				   method:"POST",
				   header: that.header,
				   dataType: "json",
				   data: {'Authority':that.token},
				   success: (res) => {
					   console.log(res,"<<=res");
						if(res.statusCode == 200 && res.data.status == 200){
							//保存token到本地
							that.saveDataToStorage(res.data);
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
					this.token=catchToken;
					this.header.Authority=catchToken;
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
