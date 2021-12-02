<script>
	import commons from '@/common/commons.js';

	export default {
		onLaunch: function() {
			console.log('App Launch');
			this.setInit();
		},
		onShow: function() {
			console.log('App Show');
			// this.getSysMsg();
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			setInit() {
				console.log("初始化信息");
				uni.setStorageSync("token", "");
				uni.setStorageSync("deerToken", "");
				var userInfo = {
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
				uni.setStorageSync("userInfo", userInfo);
			},
			getSysMsg() {
				const cacheToken = uni.getStorageSync("token");
				if (cacheToken) {
					var res = commons.getMsgAmount(cacheToken);
					if (res) {
						if (res.statusCode == 200 && res.data.status == 200) {
							console.log("msg-res:", res);
							const amount = res.data.data;
							if (amount > 0) {
								uni.setTabBarBadge({
									index: 2,
									text: '' + amount
								});
								uni.setStorageSync('msgNumber', amount);
							}
						}
					}
				}
			}
		}
	};
</script>

<style>
	/*每个页面公共css */
	@import '/static/style/animate.min.css';

	/*flex*/
	.col-box {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		height: 100%;
		overflow: hidden;
	}

	.row-box {
		display: flex;
		display: -webkit-flex;
		flex-direction: wrap;
		-webkit-flex-direction: wrap;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		width: 100%;
		overflow: hidden;
	}

	.flex1 {
		flex-grow: 1;
		-webkit-flex-grow: 1;
		flex-shrink: 1;
		-webkit-flex-shrink: 1;
		flex-basis: 0px;
		-webkit-flex-basis: 0px;
	}

	.flex2 {
		flex-grow: 2;
		-webkit-flex-grow: 2;
		flex-shrink: 1;
		-webkit-flex-shrink: 1;
		flex-basis: 0px;
		-webkit-flex-basis: 0px;
	}

	.text-none {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.clearfix {
		clear: both;
	}

	.btn-info {
		background-color: #409eff;
		color: #fff;
	}
	
	.btn-info:hover {
		cursor: pointer;
		background-color: #409eff;
	}
	
	.btn-info:active {
		cursor: pointer;
		background-color: #55aaff;
	}

	.btn-success {
		background-color: #09BB07;
		color: #fff;
	}
	
	.btn-success:hover {
		cursor: pointer;
		background-color: #09BB07;
	}
	
	.btn-success:active {
		cursor: pointer;
		background-color: #55aa00;
	}
	
	.btn-danger  {
		background-color: #f23c3c;
		color: #fff;
	}
	
	.btn-danger:hover {
		cursor: pointer;
		background-color: #f23c3c;
	}
	
	.btn-danger:active {
		cursor: pointer;
		background-color: #f56c6c;
	}
</style>
