<template>
		<scroll-view class="content" v-bind:style="{height:contentH+'px'}" scroll-y="true" @scrolltolower="loadMore" lower-threshold="10">
			<view class="new-list">
				<view class="list-left">
					<view class="card" v-for="(item,index) in cardListLeft">
						<image :src="item.cardImg" alt="" mode="center" @load="onImageLoad"></image>
						<view class="card-text">
							<h2>{{item.cardTitle}}</h2>
							<p>{{item.cardText}}</p>
						</view>
					</view>
				</view>
				<view class="list-right">
					<view class="card" v-for="(item,index) in cardListRight" >
						<image :src="item.cardImg" alt="" mode="center"  @load="onImageLoad"></image>
						<view class="card-text">
							<h2>{{item.cardTitle}}</h2>
							<p>{{item.cardText}}</p>
						</view>
					</view>
				</view>
			</view>
			<view class="noMore" v-if="showNoMore" >我也是有底线的！！！</view>
		</scroll-view>
		

</template>

<script>
	
	
	export default {
		data() {
			return {
				allcardList:[{
									cardImg:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3987907653,720009510&fm=26&gp=0.jpg",
									cardTitle:"我是第一张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								},{
									cardImg:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=508387608,2848974022&fm=26&gp=0.jpg",
									cardTitle:"我是第二张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								},{
									cardImg:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=508387608,2848974022&fm=26&gp=0.jpg",
									cardTitle:"我是第三张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								},{
									cardImg:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1563980539,1672265910&fm=26&gp=0.jpg",
									cardTitle:"我是第四张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								},{
									cardImg:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1563980539,1672265910&fm=26&gp=0.jpg",
									cardTitle:"我是第五张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								},{
									cardImg:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1563980539,1672265910&fm=26&gp=0.jpg",
									cardTitle:"我是第六张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								},{
									cardImg:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1563980539,1672265910&fm=26&gp=0.jpg",
									cardTitle:"我是第七张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								},{
									cardImg:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1688026885,2773767715&fm=26&gp=0.jpg",
									cardTitle:"我是第八张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								},{
									cardImg:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4064075977,3738371861&fm=26&gp=0.jpg",
									cardTitle:"我是第九张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								},{
									cardImg:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4064075977,3738371861&fm=26&gp=0.jpg",
									cardTitle:"我是第十张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								},{
									cardImg:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1688026885,2773767715&fm=26&gp=0.jpg",
									cardTitle:"我是第十一张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								},{
									cardImg:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1688026885,2773767715&fm=26&gp=0.jpg",
									cardTitle:"我是第十二张图片",
									cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
								}],
								cardListLeft:[],		//用来储存左栏的card
								cardListRight:[],		//用来储存右栏的card
								cardLeftHeight:0,
								cardRightHeight:0,		//分别是左右栏的高度
								cardListItem:0,			//作为card的ID
								rImgH:0,				//实际载入的card的高度
								contentH:800,			//设置客户端的屏幕高度默认值
								loadMoreTemp:1,			//作为scoll滚动触底，加载更多的标记，防止多次出发事件，1为允许，0为阻止
								showNoMore:false,		//控制底部“我也是有底线view的显示”
								 lists: ['A', 'B', 'C', 'D', 'E']
			}
		},
		onLoad() {
			this.waterfall();			//初始化瀑布流
		},
		methods: {
			onImageLoad: function(e){
				console.log("onImageLoad");
				let divWidth = 345;			//实际显示的单栏宽度，345upx
				let oImgW = e.detail.width; //图片原始宽度
				let oImgH = e.detail.height; //图片原始高度
				console.log("e:",e);
				let rImgH = divWidth*oImgH/oImgW+170;	//重新计算当前载入的card的高度
				if(this.cardListItem==0){
					this.cardLeftHeight += rImgH;	//第一张card高度加到cardLeftHeight
					this.cardListItem++;			//card索引加1
					this.cardListRight.push(this.cardList[this.cardListItem]);	//添加第二张card到cardListRight数组
				}else{
					this.cardListItem++;		//card索引加1
					
						if(this.cardLeftHeight > this.cardRightHeight){		//把card的高度加到目前高度更低的栏中
							this.cardRightHeight += rImgH;		//第二张card高度加到cardRightHeight
						}else{
							this.cardLeftHeight += rImgH;
						}
						
					if(this.cardListItem<this.cardList.length){				//根据目前的栏高，把下一张card，push到低的那栏
						if(this.cardLeftHeight > this.cardRightHeight){
							this.cardListRight.push(this.cardList[this.cardListItem]);		//添加第三张card到cardListRight数组
						}else{
							this.cardListLeft.push(this.cardList[this.cardListItem]);
						}
					}
				}
			
				// console.log(+this.cardListItem);
				if(this.cardListItem%4 == 0){				//每次载入的card数量设置为4，只有载入完成才允许下一次的scroll触底，触发loadMore
					this.loadMoreTemp = 1;
				}
			
			},
			
			waterfall: function(){
				this.cardList = this.allcardList.slice(0,4);		//初始化图片显示
				this.cardListLeft.push(this.cardList[0]);
				this.preLoadImg = this.cardList[0].cardImg;
				var that = this;
				uni.getSystemInfo({		//利用uni-APP获取系统信息Api，获取客户端的屏幕高度，设置成scoll-view的高度，实现触底事件
					success: function (res) {
						that.contentH = res.windowHeight;
					},
				});
			},
									
			loadMore: function(){
				if(this.loadMoreTemp == 1){			//loadMoreTemp==1,才允许触发
					console.log("loadMore");
					this.loadMoreTemp = 0;			//防止多次触发
					
					let newcardList = this.allcardList.slice(this.cardListItem,this.cardListItem+4);//模拟后端接口返回四个新的数据
					
					console.log(newcardList);
					console.log("this.cardLeftHeight:",this.cardLeftHeight);
					console.log("this.cardRightHeight:",this.cardRightHeight);
					if(!newcardList.length == 0){				//判断是否还有新数据
						this.cardList = this.cardList.concat(newcardList);			//返回的新数据加到当前的cardList
						if(this.cardLeftHeight > this.cardRightHeight){				//把第一个新数据加到目前更低的栏上，以触发@load="onImageLoad"
							this.cardListRight.push(newcardList[0]);			
						}else{
							this.cardListLeft.push(newcardList[0]);
						}
					}else{
						this.showNoMore = true;				//没有新数据就显示到底了
					}
				}
			}
		},
		components: {
			
		}
	}
</script>

<style>
	.new-list{
		display: flex;
		  flex: 1;
		  position: relative;
		  flex-direction: row;
		  justify-content: space-between;
		  padding-left: 12rpx;
		  padding-right: 12rpx;
		  padding-top: 8rpx;
	}
	.list-left{
		  display: flex;
		   position: relative;
		   flex-direction: column;
		   width: 359rpx;;
	}
	.list-right{
		display: flex;
		  position: relative;
		  flex-direction: column;
		  width: 359rpx;
	}
	.card{
		border: 3rpx #007AFF  solid;
		margin: 10rpx;
		width: 100%;
	}

</style>
