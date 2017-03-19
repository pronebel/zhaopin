// pages/position/position.js
Page({
	data: {
	},
	onLoad() {
		//获取消息

	},
	getMsg() {
		//wx.request
	},
	navigateTo(e) {
		wx.navigateTo({
			url: e.currentTarget.dataset.url
		})
	},
	addPosition: function() {
		wx.navigateTo({
			url: '../addPosition/addPosition'
		})
	}
})