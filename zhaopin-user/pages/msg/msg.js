const app = getApp();
let {
	server
} = require('../../configs/serverConfig.js');
let $ = require('../../utils/util.js');

Page({
	data: {
		loading: true,
		hiddenLoader: false
	},
	onLoad() {
		//获取消息
		this.getMsg();
	},
	getMsg() {
		//wx.request
		app.getUserInfo((res) => {
			$.ajax({
				url: `${server}/msg/getUnReadLength`,
				method: 'POST',
				data: {
					openid: res.openid
				}
			}).then((res) => {
				if (res.statusCode == 200) {
					this.setData({
						msg: res.data
					})
				}
				app.hiddenLoader(this);
			}).catch(error => app.hiddenLoader(this))
		})
	},
	navigateTo(e) {
		wx.navigateTo({
			url: e.currentTarget.dataset.url
		})
	}
})