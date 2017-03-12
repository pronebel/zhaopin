// pages/companyInfo/companyInfo.js
var app = getApp();

var $ = require('../../utils/util.js');
var event = require('../../utils/event.js');
const degrees = require('../../configs/data_configs').degrees;

Page({
	data: {
		companyInfoFromWX: {},
		companyInfo: {
      id:'',
			name: '',
			scale: '',
			financingstage: '',
			address: '',
			province: '',
			city: '',
			district: '',
			field: '',
			description: ''
		},
		scaleArray: ['20人以下', '20至100人','100至500人','500人以上'],
    financingstageArray: ['未融资', '天使轮','A轮','B轮','C轮','D轮及以上','已上市'],
		now: '',
		defaultDate: '1994-01-01'
	},
	onLoad: function(options) {
		app.getcompanyInfo((data) => {
			this.setData({
				companyInfoFromWX: data
			})
		})

		//wx.request 
		let _financingstage = this.data.companyInfo.financingstage;
		if (!_financingstage) {
			this.setData({
				financingstageIndex: 1
			})
		} else {
			this.setData({
				financingstageIndex: $.inArray(_financingstage, financingstages)
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
					'companyInfo.imgUrl': tempFilePaths
				})
			}
		})
	},
	bindScalePickerChange: function(e) {
		this.setData({
			'companyInfo.scale': this.data.scaleArray[e.detail.value]
		})
	},
  bindFinanclePickerChange: function(e) {
		this.setData({
			'companyInfo.financingstage': this.data.financingstageArray[e.detail.value]
		})
	},
	// bindDatePickerChange: function(e) {
	// 	this.setData({
	// 		'companyInfo.birth': e.detail.value
	// 	})
	// },
	// bindfinancingstagePickerChange: function(e) {
	// 	this.setData({
	// 		'companyInfo.financingstage': financingsyage[e.detail.value]
	// 	})
	// },
	save: function() {
		//wx.request
		var _this = this;
		event.emit('resumeChanged', {
			key: 'companyInfo',
			value: _this.data.userInfo
		})
		wx.navigateBack({});
	}
})