<template>
	<view class="content">
		<honeyItem v-for="(item,index) in honeyList" :key="item.id" 
		:esId="item.esId" :honeyItem="item" :praiseMe="praiseMe" :collectMe="collectMe"></honeyItem>
	</view>
</template>

<script>
	import honeyItem from '@/pages/honey-words/honey-word-item/honey-word-item.vue'
	export default {
		props:{
			honeyList:Array,
			collectMe:Function,
			praiseMe:Function
		},
		data() {
			return {
				
			}
		},
		components:{
			honeyItem
		},
		methods: {
			
		}
	}
</script>

<style>
	*{
		margin: 0rpx;
		padding: 0rpx;
	}
</style>
