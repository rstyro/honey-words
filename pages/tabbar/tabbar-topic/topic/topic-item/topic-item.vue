<template>
	<view class="topic-item-body">
		<image class="topic-pic" :src="item.picPath" mode="aspectFill"></image>
		<view class="topic-box">
			<view class="row-box">
				<view class="flex1 title">{{item.name}}</view>
			</view>
			<view class="row-box header-number">
				<view class="flex1"><image class="auther-pic" :src="item.picUrl"></image>{{item.nickName}}</view>
				<view class="flex1">点赞 {{item.praiseNum}}</view>
				<view class="flex1">收藏 {{item.collectNum}}</view>
				<view class="flex1">
					<text class="time">{{item.createTime | msgDateFormat('yyyy-mm-dd') }}</text>
				</view>
			</view>

			<view class="row-box">
				<text class="mark">{{item.mark}}</text>
			</view>
			<view class="row-box">
				<view class="flex1">
					<view class="pic-box praise-pic animated" :class="praiseAnimateClass" @click="praiseTopic">
						<image v-if="!item.praiseFlag" class="pic praise-pic" src="/static/img/praise.png"></image>
						<image v-else class="pic" src="/static/img/praise-active.png"></image>
					</view>
				</view>
				<view class="flex1">
					<view class="pic-box collect-pic animated" :class="colectAnimateClass" @click="collectTopic">
						<image v-if="!item.collectFlag" class="pic collect-pic" src="/static/img/collect.png"></image>
						<image v-else class="pic" src="/static/img/collect-active.png"></image>
					</view>
				</view>
			</view>
		</view>
		
		<text v-if="isNull"  class="null-data">暂无数据</text>
		<view v-else class="honey-list-box" >
			<honeyList  :honeyList="list" @praiseMe="praiseHoney" @collectMe="collectHoney" ></honeyList>
		</view>
	</view>
</template>

