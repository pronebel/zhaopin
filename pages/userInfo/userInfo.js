var app = getApp();

Page({
	data: {
		userInfoFromWX: {},
		userInfo: {
			name: '',
			sex: '',
			phone: '',
			birth: '',
			email: ''
		}
	},
	onLoad: function() {
		this.setData({
			userInfoFromWX: app.globalData.userInfoFromWX
		})
	}
})