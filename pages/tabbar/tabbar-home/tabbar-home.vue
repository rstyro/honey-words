<template>
	
	<view class="content">
		<mSearch :mode="2" button="inside" backgroundColor="#efeff1" @search="search($event)"></mSearch>
		<view class="honey-list-box">
			<honeyList :honeyList="honeyList" :praiseMe="praiseHoney" :collectMe="collectHoney" ></honeyList>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	import honeyList from '@/pages/honey-words/honey-word-list/honey-word-list.vue';
	
	export default {
		data() {
			return {
				honeyList:[],
				keyword:'',
				pageNo:1,
				pageSize:10,
				typeCode:'sayLove',
				authority:'cd8ef7dcd3254932824e30526db19a6c',
				api:{
					baseUrl:"http://localhost:8689",
					listUrl:"/pua/speechcraft/list",
					praiseUrl:"/pua/praise/praiseMe",
					collectUrl:"/pua/collect/collectMe"
				}
			};
		},
		onLoad() {
			this.getList();
		},
		components: {
			mSearch,
			honeyList
		},
		methods: {
			search(val) {
				
			},
			getList(){
				var that = this;
				uni.request({
				    url: that.api.baseUrl+that.api.listUrl,
				    data: {
				        keyword: that.keyword,
						pageNo:that.pageNo,
						pageSize:that.pageSize,
						typeCode:that.typeCode
				    },
				    header: {
						'Authority':that.authority
				    },
				    success: (res) => {
						if(res.statusCode == 200 && res.data.status == 200){
							that.honeyList= res.data.data.records;
						}else if(res.data.status == "70000"){
							uni.showModal({
							    title: '提示',
							    content: 'token失效，请重新授权登录',
								showCancel: false,
							    success: function (res) {
							        if (res.confirm) {
							            console.log('用户点击确定');
										uni.reLaunch({
										    url: '/pages/auth/auth'
										});
							        }
							    }
							});
						}
				        console.log(res);
				    },fail(error) {
				    	console.log(error);
				    }
				});

			},
			praiseHoney(id){
				let index = this.honeyList.findIndex(item => item.id === id );
				var item = this.honeyList[index];
				item.praiseFlag = !item.praiseFlag
				if(item.praiseFlag){
					++item.praiseNum;
				}else{
					item.praiseNum = (item.praiseNum>0)?item.praiseNum-1:item.praiseNum
				}
				this.honeyList[index]=item;
			},
			collectHoney(id){
				let index = this.honeyList.findIndex(item => item.id === id );
				console.log("index",index);
				this.honeyList[index].collectFlag= !this.honeyList[index].collectFlag;
				console.log("id=",id);
			}
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
</style>
