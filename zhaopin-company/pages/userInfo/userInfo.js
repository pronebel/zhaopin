// pages/userInfo/userInfo.js
var app = getApp();

var $ = require('../../utils/util.js');
var event = require('../../utils/event.js');
const degrees = require('../../configs/data_configs').degrees;

Page({
	data: {
		userInfoFromWX: {},
		userInfo: {
			name: '',
			sex: '',
			phone: '',
			birth: '',
			email: '',
			imgUrl: '',
			company: '',
			position: '',
			city: ''
		},
		sexArray: ['男', '女'],
		now: '',
		defaultDate: '1994-01-01'
	},
	onLoad: function(options) {
		this.setData({
			now: $.formatDate(new Date()),
			degrees: degrees
		})
		app.getUserInfo((data) => {
			this.setData({
				userInfoFromWX: data
			})
		})

		//wx.request 
		let _degree = this.data.userInfo.degree;
		if (!_degree) {
			this.setData({
				degreeIndex: 1
			})
		} else {
			this.setData({
				degreeIndex: $.inArray(_degree, degrees)
			})
		}
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
	},
	bindDegreePickerChange: function(e) {
		this.setData({
			'userInfo.degree': degrees[e.detail.value]
		})
	},
	save: function() {
		//wx.request
		var _this = this;
		event.emit('resumeChanged', {
			key: 'userInfo',
			value: _this.data.userInfo
		})
		wx.navigateBack({});
	}
})