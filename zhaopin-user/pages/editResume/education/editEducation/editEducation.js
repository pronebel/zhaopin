var event = require('../../../../utils/event.js');
var $ = require('../../../../utils/util.js');
const years = require('../../../../configs/data_configs.js').years;
const degrees = require('../../../../configs/data_configs.js').degrees;

Page({
	data: {
		education: {}
	},
	onLoad: function(options) {
		this.setData({
			education: options
		});
		var _this = this;
		if ($.isEmptyObject(options)) {
			_this.setData({
				years: years,
				yearIndex: 17,
				degrees: degrees,
				degreeIndex: 1,
				flag: false //表示新建
			})
		} else {
			years.forEach((val, index) => {
				if (val == parseInt(_this.data.education.endDate)) {
					_this.setData({
						years: years,
						yearIndex: index,
						flag: true
					})
				}
			})
			degrees.forEach((val, index) => {
				if (val == (_this.data.education.degree)) {
					_this.setData({
						degrees: degrees,
						degreeIndex: index
					})
				}
			})
		}
	},
	bindYearPickerChange: function(e) {
		this.setData({
			'education.endDate': this.data.years[e.detail.value]
		})
	},
	bindDegreePickerChange: function(e) {
		this.setData({
			'education.degree': this.data.degrees[e.detail.value]
		})
	},
	save: function() {
		//wx.request
		var _this = this;
		if (_this.data.flag) {
			event.emit('resumeChanged', {
				key: 'educations',
				value: _this.data.education,
				event_type: 'change'
			})
		} else {
			event.emit('resumeChanged', {
				key: 'educations',
				value: _this.data.education,
				event_type: 'add'
			})
		}
		wx.navigateBack({})
	},
	delete: function() {
		//wx.request
		var _this = this;
		event.emit('resumeChanged', {
			key: 'educations',
			value: {
				id: this.data.education.id
			},
			event_type: 'delete'
		})
		wx.navigateBack({})
	}
})