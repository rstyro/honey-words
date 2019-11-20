<template>
	<view class="chicken-content">
		<view class="onecn">{{content}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:"人生是一条激流，每个人都是自己的舵手。凡事都不是命定的，每个人都可以自由地自己的。今日脱下袜和鞋，不知明日来不来！弱者等待时机，强者创造时机。懂得变通，不通亦通。"
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background: #339933;
		color: #fff;
	}
	.chicken-content{
		margin: 0;
		padding: 0;
	}
	.onecn{
		margin: 5% auto;  
		height: 88%;  
		font-size: 1.1em;
		letter-spacing: 30upx;
		writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/ 
		writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/  
	}
</style>
