<template>
	<view class="content">
		<honeyItem v-for="(item,index) in honeyList" :key="item.id" 
		:sftId="item.id" :honeyItem="item" @praiseMe="praiseMe" @collectMe="collectMe"></honeyItem>
	</view>
</template>

<script>
	import honeyItem from '@/components/honey-words/honey-word-item/honey-word-item.vue'
	export default {
		props:{
			honeyList:Array,
			// collectMe:Function,
			// praiseMe:Function
		},
		data() {
			return {
				
			}
		},
		components:{
			honeyItem
		},
		methods: {
			praiseMe(id){
				// this.praiseMe(this.sftId);
				console.log("list-praiseMe");
				this.$emit('praiseMe',id);
			},
			collectMe(id){
				// this.collectMe(this.sftId);
				this.$emit('collectMe',id);
			}
		}
	}
</script>

<style>
	*{
		margin: 0rpx;
		padding: 0rpx;
	}
</style>
