<template>
	<view>
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
			<view class="topic-box">
				<view v-for="(item,index) in topicList" class="topic-item row-box">
					<view class="flex1">
						<image :src="item.picPath" mode="aspectFit" class="item-cover"></image>
					</view>
					<view class="flex1">
						<view class="col-box">
							<text class="flex1">{{item.name}}</text>
							<text class="flex1">{{item.count}}</text>
						</view>
					</view>
					<view class="flex1">
						<image src="/static/img/me/right.png" mode="aspectFit" class="image-right"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commons from '@/common/commons.js';
	import honeyList from '@/pages/honey-words/honey-word-list/honey-word-list.vue';
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	export default {
		components: {
			QSTabs,
			honeyList
		},
		data() {
			return {
				authority:'',
				current:0,
				tabs: [
					{ name: '单句', backgroundColor: '#000', activeColor: '#fff'}, 
					{ name: '主题', backgroundColor: '#000', activeColor: '#fff'}, 
				],
				list:[],
				topicList:[{
					"id": 17,
					"pic_id": null,
					"code": "yidi",
					"name": "异地恋",
					"mark": "只有经历过异地恋的人才知道，原来思念也可以深入骨髓。当见面的那一刻，如洪水决堤，囤积已久的思念终于得到了释放。",
					"praiseNum": 68439,
					"collectNum": 3423,
					"count": 10,
					"isDel": 0,
					"createBy": 1,
					"createTime": "2019-09-21 23:48:52",
					"picPath": "https://www.lrshuai.top/miniadmin/show/20190921/F13C549F43A449D787ACA1A10672EFA7.jpg",
					"userPath": "http://www.lrshuai.top/upload/user/20170612/05976238.png",
					"praiseFlag": false,
					"collectFlag": false,
					"nickName": "帅大叔",
					"picUrl": "https://www.lrshuai.top/upload/user/20170612/05976238.png",
					"top": 920.1553955078125,
					"left": 1
				}],
				isNull:true,
				pageNo:1111,
				pageSize:10,
				pages:0
			}
		},
		onLoad() {
			this.setToken();
			this.getList();
		},
		methods: {
			change(index, i) {
				this['current'] = index;
			},
			setToken(){
				const cacheToken = uni.getStorageSync("token");
				console.log("cacheToken:",cacheToken);
				if(cacheToken){
					this.authority=cacheToken;
				}
			},
			getList(){
				uni.showNavigationBarLoading();
				var that = this;
				uni.request({
				    url: commons.baseUrl+commons.puaListUrl,
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
					console.log("res:",res);
					if(error){
						console.log(error);
					}
					if(res.data.status == 200){
						console.log("list:",res.data.data.records);
						if(this.pageNo == 1){
							uni.pageScrollTo({
							    scrollTop: 0,
							    duration: 30
							});
						}
						
						this.pages=res.data.data.pages;
						if(res.data.data.pages>0){
							this.isNull=false;
							this.list = this.list.concat(res.data.data.records);
						}else{
							this.isNull=true;
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
		}
	}
</script>
<style lang="scss">
	.p10{
		padding: 10px;
		font-size: 16px;
	}
	.null-data{
	  position: absolute;
	  top: 15%;
	  width: 100%;
	  text-align: center;
	}
	.topic-item{
		height: 200upx;
		position: relative;
	}
	.item-cover{
		width: 100%;
		height: 100%;
		background: #1A1A1A;
	}
	.image-right{
		width: 30upx;
		height: 30upx;
		position: absolute;
		right: 5%;
	}
</style>
