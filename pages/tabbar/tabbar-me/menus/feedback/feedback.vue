<template>
	<view class='container'>
	  <view class='title'>感谢反馈</view>
	  <form @submit="formSubmit" @reset="formReset" >
	   <textarea @blur="bindContent" maxlength=-1 auto-height placeholder="反馈内容 BUG或建议" :value="content" />
	   <button formType="submit">提交</button>
	  </form>
	</view>
</template>

<script>
	import commons from '@/common/commons.js'; 
	export default {
		data() {
			return {
				content:"",
				authority:""
			}
		},
		onLoad() {
			const cacheToken = uni.getStorageSync("token");
			if(cacheToken){
				this.authority=cacheToken;
			}
		},
		methods: {
			formSubmit: function(e) {
				if(this.content == ""){
					this.showMsg("内容不能为空");
					return;
				}
				var that = this;
				var formdata = e.detail.value;
				formdata.type="question";
				formdata.content=that.content;
				// 请求自己的服务器
				uni.request({
				   url: commons.baseUrl+'/sys/feedback/save',
				   method:"POST",
				   header: {
					   "content-type": "application/x-www-form-urlencoded",
					   "Authority":that.authority,
					   },
				    data: formdata,
				   success: (res) => {
					   if(res.statusCode == 200 && res.data.status == 200){
							that.content="";
							that.showMsg("发布成功");
					   }else{
						   that.showMsg(res.data.message)
					   }
				    },fail(error) {
					   console.log(error);
					   that.showError();
				    }
				});
			},
			formReset: function(e) {
				this.content='';
			},
			bindContent: function (e) {
				this.content=e.detail.value;
			},
			showMsg(msg){
				uni.showModal({
					content: msg,
					showCancel: false
				});
			}
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
