<template>
	<view class="content">
		<view class="box">
			<QSTabs :current="current" duration="1" animationMode="line2" :tabs="tabs" width="375" @change="change($event, '1')"/>
		</view>
		<view v-if="current == 0">
			<view>
				<text v-if="isNull"  class="null-data">暂无数据</text>
				<view v-else class="honey-list-box" >
					<honeyList  :honeyList="list" @praiseMe="praiseHoney" @collectMe="collectHoney" ></honeyList>
				</view>
			</view>
		</view>
		<view v-else>
			<text v-if="topicIsNull"  class="null-data">暂无数据</text>
			<view v-else class="topic-box">
				<view v-for="(item,index) in topicList" :key="index" class="topic-item row-box" @click="toTopicDetail(item.id)">
					<view class="flex1">
						<image :src="item.picPath" mode="aspectFill" class="topic-cover"></image>
					</view>
					<view class="flex1">
						<view class="col-box">
							<view class="flex1 topic-text">{{item.name}}</view>
							<view class="flex1 topic-text">{{item.count}}</view>
						</view>
					</view>
					<view class="flex1">
						<image src="/static/img/me/right.png" mode="aspectFit" class="topic-right"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commons from '@/common/commons.js';
	import honeyList from '@/components/honey-words/honey-word-list/honey-word-list.vue';
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	export default {
		components: {
			QSTabs,
			honeyList
		},
		data() {
			return {
				authority:'',
				current: 0,
				currentType:'speechcraft',
				tabs: [
					{ name: '单句', backgroundColor: '#000', activeColor: '#fff'}, 
					{ name: '主题', backgroundColor: '#000', activeColor: '#fff'}, 
				],
				list:[],
				topicList:[],
				isNull:true,
				topicIsNull:true,
				pageNo:1,
				pageSize:10,
				pages:0,
				topicPageNo:1,
				topicPageSize:10,
				topicPages:0
			}
		},
		onLoad() {
			this.setToken();
			this.getList("topic,speechcraft",this.pageNo,this.pageSize);
		},
		// 页面上拉触底事件的处理函数
		onReachBottom(){
			if(this.currentType == commons.sftType){
				if(this.pages == this.pageNo){
					console.log("到底了");
					commons.showNoMore();
					return;
				}
				this.pageNo++;
				this.getList("speechcraft",this.pageNo,this.pageSize);
			}else{
				if(this.topicPages == this.topicPageNo){
					console.log("到底了");
					commons.showNoMore();
					return;
				}
				this.topicPageNo++;
				this.getList("topic",this.topicPageNo,this.topicPageSize);
			}
			
		},
		methods: {
			change(index, i) {
				this['current'] = index;
				if(index == 0){
					this.currentType=commons.sftType;
				}else{
					this.currentType=commons.topicType;
				}
			},
			setToken(){
				const cacheToken = uni.getStorageSync("token");
				console.log("cacheToken:",cacheToken);
				if(cacheToken){
					this.authority=cacheToken;
				}
			},
			getList(type,pageNo,pageSize){
				uni.showNavigationBarLoading();
				var that = this;
				uni.request({
				    url: commons.baseUrl+commons.collectListUrl,
				    data: {
						pageNo:pageNo,
						pageSize:pageSize,
						type:type
				    },
				    header: {
						'Authority':that.authority
				    }
				}).then(data=>{
					var [error, res] = data;
					console.log("res:",res);
					if(error){
						console.log(error);
					}
					if(res.data.status == 200){
						//单句
						if(res.data.speechcraft){
							this.pages=res.data.speechcraft.pages;
							if(res.data.speechcraft.pages>0){
								this.isNull=false;
								this.list = this.list.concat(res.data.speechcraft.records);
							}else{
								this.isNull=true;
							}
						}
						
						//主题
						if(res.data.topic){
							this.topicPages=res.data.topic.pages;
							if(res.data.topic.pages>0){
								this.topicIsNull=false;
								var resultList = res.data.topic.records;
								for(var item of resultList){
									item.picPath =commons.preUrl+item.picPath;
								}
								console.log("resultList:",resultList);
								this.topicList = this.topicList.concat(resultList);
							}else {
								this.topicIsNull=true;
							}
						}
						
					}else if(res.data.status == "70000"){
						uni.removeStorageSync("token");
						commons.showTokenError();
					}else{
						commons.requestError();
					}
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
				});
				
			},
			praiseHoney(id){
				commons.praise(commons.baseUrl+commons.praiseUrl,this.authority,id,commons.sftType,this.list);
			},
			collectHoney(id){
				commons.collect(commons.baseUrl+commons.collectUrl,this.authority,id,commons.sftType,this.list);
			},
			toTopicDetail(id){
				uni.navigateTo({
				    url: '/pages/tabbar/tabbar-topic/topic/topic-item/topic-item?topicId='+id,
				    animationType: 'zoom-out',
				    animationDuration: 1000
				});
			}
		}
	}
</script>
<style lang="scss">
	.content{
		background: #efeff1;
	}
	.null-data{
	  position: absolute;
	  top: 15%;
	  width: 100%;
	  text-align: center;
	}
	.topic-item{
		height: 200upx;
		width: 100%;
		position: relative;
		background: #fff;
		border-bottom: #eee 1px solid;
		padding: 10upx;
	}
	.topic-cover{
		width: 100%;
		height: 100%;
	}
	.topic-right{
		width: 30upx;
		height: 30upx;
		position: absolute;
		right: 5%;
		top: 50%;
	}
	.topic-text{
		text-align: left;
		padding: 20upx;
	}
</style>
