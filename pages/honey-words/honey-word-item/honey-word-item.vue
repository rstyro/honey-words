<template>
	<view class="honey-item">
		<view class='row-box honey-item-top'>
			<view class="flex1 honey-item-time" >{{honeyItem.date}}</view>
			<view class="flex1 honey-item-name" >{{honeyItem.createUsername}}</view>
		</view>
		<text class='row-box honey-item-content'  selectable='true'>{{honeyItem.content}}</text>
		<view class="row-box honey-item-bottom">
			<view class="col-box honey-item-praise" @click="praiseHoneyWords">
				<image v-if="!honeyItem.praise_flag" class="honey-item-icon" src="/static/img/honey/praise.png"></image>
				<image v-else class="honey-item-icon" src="/static/img/honey/praise-active.png"></image>
				<view>{{honeyItem.praiseNum}}</view>
			</view>
			<view class="col-box honey-item-collect" @click="collectHoneyWords">
				<image v-if="!honeyItem.collect_flag" class="honey-item-icon" src="/static/img/honey/heart.png"></image>
				<image v-else class="honey-item-icon" src="/static/img/honey/heart-active.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			honeyItem:Object,
			praiseMe: Function,
			collectMe: Function,
			esId: String
		},
		data() {
			return {
				
			}
		},
		methods: {
			praiseHoneyWords(){
				this.praiseMe(this.esId);
			},
			collectHoneyWords(){
				this.collectMe(this.esId);
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
	.honey-item-praise{
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
	
</style>
