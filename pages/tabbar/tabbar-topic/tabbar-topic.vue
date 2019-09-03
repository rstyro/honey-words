<template>
	<view class="content">
		<view class="app">
		        <WaterfallFlow :list="list" :loading="loading" @click="choose" ></WaterfallFlow>
		    </view>
	</view>
</template>

<script>
	// 瀑布流组件
	import WaterfallFlow from '@/components/nairenk-waterfall-flow/nairenk-waterfall-flow.vue';
	// 模拟 JSON 数据
	const data = require('@/common/data.json');
	export default {
		data() {
			return {
				page: 1,
				start: 0,
				end: 0,
				list: [], // 列表
				loading: true
			}
		},
		onLoad() {
			this.getList();
		}, 
		onReachBottom() {
			this.page++;
			this.loading = true;
			this.getList();
		},
		methods: {
			// 选中
			choose(item) {
				// item 返回选中 JSON 对象
				console.log(item)
			},
			// 模拟加载数据
			getList() {
				if (this.list.length < data.list.length) {
					setTimeout(() => {
						this.end = this.page * 10;
						this.list = this.list.concat(data.list.slice(this.start, this.end));
						this.start = this.end;
						// 延迟 120 毫秒隐藏加载动画，为了跟组件里面的 100 毫秒定位有个平缓过度
						setTimeout(() => {
							this.loading = false;
						}, 120);
					}, 1000)
				} else {
					this.loading = false;
				}
			}
		},
		components: {
			WaterfallFlow
		}
	}
</script>

<style>
	.new-list{
		display: flex;
		  flex: 1;
		  position: relative;
		  flex-direction: row;
		  justify-content: space-between;
		  padding-left: 12rpx;
		  padding-right: 12rpx;
		  padding-top: 8rpx;
	}
	.list-left{
		  display: flex;
		   position: relative;
		   flex-direction: column;
		   width: 359rpx;;
	}
	.list-right{
		display: flex;
		  position: relative;
		  flex-direction: column;
		  width: 359rpx;
	}
	.card{
		border: 3rpx #007AFF  solid;
		margin: 10rpx;
		width: 100%;
	}

</style>
