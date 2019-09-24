<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.setInit();
		setTimeout(() => {
			uni.setTabBarBadge({
				index: 2,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 0
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods:{
		setInit(){
			console.log("初始化信息");
			uni.setStorageSync("token","a5e4443a85d7443da751fd7e6558d55b");
			var userInfo={
					"userId": 1,
					"nickName": "帅大叔",
					"picUrl": "https://wx.qlogo.cn/mmopen/vi_32/qU4nEGe21CbuXP7FoHtbvWLKTJKibnDXKZ1A53nMsJcPsl6u8tRqeOXNObRnoy85waq4LCdFUXzh6iaOQPPpAqicg/132",
					"picId": "9bbbb6119f0c4a3bbd8873fd630552e8",
					"sex": 1,
					"sign": '1',
					"city": "Shenzhen",
					"province": "Guangdong",
					"country": "China",
					"openid": "ohgIn0RxU52FLnN-53PvwRapq_ac",
					"email": 'null',
					"phone": 'null',
					"status": "on",
					"birthday": 'null',
					"ip": 'null',
					"isDel": 0,
					"createTime": "2019-09-22 16:49:04"
				}
			uni.setStorageSync("userInfo",userInfo);
		}
	}
};
</script>

<style>
/*每个页面公共css */ 

/*flex*/
.col-box{
display:flex;display:-webkit-flex;
flex-direction:column;-webkit-flex-direction:column;
flex-wrap:wrap;-webkit-flex-wrap:wrap;
height:100%;overflow: hidden;
}
.row-box{
display:flex;display:-webkit-flex;
flex-direction:wrap;-webkit-flex-direction:wrap;
flex-wrap:wrap;-webkit-flex-wrap:wrap;
width:100%;overflow: hidden;
}

.flex1{
  flex-grow:1;-webkit-flex-grow:1;
  flex-shrink:1;-webkit-flex-shrink:1;
  flex-basis:0px;-webkit-flex-basis:0px;
}
.flex2{
  flex-grow:2;-webkit-flex-grow:2;
  flex-shrink:1;-webkit-flex-shrink:1;
  flex-basis:0px;-webkit-flex-basis:0px;
}

.text-none{overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
.clearfix{clear: both;}


</style>
