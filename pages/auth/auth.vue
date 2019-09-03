<template>
	<view>
		<button type="primary" class="" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">微信授权获取用户信息</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
					if(res.detail.userInfo){
						let tagUserInfo = res.detail.userInfo;
						
					}
					// 微信登陆，获取一个Code，发送到后台获取openId
					uni.login({
					   provider: 'weixin',
					   success: function (loginRes) {
					       console.log(JSON.stringify(loginRes));
						   // 请求自己的服务器
						   uni.request({
						       url: this.baseUrl+'/user/login',
						       data: {
						   		code: loginCode,
						   		nick_name: tagUserInfo.nickName,
						   		user_url: tagUserInfo.avatarUrl,
						   		sex: tagUserInfo.gender,
						   		country: tagUserInfo.country,
						   		province: tagUserInfo.province,
						   		city: tagUserInfo.city
						       },
						       header: {
						   		'Authority':this.authority
						       },
						       success: (res) => {
						   		if(res.statusCode == 200 && res.data.status == 200){
						   			this.honeyList= res.data.data.records;
						   		}
						           console.log(res);
						       },fail(error) {
						       	console.log(error);
						       }
						   });
					   }
					});
					
				}
				console.log('-------用户授权，并获取用户基本信息和加密数据------');
				
			},
			
		}
	}
</script>

<style>

</style>
