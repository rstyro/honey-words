<template>
	<view class="container">
		
		<view class="content">
			<view>因个人开发者没有权限嵌入页面</view>
			<view>可识别（保存）如下二维码进行预览</view>
		</view>
		
		<Qrcode :content="url"></Qrcode>
	</view>
</template>

<script>
	import commons from '@/common/commons.js';
	import Qrcode from '@/components/qrcode.vue';
	export default {
		components: {
			Qrcode,
		},
		data() {
			return {
				imgCode:'',
				url:'',
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// console.log("options=",option); //打印出上个页面传递的参数。
			if (option.hasOwnProperty("url")) {
				this.url = option.url;
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	
	.container{
		text-align: center;
		
		.content{
			margin-top: 40rpx;
			
			view{
				height: 30px;
				line-height: 30px;
			}
		}
	}


</style>
