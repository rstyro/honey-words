<template>
	<view class="container">
	  <view class="introduce">
	    <text class='title'>作者</text>
	     <view class="userinfo">
	      <image class="userinfo-avatar" :src="userInfo.picUrl" background-size="cover"></image>
	      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
	  </view>
	      <text v-for="(item,index) in aboutMe" :key="index" class="line">{{item.text}}</text>
	  </view>
	
	  <view class="introduce">
	    <text class='title'>关于小程序</text>
	      <text v-for="(item,index) in aboutInfo" :key="index" class="line">{{item.text}}</text>
	  </view>
	</view>
</template>

<script>
	import commons from '@/common/commons.js';
	export default {
		data() {
			return {
				userInfo: {
					  userPath: "https://avatars2.githubusercontent.com/u/16098932?s=460&v=4",
					  nickName: "帅大叔",
				},
				aboutInfo: [
					{ text: "编写这个小程序呢，先是感兴趣，其次就是为了学习！" },
					{ text: "好听的情话，说多了也不会腻，你还对你的爱人吝啬你的赞美吗？" },
				  ],
			  aboutMe: [{ text:"90后，最靓的Boy"}]
			}
		},
		onLoad() {
			const userInfo = uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo;
			}
			this.getList();
		},
		methods: {
			getList(){
				var that = this;
				uni.request({
				    url: commons.baseUrl+commons.aboutUrl,
				    data: {}
				}).then(data=>{
					var [error, res] =data;
					if(error){
						console.log(error);
					}
					if(typeof(res) != "undefined" && res.statusCode == 200 && res.data.status == 200){
						this.aboutMe = res.data.me;
						this.aboutInfo = res.data.program;
							
					}
				});
				
			},
		}
	}
</script>

<style>
/* pages/me/about/about.wxss */
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.introduce {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50rpx;
  margin-bottom: 100rpx;
}
.title{
  font-size: 50rpx;
  font-weight: 700px;
  display: block;
}
.introduce text.line{
  display: inline-block;
  margin: 10rpx;
  padding: 10rpx 5rpx;
  font-weight: 500px;
  text-align: center
}
</style>
