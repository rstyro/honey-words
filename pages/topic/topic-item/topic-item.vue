<template>
	<view>
		topic-item
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:""
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			const item = JSON.parse(decodeURIComponent(option.item));
			console.log("item:",item);
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
