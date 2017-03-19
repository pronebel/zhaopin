let event = require('../../../../utils/event.js');
const years = require('../../../../configs/data_configs.js').years;
const degrees = require('../../../../configs/data_configs.js').degrees;
let app = getApp();
Page({
	data: {
		education: {}
	},
	onLoad: function(options) {
		this.setData({
			education: options
		});
		let _this = this;
		if (options.flag === 'false') {
			_this.setData({
				years: years,
				yearIndex: 17,
				degrees: degrees,
				degreeIndex: 1,
				flag: false //表示新建
			})
		} else {
			years.forEach((val, index) => {
				if (val == _this.data.education.graduation_year) {
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
			'education.graduation_year': this.data.years[e.detail.value]
		})
	},
	bindDegreePickerChange: function(e) {
		this.setData({
			'education.degree': this.data.degrees[e.detail.value]
		})
	},
	input(e) {
		let {
			key
		} = e.currentTarget.dataset;
		let {
			education
		} = this.data;
		education[key] = e.detail.value
		console.log(key);
		this.setData({
			education: education
		})
	},
	save: function() {
		//wx.request
		if (this.data.flag) {
			app.resume('resume/updateEducation', 'POST', {
				education: JSON.stringify(this.data.education)
			}).then((res) => {
				if (res.data) {
					event.emit('resumeChanged', {
						key: 'educations',
						value: this.data.education,
						event_type: 'change'
					})
					wx.navigateBack({})
				}
			})
		} else {
			app.resume('resume/addEducation', 'POST', {
				education: JSON.stringify(this.data.education)
			}).then((res) => {
				if (res.data) {
					event.emit('resumeChanged', {
						key: 'educations',
						value: this.data.education,
						event_type: 'add'
					})
					wx.navigateBack({})
				}
			})
		}
	},
	delete: function() {
		//wx.request
		let _this = this;
		app.resume('resume/deleteEducation', 'POST', {
			id: this.data.education.id
		}).then((res) => {
			if (res.data) {
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
	}
})