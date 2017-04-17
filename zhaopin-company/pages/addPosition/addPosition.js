// pages/addPosition/addPosition.js
var app = getApp();

var $ = require('../../utils/util.js');
var event = require('../../utils/event.js');
const degrees = require('../../configs/data_configs').degrees;

Page({
	data: {
		jobInfoFromWX: {},
		jobInfo: {
      id:'',
			name: '',
			salary: '',
			types: '',
			address: '',
			city: '',
			degree: '',
			welfare: '',
			skill: '',
      duty:'',
			description: ''
		},
		salaryArray: ['面议', '3000以下','3000-5000','5000-8000','8000-15000','15000以上'],
    degreeArray: ['职高','大专','本科','硕士','博士'],
    typesArray: ['全职', '兼职','实习'],
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
		let _types = this.data.positionInfo.types;
		if (!_types) {
			this.setData({
				typesIndex: 1
			})
		} else {
			this.setData({
				typesIndex: $.inArray(_types, types)
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
					'positionInfo.imgUrl': tempFilePaths
				})
			}
		})
	},
	bindSalaryPickerChange: function(e) {
		this.setData({
			'positionInfo.salary': this.data.salaryArray[e.detail.value]
		})
	},
  bindDegreePickerChange: function(e) {
		this.setData({
			'positionInfo.degree': this.data.degreeArray[e.detail.value]
		})
	},
  bindStatusPickerChange: function(e) {
		this.setData({
			'positionInfo.types': this.data.typesArray[e.detail.value]
		})
	},
	publish: function() {
		//wx.request
		var _this = this;
		event.emit('resumeChanged', {
			key: 'companyInfo',
			value: _this.data.userInfo
		})
		wx.navigateBack({});
	}
})