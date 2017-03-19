var app = getApp();
let event = require('../../utils/event.js');

Page({
	data: {
		userInfoFromWX: {},
		userInfo: null
	},
	onLoad: function() {
		app.getUserInfoFromWX((data) => {
			this.setData({
				userInfoFromWX: data
			})
		})
		app.getUserInfo((data) => {
			this.setData({
				userInfo: data
			})
		})
		event.on('userInfoChanged', this, function(data) {
			this.setData({
				userInfo: data.userInfo
			})
		}.bind(this))
	},
	onUnolad: function() {
		event.remove('userInfoChanged', this)
	},
	toResume: function() {
		wx.navigateTo({
			url: '../resume/resume'
		})
	},
	toUserInfo: function() {
		wx.navigateTo({
			url: '../userInfo/userInfo'
		})
	},
	toCollect: function() {
		wx.navigateTo({
			url: '../collect/collect'
		})
	},
	toConfig: function() {
		wx.navigateTo({
			url: '../config/config'
		})
	}
})