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
</style>
