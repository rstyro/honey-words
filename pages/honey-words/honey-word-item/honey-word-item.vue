<template>
	<view class="honey-item">
		<view class='row-box honey-item-top'>
			<view class="flex1 honey-item-time" >{{honeyItem.date}}</view>
			<view class="flex1 honey-item-name" >{{honeyItem.createUsername}}</view>
		</view>
		<text class='row-box honey-item-content'  selectable='true'>{{honeyItem.content}}</text>
<!-- 		<view class="row-box honey-item-bottom">
			<view class="col-box honey-item-praise" @click="praiseHoneyWords">
				<image v-if="!honeyItem.praiseFlag" class="honey-item-icon" src="/static/img/praise.png"></image>
				<image v-else class="honey-item-icon" src="/static/img/praise-active.png"></image>
				<view>{{honeyItem.praiseNum}}</view>
			</view>
			<view class="col-box honey-item-collect" @click="collectHoneyWords">
				<image v-if="!honeyItem.collectFlag" class="honey-item-icon" src="/static/img/collect.png"></image>
				<image v-else class="honey-item-icon" src="/static/img/collect-active.png"></image>
			</view>
		</view> -->
		
		<view class="bottom-box">
			<view class="praise-background">
				<view class="praise-num">{{honeyItem.praiseNum}}</view>
			</view>
			<vue-star class="icon-praise" :active="honeyItem.praiseFlag" animate="animated bounceIn" >
				<image slot="icon" @click="praiseHoneyWords" v-if="!honeyItem.praiseFlag" class="honey-item-icon" src="/static/img/praise.png"></image>
				<image slot="icon" @click="praiseHoneyWords" v-else class="honey-item-icon" src="/static/img/praise-active.png"></image>
			</vue-star>
			
			<view class="collect-background">
			</view>
			<vue-star  class="icon-collect" :active="honeyItem.collectFlag" animate="animated bounce" >
				<image slot="icon" @click="collectHoneyWords" v-if="!honeyItem.collectFlag" class="honey-item-icon" src="/static/img/collect.png"></image>
				<image slot="icon" @click="collectHoneyWords" v-else class="honey-item-icon" src="/static/img/collect-active.png"></image>
			</vue-star>
	
		</view>
	</view>
</template>

<script>
	import VueStar from '@/components/star-animated/star-animated.vue';
	
	export default {
		props:{
			honeyItem:Object,
			// praiseMe: Function,
			// collectMe: Function,
			sftId: Number
		},
		components: {
			VueStar
		},
		data() {
			return {};
		},
		methods: {
			praiseHoneyWords(){
				// this.praiseMe(this.sftId);
				this.$emit('praiseMe',this.sftId);
			},
			collectHoneyWords(){
				// this.collectMe(this.sftId);
				this.$emit('collectMe',this.sftId);
			}
		}
	}
</script>

<style>
	.honey-item{
		margin: 10rpx;
		padding: 0rpx 10px 10rpx 10px;
		background: #fff;
		border-radius: 5rpx;
		position: relative;
		overflow: hidden;
		min-height: 70px;
	}
	.honey-item-top{
		font-size: 24rpx;
		line-height: 24rpx;
		padding: 10rpx 0rpx 10rpx 0rpx;
	}
	.honey-item-time{
		color: #ccc;
		text-align: left;
	}
	.honey-item-name{
		color: #ccc;
		text-align: right;
	}
	.honey-item-content{
		color: #222;
		font-size: 36rpx;
		display: block;
		font-weight: 500;
	}
	.honey-item-bottom{
		margin-top: 30rpx;
	}
	.honey-item-icon{
		width: 32rpx;
		height: 32rpx;
		vertical-align: middle;
	}
	.honey-item-praise {
		display: inline-block;
		font-size: 0;
		background-color: #37C6C0;
		padding: 8rpx 30rpx;
		border-radius: 4rpx;
		margin-right: 15rpx;
	}
	.honey-item-praise view{
		color: #fff;
		line-height: 32rpx;
		font-size: 24rpx;
		vertical-align: middle;
		display: inline-block;
		margin-left: 10rpx;
	}
	.honey-item-collect{
		  display: inline-block;
		  font-size: 0;
		  background-color: #37C6C0;
		  padding: 8rpx 25rpx;
		  border-radius: 4rpx;
		  margin-left: 30rpx;
	}
	
	/** 新版**/
	
	.bottom-box{
		height: 50px;
		width: 100%;
		
	}
	.praise-background{
		width: 60px;
		height: 25px;
		background: #9DD3FA;
		position: absolute;
		left: 10px;
		bottom: 10px;
	}
	.praise-num{
		text-align: right;
		margin-right: 20rpx;
		color: #fff;
	}
	.icon-praise{
		position: absolute;
		bottom: -25px;
		left: -20px;
		
	}
	
	.collect-background{
		width: 35px;
		height: 25px;
		background: #9DD3FA;
		position: absolute;
		right: 13px;
		bottom: 10px;
	}
	.icon-collect{
		position: absolute;
		bottom: -25px;
		right: -20px;
	}
	
</style>
