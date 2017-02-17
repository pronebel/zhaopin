var app = getApp();

var $ = require('../../utils/util.js');

Page({
	data: {
		userInfoFromWX: {},
		userInfo: {
			name: '',
			sex: '',
			phone: '',
			birth: '',
			email: '',
			imgUrl: ''
		},
		sexArray: ['男', '女'],
		now: '',
		defaultDate: '1994-01-01'
	},
	onLoad: function() {
		this.setData({
			userInfoFromWX: app.globalData.userInfoFromWX
		})
		this.setData({
			now: $.formatDate(new Date())
		})
	},
	chooseImg: function() {
		var _this = this;
		wx.chooseImage({
			count: 1,
			success: function(res) {
				var tempFilePaths = res.tempFilePaths;
				_this.setData({
					'userInfo.imgUrl': tempFilePaths
				})
			}
		})
	},
	bindPickerChange: function(e) {
		this.setData({
			'userInfo.sex': this.data.sexArray[e.detail.value]
		})
	},
	bindDatePickerChange: function(e) {
		this.setData({
			'userInfo.birth': e.detail.value
		})
	}
})