<script>
	import commons from '@/common/commons.js'; 
	import VueStar from '@/components/star-animated/star-animated.vue';
	import encryptUtil from '@/components/encrypt-util/encrypt-util.vue';
	import honeyList from '@/components/honey-words/honey-word-list/honey-word-list.vue';
	export default {
		data() {
			return {
				id:"",
				authority:'',
				item:{
					praiseNum:0,
					collectNum:0
				},
				list:[],
				isNull:true,
				pageNo:1,
				pageSize:10,
				pages:0,
				praiseToggleAnimate: false,
				colectToggleAnimate: false
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			if(option.hasOwnProperty("topicId")){
				this.id=option.topicId;
				const cacheToken = uni.getStorageSync("token");
				if(cacheToken){
					this.authority=cacheToken;
				}else{
					commons.showTokenError("主题详情需要登录才可浏览哟");
					return;
				}
				this.getDetail();
				this.getList();
			}
		},
		onReachBottom(){
			if(this.pages == this.pageNo){
				console.log("到底了");
				commons.showNoMore();
				return;
			}
			this.pageNo++;
			this.getList();
		},
		components: {
			honeyList,
			VueStar
		},
		computed: {
			colectAnimateClass () {
				return this.colectToggleAnimate ? 'rotateIn': ''
			},
			praiseAnimateClass () {
				return this.praiseToggleAnimate ? 'zoomIn': ''
			}
		},
		methods: {
			getDetail(){
				var that = this;
				uni.request({
				    url: commons.baseUrl+commons.puaTopicDetailUrl,
				    data: {id:that.id},
				    header: {
						'Authority':that.authority
				    }
				}).then(data=>{
					var [error, res] = data;
					console.log("res:",res);
					if(error){
						console.log(error);
					}
					if(typeof(res) != "undefined" && res.statusCode == 200 &&res.data.status == 200){
						that.item = res.data.data;
						that.item.picPath =commons.preUrl+that.item.picPath;
						
					}else if(res.data.status == "70000"){
						uni.removeStorageSync("token");
						commons.showTokenError("需要登录才可查看主题详情");
					}
				});
			},
			getList(){
				uni.showNavigationBarLoading();
				var that = this;
				uni.request({
				    url: commons.baseUrl+commons.sftListByTopicUrl,
				    data: {
						pageNo:that.pageNo,
						pageSize:that.pageSize,
						topicId:that.id
				    },
				    header: {
						'Authority':that.authority
				    }
				}).then(data=>{
					var [error, res] = data;
					console.log("res-topic-item:",res);
					if(error){
						console.log(error);
					}
					if(res.data.status == 200){
						const aeskey = encryptUtil.rsaDecrypt(res.data.key);
						var resultData = JSON.parse(encryptUtil.aesDecrypt(res.data.data,aeskey));
						console.log("list-topic-item:",resultData);
						if(this.pageNo == 1){
							uni.pageScrollTo({
							    scrollTop: 0,
							    duration: 30
							});
						}
						
						this.pages=resultData.pages;
						if(resultData.pages>0){
							this.isNull=false;
							this.list = this.list.concat(resultData.records);
						}else{
							this.isNull=true;
						}
						
					}else if(res.data.status == "70000"){
						uni.removeStorageSync("token");
						commons.showTokenError();
					}else{
						commons.requestError();
					}
					
				});
				uni.hideNavigationBarLoading();
				console.log("准备停止刷新");
				uni.stopPullDownRefresh();
				console.log("结束停止刷新");
			},
			praiseHoney(id){
				commons.praise(commons.baseUrl+commons.praiseUrl,this.authority,id,commons.sftType,this.list);
			},
			collectHoney(id){
				commons.collect(commons.baseUrl+commons.collectUrl,this.authority,id,commons.sftType,this.list);
			},
			praiseTopic(){
				this.praiseToggleAnimate = !this.item.praiseFlag;
				commons.praise(commons.baseUrl+commons.praiseUrl,this.authority,this.id,commons.topicType,this.item);
			},
			collectTopic(){
				this.colectToggleAnimate = !this.item.collectFlag;
				commons.collect(commons.baseUrl+commons.collectUrl,this.authority,this.id,commons.topicType,this.item);
			},
			
		},
		filters:{ // 通过局部过滤器来实现
			msgDateFormat:function(msg,pattern=''){
				if(typeof(msg) != "undefined" &&  msg != ""){
					// 将字符串转换为Date类型
					var mt = new Date(msg.replace(/-/g, '/'))
					// 获取年份
					var y = mt.getFullYear()
					// 获取月份 从0开始 
					var m = (mt.getMonth()+1).toString().padStart(2,"0")
					// 获取天数
					var d = mt.getDate();
					if(pattern === 'yyyy-mm-dd'){
						return y+"-"+m+"-"+d
					}
					// 获取小时
					var h = mt.getHours().toString().padStart(2,"0")
					// 获取分钟
					var mi = mt.getMinutes().toString().padStart(2,"0")
					// 获取秒
					var s = mt.getSeconds().toString().padStart(2,"0")
					// 拼接为我们需要的各式
					return y+"-"+m+"-"+d+" "+h+":"+mi+":"+s;
				}else{
					return "";
				}
				
			}
		}
	}
</script>

<style>
.topic-item-body{
	width: 100%;
	height: 100%;
	margin: 0px;
	padding: 0px;
}
.topic-pic{
	margin: 0px;
	padding: 0px;
	width: 100%;
}
.topic-box{
	padding: 10upx;
	border-radius: 5upx;
}

.topic-box .title{
	text-align: center;
	font-weight: bold;
	font-size: 40upx;
}
.topic-box .auther-pic{
	width: 50upx;
	height: 50upx;
	vertical-align: middle;
	border-radius: 50%;
	margin-right: 20upx;
}
.topic-box .header-number{
	padding: 10upx 0upx;
	vertical-align: middle;
	font-size: 25upx;
	color: #888;
	line-height: 50upx;
}
.topic-box .time{
	float: right;
}

.topic-box .pic-box{
	width: 60upx;
	height: 60upx;
	border-radius: 50%;
	border: 1upx solid #eee;
	padding: 15upx;
	margin: 20upx;
}
.topic-box .pic{
	width: 100%;
	height: 100%;
}
.topic-box .praise-pic{
	float: right;
}
.topic-box .collect-pic{
	float: left;
}

.honey-list-box{
	width: 100%;
	padding-top: 2rpx;
	padding-bottom: 5rpx;
	background: #efeff1;
	border-radius: 30upx 30upx 0 0;
}
.null-data{
  position: absolute;
  bottom: 15%;
  width: 100%;
  text-align: center;
}
</style>
