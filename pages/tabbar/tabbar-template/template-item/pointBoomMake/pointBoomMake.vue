<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="line">
				<text>页面标题:</text>
				<input name="title" v-model="dto.title" placeholder="请输入网页标题" value='小鹿乱撞'></input>
			</view>

			<view class="line">
				<text>循环播放:</text>
				<radio-group @change="radioChange" name="isLoop">
					<label class="radio">
						<radio value="true" :checked="dto.isLoop"/>是
					</label>
					<label class="radio">
						<radio value="false" :checked="!dto.isLoop" />否
					</label>
				</radio-group>

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
	import { customizePointBoom } from '@/common/deerapi.js';
	import encryptUtil from '@/components/encrypt-util/encrypt-util.vue';
	export default {
		data() {
			return {
				params: '',
				dto: {
					title: '2021-12-01 12:00:00',
					isMix: false,
					mixList: [],
					isLoop: false,
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
				this.dto.templateId = option.id;
				this.params = option?.d;
			}

			if (this.params) {
				let decodeData = encryptUtil.decryptAes(this.params);
				const jsonContent = JSON.parse(decodeData);
				this.dto.isLoop=jsonContent?.isLoop;
				this.dto.isMix=jsonContent.isMix;
				this.dto.title=jsonContent.title;
				this.dto.textList=jsonContent.textList;
				this.dto.mixList=jsonContent.mixList;
			}
			
		},
		methods: {
			radioChange: function(evt) {
				if (evt.detail.value == "true") {
					this.dto.isLoop = true;
				} else {
					this.dto.isLoop = false;
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
				console.log("formData:", this.dto);
				customizePointBoom(this.dto).then(res=>{
					console.log("formSubmit-res=",res);
					if (res.data?.status == "200") {
						let url = res.data.data.viewCodeUrl;
						
						uni.navigateTo({
							url: '/pages/tabbar/tabbar-template/template-view/template-view?url=' + encodeURIComponent(url),
							animationType: 'slide-in-bottom',
							animationDuration: 1000
						});
					}
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
