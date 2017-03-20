// pages/userInfo/userInfo.js
var app = getApp();

var $ = require('../../utils/util.js');
var event = require('../../utils/event.js');
const degrees = require('../../configs/data_configs').degrees;

Page({
	data: {
		userInfoFromWX: {},
		userInfo: {},
		sexArray: ['男', '女'],
		now: '',
		defaultDate: '1994-01-01',
		checkEmail: true,
		checkMobile: true,
		avatarChange: false,
		loading: true
	},
	onLoad: function(options) {
		this.setData({
			now: $.formatDate(new Date()),
			degrees: degrees
		})
		app.getUserInfoFromWX((data) => {
			this.setData({
				userInfoFromWX: data
			})
		})
		app.getUserInfo((data) => {
			this.setData({
				userInfo: data
			})
			if (data.city == '') {
				app.getLocation((data) => {
					this.setData({
						'userInfo.city': data
					})
				})
			}

			//	app.hiddenLoader.call(this);
			app.hiddenLoader(this);
		})

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
		event.on('cityChanged', this, function(data) {
			this.setData({
				'userInfo.city': data.city
			})
		}.bind(this))
	},
	onUnload: function() {
		event.remove('cityChanged', this);
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
		let _this = this;
		let {
			userInfo
		} = this.data;
		if (!this.data.checkEmail || !this.data.checkMobile) {
			wx.showToast({
				title: '您的输入错误，请检查!'
			})
			return;
		}
		$.ajax({
			url: `${server}/hr/updateHr`,
			method: 'POST',
			data: {
				userInfo: JSON.stringify(userInfo),
				thirdSessionKey: app.globalData.session.thirdSessionKey
			}
		}).then((res) => {
			if (res.data === true) {
				wx.showToast({
					title: '保存成功',
					icon: 'success'
				})
				event.emit('resumeChanged', {
					event_type: 'change',
					key: 'userInfo',
					value: userInfo
				})
				event.emit('userInfoChanged', {
					userInfo: userInfo
				})
				wx.setStorageSync('userInfo', userInfo);
				app.globalData.userInfo = userInfo;
				wx.navigateBack({});
			} else {
				wx.showToast({
					title: '数据保存失败',
				})
			}
		})
		if (this.data.avatarChange) {
			wx.uploadFile({
				url: `${server}/upload/avatar`,
				filePath: this.data.filePath,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded;charset="UTF-8"',
					'Cookie': 'JSESSIONID=' + wx.getStorageSync('session').sessionId
				},
				name: 'avatar',
				formData: {
					thirdSessionKey: app.globalData.session.thirdSessionKey
				},
				success: (res) => {
					if (res.data != 'false') {
						_this.setData({
							'userInfo.avatarUrl': res.data
						})
						event.emit('userInfoChanged', {
							userInfo: _this.data.userInfo
						})
						event.emit('resumeChanged', {
							event_type: 'change',
							key: 'userInfo',
							value: _this.data.userInfo
						})
					} else {
						wx.showToast({
							title: '头像上传失败'
						})
					}
				},
				fail: (res) => {
					wx.showToast({
						title: '头像上传失败'
					})
				}
			})
		}
	},
	toWorkplace() {
		wx.navigateTo({
			url: `../workplace/workplace?city=${this.data.userInfo.city}&flag=${'userInfo_city'}`
		})
	}
})