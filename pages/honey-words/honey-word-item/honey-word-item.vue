<template>
	<view class="honey-item">
		<view class='row-box honey-item-top'>
			<view class="flex1 honey-item-time" >{{honeyItem.date}}</view>
			<view class="flex1 honey-item-name" >{{honeyItem.createUsername}}</view>
		</view>
		<text class='row-box honey-item-content'  selectable='true'>{{honeyItem.content}}</text>
		<view class="row-box honey-item-bottom">
			<view class="col-box honey-item-praise" @click="praiseHoneyWords">
				<image v-if="!honeyItem.praiseFlag" class="honey-item-icon" src="/static/img/praise.png"></image>
				<image v-else class="honey-item-icon" src="/static/img/praise-active.png"></image>
				<view>{{honeyItem.praiseNum}}</view>
			</view>
			<view class="col-box honey-item-collect" @click="collectHoneyWords">
				<image v-if="!honeyItem.collectFlag" class="honey-item-icon" src="/static/img/collect.png"></image>
				<image v-else class="honey-item-icon" src="/static/img/collect-active.png"></image>
			</view>
		</view>
		<!-- <view class="row-box">
			<view class="col-box">
				<view class="animate-box">
					<view >
						<vue-star v-if="!honeyItem.praiseFlag" class="honey-item-animate1" animate="animated bounceIn" color="rgb(152, 138, 222)">
							<img @click="praiseHoneyWords" slot="icon" class="honey-item-icon" src="/static/img/praise.png" />
						</vue-star>
						<vue-star v-else class="honey-item-animate1" animate="animated bounceIn" color="rgb(152, 138, 222)">
							<img @click="praiseHoneyWords" slot="icon" class="honey-item-icon" src="/static/img/praise-active.png" />
						</vue-star>
					</view>
					<view >
						<vue-star v-if="!honeyItem.collectFlag" class="honey-item-animate2" animate="animated bounceIn" color="rgb(152, 138, 222)">
							<img @click="collectHoneyWords" slot="icon" class="honey-item-icon" src="/static/img/collect.png" />
						</vue-star>
						<vue-star v-else class="honey-item-animate2" animate="animated bounceIn" color="rgb(152, 138, 222)">
							<img @click="collectHoneyWords" slot="icon" class="honey-item-icon" src="/static/img/collect-active.png" />
						</vue-star>
					</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import VueStar from '@/components/VueStar/VueStar.vue';
	
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
	.animate-box{
		/* background: #007AFF; */
	}
	.honey-item-animate1{
		position: absolute;
		left: -7%;
		top: 41%;
	}
	.honey-item-animate2{
		position: absolute;
		left: 13%;
		top: 41%;
	}
	
</style>
