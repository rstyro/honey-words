<template>
	<view class='container'>
	  <view class='title'>感谢反馈</view>
	
	  <form bindsubmit="submitFeedback" >
	      <textarea  name='content' auto-height="true" auto-focus="true" placeholder="这里可以写你任何你想对我说的话,只要不犯法，你都可以写" :value='content' maxlength='2000' />
	   <button formType="submit">提交</button>
	  </form>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:""
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.container{
  width: 100%;
  height: 100%;
}
.container .title{
  text-align: center;
  font-weight: 600rpx;
  display: block;

  padding: 20rpx 0rpx;
}
textarea{
  width: 95%;
  min-height: 500rpx;
  border: 1px solid #ccc;
  margin: 1rpx auto;
  padding: 10rpx;
}
button{
  margin:20rpx 10rpx;
   background: #09BB07;
  color: #fff;
}

</style>
