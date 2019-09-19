// const baseUrl = 'http://localhost:8689';  
const baseUrl = 'https://www.lrshuai.top/miniapi';  
const preUrl="https://www.lrshuai.top/miniadmin/show";

function showTokenError(){
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
function requestError(){
	uni.showToast({
		title: "服务器异常，请求失败",
		icon: "none"
	});
}
function showNoMore(){
	uni.showToast({
		title: "没有更多的数据了",
		icon: "none"
	});
}

export default {
    baseUrl,
	preUrl,
    showTokenError,  
    requestError,
	showNoMore
}