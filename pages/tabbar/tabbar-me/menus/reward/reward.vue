<template>
	<view class="content">
		<text>最喜欢看你一言不合就打赏的样子</text>
		<image :src="rewardUrl" @click="showImg()" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rewardUrl:"https://www.lrshuai.top/upload/mini/reward.jpg"
			}
		},
		methods: {
			showImg(){
				 uni.previewImage({
					urls: [this.rewardUrl],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
			
		}
	}
</script>

<style>
	.content{
		margin: 100upx auto;
		text-align: center;
	}
	.content image{
		width: 66%;
	}
</style>
