var event = require('../../../../utils/event.js');

Page({
	data: {
		education: {}
	},
	onLoad: function(options) {
		console.log(1);
		this.setData({
			education: options
		});
		var years = [];
		for (var i = 2000; i < new Date().getFullYear() + 4; i++) {
			years.push(i);
		}
		var _this = this;
		years.forEach((val, index) => {
			if (val == parseInt(_this.data.education.endDate)) {
				_this.setData({
					years: years,
					YearIndex: index
				})
			}
		})
		var degrees = ['大专', '本科', '硕士', '博士'];
		degrees.forEach((val, index) => {
			if (val == (_this.data.education.degree)) {
				_this.setData({
					degrees: degrees,
					degreeIndex: index
				})
			}
		})
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
		event.emit('resumeChanged', {
			key: 'education',
			value: _this.data.education
		})
		wx.navigateBack({})
	},
	delete: function() {
		//wx.request
		var _this = this;
		event.emit('resumeDeleted', {
			key: 'education',
			value: {
				id: this.data.education.id
			}
		})
		wx.navigateBack({})
	}
})