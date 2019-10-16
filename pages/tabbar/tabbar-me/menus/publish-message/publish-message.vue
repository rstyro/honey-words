<template>
	<view class='container'>
		<view class='title'>发布系统消息</view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="line">
				<text>推送目标:</text>
				<input name="pushId" placeholder="指定用户id" value='-1'></input>
			</view>

			<view class="line">
				<text>系统标题:</text>
				<input name="title" placeholder="请输入标题" value=''></input>
			</view>

			<view class="line">
				<text>生效时间:</text>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view>{{date}}</view>
				</picker>
			</view>
			<textarea @blur="bindContent" maxlength=-1 auto-height placeholder="发布内容" />
			<view class="uni-btn-v">
				<button form-type="submit">发布</button>
				<button type="default" form-type="reset">重置</button>
			</view>
		</form>
	</view>
</template>
<script>
	import commons from '@/common/commons.js'; 
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				content:'',
				date: currentDate,
				authority:''
			}
		},
		onLoad() {
			const cacheToken = uni.getStorageSync("token");
			console.log("cacheToken:",cacheToken);
			if(cacheToken){
				this.authority=cacheToken;
			}
		},
		 computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
		methods: {
			formSubmit: function(e) {
				var that = this;
				var formdata = e.detail.value;
				formdata.content=this.content;
				formdata.validDate=this.date;
				console.log("formdata:",formdata);
				// 请求自己的服务器
				uni.request({
				   url: commons.baseUrl+'/sys/sysmsg/pulishMsg',
				   method:"POST",
				   header: {
					   "content-type": "application/x-www-form-urlencoded",
					   "Authority":that.authority,
					   },
				    data: formdata,
				   success: (res) => {
					   console.log("login-res:",res);
					   if(res.statusCode == 200 && res.data.status == 200){
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
				console.log('清空数据')
			},
			bindContent: function (e) {
				this.content=e.detail.value;
				console.log("content:",this.content);
				console.log(e.detail.value)
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
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
	.container {
		width: 100%;
		height: 100%;
	}

	.container .title {
		text-align: center;
		font-weight: 600rpx;
		margin: 20px auto;
		display: block;
	}

	textarea {
		width: 95%;
		min-height: 500rpx;
		border: 1px solid #ccc;
		margin: 10rpx auto;
		padding: 10rpx;
	}

	.line {
		display: flex;
		align-items: center;
	}

	.line text {
		margin: 10rpx;
		background: #ccc;
		color: #fff;
		padding: 10rpx 20rpx;
	}

	.line input {
		border-bottom: 1px solid #ccc;
		margin: 10rpx;
		padding-left: 5rpx;
		padding-top: 10rpx;
	}

	button {
		margin: 20rpx 10rpx;
	}
</style>
