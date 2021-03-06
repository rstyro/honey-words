// const baseUrl = 'http://localhost:8689';  
// const preUrl="http://localhost:8689/show";
const baseUrl = 'https://www.rstyro.top/miniapi';  
const preUrl="https://www.rstyro.top/miniadmin/show";


//首页列表				
const puaListUrl="/pua/speechcraft/list";
//主题列表
const puaTopicListUrl="/pua/speechcraftType/list";
const puaTopicDetailUrl="/pua/speechcraftType/detail";
//某个主题中的数据列表
const sftListByTopicUrl="/pua/speechcraft/getSpeechcraftListByTopic";

//收藏列表
const collectListUrl="/pua/collect/list";
//点赞
const praiseUrl="/pua/praise/praiseMe";
//收藏
const collectUrl="/pua/collect/collectMe";

const aboutUrl="/mini/about/list";

// 鸡汤url
const chickenSoupUrl="/sys/chickenSoup/list";

const topicType="topic";
const sftType="speechcraft";

const showTokenError = function(msg){
	if(typeof(msg) == "undefined" || msg == ""){
		msg = "此操作需要登录";
	}
	uni.showModal({
		title: '提示',
		content: msg,
		showCancel: true,
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
const requestError = function(){
	uni.showToast({
		title: "服务器异常，请求失败",
		icon: "none"
	});
}
const showNoMore = function(){
	uni.showToast({
		title: "没有更多的数据了",
		icon: "none"
	});
}

const thanks=function(){
	uni.showToast({
		icon: "none",
	    title: '谢谢，你最棒了！',
		image: '/static/img/thank.png',
	    duration: 2000
	});
}

// 点赞
const praise = function(url,authority,tableId,tableType,list){
	if(authority == ""){
		showTokenError("Sorry,需要登录才可点赞哟");
	}
	uni.request({
			url: url,
			method:"POST",
			header: {
				'Authority':authority,
				"content-type": "application/x-www-form-urlencoded"
			},
			data:{
				tableType:tableType,
				tableId:tableId
			}
	  }).then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
			var [error, res]  = data;
			if(res.data.status == 200){
				if(tableType == "speechcraft"){
					let index = list.findIndex(item => item.id === tableId );
					var item = list[index];
					item.praiseFlag = !item.praiseFlag
					if(item.praiseFlag){
						++item.praiseNum;
						thanks();
					}else{
						item.praiseNum = (item.praiseNum>0)?item.praiseNum-1:item.praiseNum
					}
					list[index]=item;
				}else{
					list.praiseFlag=!list.praiseFlag;
					if(list.praiseFlag){
						++list.praiseNum;
						thanks();
					}else{
						list.praiseNum = (list.praiseNum>0)?list.praiseNum-1:list.praiseNum
					}
				}
				console.log("点赞成功");
				
			}else if(res.data.status == "70000"){
				uni.removeStorageSync("token");
				showTokenError("Sorry,需要登录才可点赞哟");
				return;
			}else{
				uni.showToast({
					title: res.data.message,
					icon: "none"
				});
			}
			if(error){
				console.log(error);
			}
		})
}

//收藏
const collect = function(url,authority,tableId,tableType,list){
	if(authority == ""){
		showTokenError("Sorry,需要登录才可收藏哟");
	}
	uni.request({
			url: url,
			method:"POST",
			header: {
				'Authority':authority,
				"content-type": "application/x-www-form-urlencoded"
			},
			data:{
				tableType:tableType,
				tableId:tableId
			}
	  }).then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
			var [error, res]  = data;
			if(res.data.status == 200){
				if(tableType == "speechcraft"){
					let index = list.findIndex(item => item.id === tableId );
					console.log("index",index);
					list[index].collectFlag= !list[index].collectFlag;
				}else{
					list.collectFlag=!list.collectFlag;
					if(list.collectFlag){
						++list.collectNum;
					}else{
						list.collectNum = (list.collectNum>0)?list.collectNum-1:list.collectNum
					}
				}
				console.log("收藏成功,tableId={}",tableId)
			}else if(res.data.status == "70000"){
				uni.removeStorageSync("token");
				showTokenError("Sorry,需要登录才可收藏哟");
			}else{
				uni.showToast({
					title: res.data.message,
					icon: "none"
				});
			}
			if(error){
				console.log(error);
			}
		})
}

const getMsgAmount=function(authority){
	uni.request({
	   url: baseUrl+'/sys/sysmsg/getMsgAmount',
	   method:"GET",
	   header: {
		   "content-type": "application/x-www-form-urlencoded",
		   "Authority":authority,
		   },
	    data: {},
	   success: (res) => {
		   return res;
	    },fail(error) {
		   return error;
	    }
	});
}
			
export default {
    baseUrl,
	preUrl,
	puaListUrl,
	puaTopicListUrl,
	puaTopicDetailUrl,
	sftListByTopicUrl,
	collectListUrl,
	praiseUrl,
	collectUrl,
	aboutUrl,
	topicType,
	sftType,
    showTokenError,  
    requestError,
	showNoMore,
	praise,
	collect,
	getMsgAmount,
	chickenSoupUrl
}