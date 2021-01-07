<template>
	<view class="content">
		<mSearch :mode="2" button="inside" backgroundColor="#efeff1" @search="search($event)"></mSearch>
		<text v-if="isNull"  class="null-data">暂无数据</text>
		<view v-else class="honey-list-box" >
			<honeyList  :honeyList="list" @praiseMe="praiseHoney" @collectMe="collectHoney" ></honeyList>
		</view>
		
	</view>
</template>

<script>
	import commons from '@/common/commons.js';  
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	import encryptUtil from '@/components/encrypt-util/encrypt-util.vue';
	import honeyList from '@/components/honey-words/honey-word-list/honey-word-list.vue';
	
	export default {
		components: {
			mSearch,
			honeyList
		},
		data() {
			return {
				list:[],
				keyword:'',
				pageNo:1,
				pageSize:10,
				pages:0,
				typeCode:'sayLove',
				authority:'abc',
				isNull:true
			};
		},
		onLoad() {
			this.setToken();
			this.getList();
		}, 
		//下拉刷新
		onPullDownRefresh:function(){
		  this.pageNo=1;
		  // 清空数组
		  this.list.length=0;
		  this.getList();
		 },
		// 页面上拉触底事件的处理函数
		onReachBottom(){
			if(this.pages == this.pageNo){
				console.log("到底了");
				commons.showNoMore();
				return;
			}
			this.pageNo++;
			this.getList();
		},
		
		//分享
		onShareAppMessage(res) {
		    if (res.from === 'menu') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '单身贵族必备神器，撩不到另一半算我输。',
		      path: '/pages/tabbar/tabbar-home/tabbar-home'
		    }
		  },

		methods: {
			search(val) {
				this.keyword=val;
				this.pageNo=1;
				// 清空数组
				this.list.length=0;
				this.getList();
			},
			setToken(){
				const cacheToken = uni.getStorageSync("token");
				console.log("cacheToken:",cacheToken);
				if(cacheToken){
					this.authority=cacheToken;
				}
			},
			praiseHoney(id){
				commons.praise(commons.baseUrl+commons.praiseUrl,this.authority,id,commons.sftType,this.list);
			},
			collectHoney(id){
				commons.collect(commons.baseUrl+commons.collectUrl,this.authority,id,commons.sftType,this.list);
			},
			getList(){
				uni.showNavigationBarLoading();
				var that = this;
				uni.request({
				    url: commons.baseUrl+commons.puaListUrl,
				    data: {
				        keyword: that.keyword,
						pageNo:that.pageNo,
						pageSize:that.pageSize,
						typeCode:that.typeCode
				    },
				    header: {
						'Authority':that.authority
				    }
				}).then(data=>{
					var [error, res] =data;
					console.log("res:",res);
					if(error){
						console.log(error);
					}
					if(typeof(res) != "undefined" && res.statusCode == 200 && res.data.status == 200){
						const aeskey = encryptUtil.rsaDecrypt(res.data.key);
						var resultData = JSON.parse(encryptUtil.aesDecrypt(res.data.data,aeskey));
						console.log("aaa=",encryptUtil.rsaEncrypt("aaaa"));
						console.log("aaa=",encryptUtil.rsaDecrypt(encryptUtil.rsaEncrypt("aaaa")));
						console.log("bbb=",encryptUtil.aesEncrypt("aaaa","1234569871236547"));
						console.log("bbb=",encryptUtil.aesDecrypt(encryptUtil.aesEncrypt("aaaa","1234569871236547"),"1234569871236547"));
						// var resultData = res.data.data;
						console.log("list:",resultData.records);
						if(this.pageNo == 1){
							uni.pageScrollTo({
							    scrollTop: 0,
							    duration: 30
							});
						}
						this.pages=resultData.pages;
						console.log("ressult:",resultData);
						if(resultData.pages>0){
							this.isNull=false;
							this.list = this.list.concat(resultData.records);
						}else{
							this.isNull=true;
						}
							
					}else if(res.data.status == "70000"){
						uni.removeStorageSync("token");
						commons.showTokenError("查看更多数据需要登录");
					}else{
						commons.requestError();
					}
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
				});
				
			},
		}
	};
</script>

<style>
.content{
	background: #efeff1;
}
.honey-list-box{
	width: 100%;
	padding-top: 80rpx;
	padding-bottom: 5rpx;
}
.null-data{
  position: absolute;
  top: 15%;
  width: 100%;
  text-align: center;
}
</style>
