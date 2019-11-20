<template>
	<view class="chicken-content">
		<view class="onecn">{{content}}</view>
	</view>
</template>

<script>
	import commons from '@/common/commons.js'; 
	export default {
		data() {
			return {
				content:"今天，你是最棒的，加油哟！"
			}
		},
		onLoad() {
			this.getContent();
		},
		//分享
		onShareAppMessage(res) {
		    if (res.from === 'menu') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '为什么你没有昨天....',
		      path: '/pages/tabbar/tabbar-me/menus/chicken-soup/chicken-soup'
		    }
		  },
		methods: {
			getContent(){
				uni.request({
				    url: commons.baseUrl+commons.chickenSoupUrl,
				    data: {}
				}).then(data=>{
					var [error, res] =data;
					console.log("res:",res);
					if(error){
						console.log(error);
					}
					if(typeof(res) != "undefined" && res.statusCode == 200 && res.data.status == 200){
						this.content=res.data.data.content;
					}else{
						commons.requestError();
					}
				});
			}
		}
	}
</script>

<style>
	page{
		background: #FF6666;
		color: #fff;
	}
	.chicken-content{
		margin: 0;
		padding: 0;
	}
	.onecn{
		margin: 0upx auto;  
		padding-top: 40upx;
		height: 88%;  
		font-size: 1.1em;
		line-height: 100upx;
		letter-spacing: 10upx;
		writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/ 
		writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/  
	}
</style>
