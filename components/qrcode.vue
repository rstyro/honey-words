<template>
	<view>
		<image class="imgCode" :src="getImgSrc"></image>
		<view class="btn">
			<button class="btn-success" @click="downloadImgCode">
				<uni-icons type="download" size="18" color="#fff"></uni-icons>立即下载
			</button>
		</view>
	</view>
</template>

<script>
	import commons from '@/common/commons.js';

	export default {
		name: "qrcode",
		props: {
			content: String,
		},
		data() {
			return {
				logoUrl: 'https://rstyro.top/favicon.ico',
				qrcodeUrl: '/qrcode/logo?content=',
				showLogo: true,
				imgSrc: '',
				url:'',
			};
		},
		methods:{
			downloadImgCode(){
				let tempFilePath = wx.env.USER_DATA_PATH + '/imgcode.png';
				uni.downloadFile({
				    url: this.url, 
				    success: (res) => {
				        if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({  // 然后调用这个方法
							filePath: tempFilePath,
							success : (res) => {
								uni.showToast({title : '图片已保存到您的相册'})
							}
						})
				        }
				    },
					fail: (err) => {
						console.log("下载失败...",err);
					},
					filePath: tempFilePath
				});
			}
		},
		computed: {
			getImgSrc() {
				this.url = commons.deerPreUrl + this.qrcodeUrl + encodeURIComponent(this.content);
				if (this.showLogo) {
					this.url += "&logoUrl=" + encodeURIComponent(this.logoUrl);
				}
				return this.url;
			},
			
		}
	}
</script>

<style lang="scss">
	

.imgCode{
	width: 300px;
	height: 300px;
}

.btn{
	width: 250px;
	margin: 0rpx auto;
}

</style>
