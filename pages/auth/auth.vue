<template>
	<view>
		<button type="primary" class="" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">微信授权获取用户信息</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:'',
				userInfo:''
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			wxGetUserInfo:function(res){
				console.log("res:",res);
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
						       url: this.baseUrl+'/pua/user/login',
							   method:"POST",
						       data: {
						   		code: loginRes.code,
						   		nick_name: tagUserInfo.nickName,
						   		user_url: tagUserInfo.avatarUrl,
						   		sex: tagUserInfo.gender,
						   		country: tagUserInfo.country,
						   		province: tagUserInfo.province,
						   		city: tagUserInfo.city
						       },
						       header: {
						   		'Authority':''
						       },
						       success: (res) => {
								   console.log(res);
									if(res.statusCode == 200 && res.data.status == 200){
										//保存token到本地
										saveDataToStorage(res.data.data);
									}
									
						       },fail(error) {
								   uni.showToast({
								   	title: "服务器异常，登录失败",
								   	icon: "none"
								   });
						       }
						   });
					   }
					});
					
				}
			},
			//自动登陆
			autoLogin:function(token){
			   // 请求自己的服务器
			   uni.request({
				   url: this.baseUrl+'/pua/user/autoLogin',
				   method:"POST",
				   data: {
					token: token,
				   },
				   header: {
					'Authority':''
				   },
				   success: (res) => {
					   console.log(res);
						if(res.statusCode == 200 && res.data.status == 200){
							//保存token到本地
							saveDataToStorage(res.data.data);
						}
						
				   },fail(error) {
					   uni.showToast({
						title: "服务器异常，登录失败",
						icon: "none"
					   });
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
					uni.setStorageSync("token",token);
				}
				if(data.userInfo){
					uni.setStorageSync("userInfo",data.userInfo);
				}
			}
		}
	}
</script>

<style>

</style>
