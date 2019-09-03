<template>
	<view class="content">
		topic
	</view>
</template>

<script>
	
	
	export default {
		data() {
			return {
				}
		},
		onReachBottom() {
			this.page++;
			this.loading = true;
			this.getList();
		},
		onLoad() {
			this.getList();
		},
		methods: {
			
		},
		components: {
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
