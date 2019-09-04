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
				url:"/pua/speechcraft/list",
				authority:'cd8ef7dcd3254932824e30526db19a6c'
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
				    url: this.$baseUrl+this.url,
				    data: {
				        keyword: this.keyword,
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						typeCode:this.typeCode
				    },
				    header: {
						'Authority':this.authority
				    },
				    success: (res) => {
						if(res.statusCode == 200 && res.data.status == 200){
							this.honeyList= res.data.data.records;
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
