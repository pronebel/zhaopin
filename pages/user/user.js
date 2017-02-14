var app = getApp();

Page({
	data: {
		userInfo: {}
	},
	onLoad: function() {
		this.setData({
			userInfo: app.globalData.userInfo
		})
	}
})