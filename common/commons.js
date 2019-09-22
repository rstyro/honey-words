// const baseUrl = 'http://localhost:8689';  
const baseUrl = 'https://www.lrshuai.top/miniapi';  
const preUrl="https://www.lrshuai.top/miniadmin/show";

//首页列表				
const puaListUrl="/pua/speechcraft/list";
//主题列表
const puaTopicListUrl="/pua/speechcraftType/list";
const puaTopicDetailUrl="/pua/speechcraftType/detail";
//某个主题中的数据列表
const sftListByTopicUrl="/pua/speechcraft/getSpeechcraftListByTopic";
//点赞
const praiseUrl="/pua/praise/praiseMe";
//收藏
const collectUrl="/pua/collect/collectMe";

const topicType="topic";
const sftType="speechcraft";

const showTokenError = function(){
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

// 点赞
const praise = function(url,authority,tableId,tableType,list){
	console.log("praise-authority:",authority);
	console.log("praise-tableId:",tableId);
	console.log("praise-tableType:",tableType);
	console.log("praise-list:",list);
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
					}else{
						item.praiseNum = (item.praiseNum>0)?item.praiseNum-1:item.praiseNum
					}
					list[index]=item;
				}else{
					list.praiseFlag=!list.praiseFlag;
					if(list.praiseFlag){
						++list.praiseNum;
					}else{
						list.praiseNum = (list.praiseNum>0)?list.praiseNum-1:list.praiseNum
					}
				}
				console.log("点赞成功")
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
			
export default {
    baseUrl,
	preUrl,
	puaListUrl,
	puaTopicListUrl,
	puaTopicDetailUrl,
	sftListByTopicUrl,
	praiseUrl,
	collectUrl,
	topicType,
	sftType,
    showTokenError,  
    requestError,
	showNoMore,
	praise,
	collect,
}