// pages/my/my.js
var app = getApp();

Page({
	data: {
		userInfoFromWX: {},
		userInfo: {
			name: '',
			imgUrl: ''
		}
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
	},
	toResume: function() {
		wx.navigateTo({
			url: '../company/company'
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
	},
	toCompanyInfo: function() {
		wx.navigateTo({
			url: '../companyInfo/companyInfo'
		})
	}
})