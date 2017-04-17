// pages/companyInfo/companyInfo.js
var app = getApp();

var $ = require('../../utils/util.js');
var event = require('../../utils/event.js');
const degrees = require('../../configs/data_configs').degrees;
const {
	server
} = require('../../configs/serverConfig.js');

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
			this.setData({
			now: $.formatDate(new Date()),
		})
		app.getcompanyInfoFromWX((data) => {
			this.setData({
				companyInfoFromWX: data
			})
		})
		app.getCompanyInfo((data) => {
			this.setData({
				companyInfo: data
			})
			if (data.city == '') {
				app.getLocation((data) => {
					this.setData({
						'companyInfo.city': data
					})
				})
			}
			app.hiddenLoader(this);
		})
		event.on('cityChanged', this, function(data) {
			this.setData({
				'companyInfo.city': data.city
			})
		}.bind(this))
	},
	onUnload: function() {
		event.remove('companycityChanged', this);
	},

	chooseImg: function() {
		var _this = this;
		wx.chooseImage({
			count: 1,
			success: function(res) {
				var tempFilePaths = res.tempFilePaths;
				_this.setData({
					'userInfo.avatorUrl': tempFilePaths
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
	c_nameInput(e) {
		this.setData({
			'companyInfo.c_name': e.detail.value
		})
	},
	c_shortnameInput(e) {
		this.setData({
			'companyInfo.c_shortname': e.detail.value
		})
	},
	districtInput(e){
		this.setData({
			'companyInfo.district': e.detail.value
		})
	},
	addressInput(e){
		this.setData({
			'companyInfo.address': e.detail.value
		})
	},
	toWorkplace() {
		wx.navigateTo({
			url: `../workplace/workplace?city=${this.data.companyInfo.city}&flag=${'companyInfo_city'}`
		})
	},
	
	save: function() {
		//wx.request
		var _this = this;
		wx.navigateBack({});
	}
})