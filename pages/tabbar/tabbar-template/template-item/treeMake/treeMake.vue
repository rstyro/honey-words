<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="line">
				<text>页面标题:</text>
				<input name="title" v-model="dto.title" placeholder="请输入网页标题" value='小鹿乱撞'></input>
			</view>

			<view class="line">
				<text>显示时间:</text>
				<radio-group @change="radioChange" name="showTime">
					<label class="radio">
						<radio value="true" :checked="dto.showTime"/>是
					</label>
					<label class="radio">
						<radio value="false" :checked="!dto.showTime" />否
					</label>
				</radio-group>

			</view>

			<view v-if="dto.showTime">
				<view class="line">
					<text>生效时间:</text>
					<uni-datetime-picker class="datetime-input" type="datetime" v-model="dto.time" @change="changeLog" />
				</view>

				<view class="line">
					<text>你的名称:</text>
					<input name="boyName" v-model="dto.boyName" placeholder="请输入您的名字" value=''></input>
				</view>

				<view class="line">
					<text>她/他名称:</text>
					<input name="girlName" v-model="dto.girlName" placeholder="请输入她/他的名称" value=''></input>
				</view>
			</view>

			<view class="list-line">
				<text>文字列表:</text>
				<view>
					<view class="row-box between-box" v-for="(item,index) in dto.textList" :key=index>
						<input class="list-input" placeholder="请输入文案" v-model="dto.textList[index]"></input>

						<button v-if="index == 0" @click="addItem" class="list-btn btn-success">添加</button>
						<button v-else @click="delItem(index)" class="list-btn btn-danger">删除</button>
					</view>

				</view>
			</view>
			
			<view class="line">
				<text>留言昵称:</text>
				<input name="name" v-model="dto.name" placeholder="请输入文案署名人的昵称" value=''></input>
			</view>


			<view class="row-box">
				<button form-type="reset" class="btn-info form-btn">重置</button>
				<button form-type="submit" class="btn-success form-btn">立即制作</button>
			</view>
		</form>

		<view class="form-item">

		</view>

	</view>
</template>

<script>
	import { customizeTree } from '@/common/deerapi.js';
	import encryptUtil from '@/components/encrypt-util/encrypt-util.vue';
	export default {
		data() {
			return {
				id: 0,
				params: '',
				dto: {
					title: '2021-12-01 12:00:00',
					showTime: false,
					textList: [
						'',
						'',
					],
				},
				
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			if (option.hasOwnProperty("id")) {
				this.id = option.id;
				this.params = option?.d;
			}

			if (this.params) {
				let decodeData = encryptUtil.decryptAes(this.params);
				console.log("decodeData:",decodeData);
				const jsonContent = JSON.parse(decodeData);
				this.dto.showTime = jsonContent.showTime;
				this.dto.title = jsonContent.title;
				this.dto.textList = jsonContent.textList;
				this.dto.time = jsonContent.time;
				this.dto.name = jsonContent.name;
				this.dto.boyName = jsonContent.boyName;
				this.dto.girlName = jsonContent.girlName;
			}
			
		},
		methods: {
			changeLog(e) {
				this.dto.time = e;
				console.log("-change事件:", e);
			},
			radioChange: function(evt) {
				if (evt.detail.value == "true") {
					this.dto.showTime = true;
				} else {
					this.dto.showTime = false;
				}
			},
			addItem() {
				if (this.dto.textList.length >= 10) {
					uni.showToast({
						icon: "none",
						title: '最多可添加10行',
						duration: 1000
					});
					return false;
				}
				this.dto.textList.push('');
			},

			delItem(index) {
				console.log("index:", index);
				this.dto.textList.splice(index, 1);
			},
			formSubmit: function(e) {
				var formdata = e.detail.value;
				console.log("formData:", formdata);
				console.log("formData:", this.dto);
				customizeTree(this.dto).then(res=>{
					console.log("res=",res);
				});
			},
			formReset: function(e) {
				console.log('清空数据')
			},
		},
	}
</script>

<style lang="scss" scoped>
	.form-item {
		input {
			height: 50rpx;
			line-height: 50rpx;
			padding-left: 10rpx;
		}
	}


	.line {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;

		text {
			margin: 10rpx;
			color: #222;
			padding: 10rpx 20rpx;
		}

		input {
			border: 1px solid #eee;
			height: 70rpx;
			line-height: 70rpx;
			min-width: 500rpx;
			padding-left: 10rpx;
		}

		.radio {
			margin-right: 40rpx;
		}

		.datetime-input {
			min-width: 517rpx;
		}
	}

	.list-line {
		display: flex;
		justify-content: space-around;

		.list-input {
			border: 1px solid #eee;
			height: 70rpx;
			line-height: 70rpx;
			padding-left: 10rpx;
			margin-right: 10rpx;
			min-width: 380rpx;
		}

		.list-btn {
			height: 70rpx;
			line-height: 70rpx;
		}

	}

	.between-box {
		justify-content: space-between;
	}

	.form-btn {
		min-width: 200rpx;
		margin-top: 60rpx;
		margin-bottom: 20rpx;
	}
</style>
