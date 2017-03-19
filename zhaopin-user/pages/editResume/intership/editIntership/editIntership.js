var event = require('../../../../utils/event.js');
var $ = require('../../../../utils/util.js');
const years = require('../../../../configs/data_configs.js').years;
const degrees = require('../../../../configs/data_configs.js').degrees;
let app = getApp();
Page({
	data: {
		intership: {},
		maxlength: 1000,
		checked: false,
	},
	onLoad: function(options) {
		this.setData({
			intership: options,
			now: $.formatDate(new Date())
		});
		if (options.description == 'null') {
			this.setData({
				'intership.description': ''
			})
		}
		if (options.end_date == '至今') {
			this.setData({
				checked: true
			})
		}
		let _this = this;
		if (options.flag === 'false') {
			_this.setData({
				flag: false //表示新建
			})
		} else {
			_this.setData({
				flag: true
			})
		}
	},
	bindEndPickerChange: function(e) {
		this.setData({
			'intership.end_date': e.detail.value,
			checked: false
		})
	},
	bindStartPickerChange: function(e) {
		this.setData({
			'intership.start_date': e.detail.value
		})
	},
	input(e) {
		let {
			key
		} = e.currentTarget.dataset;
		let {
			intership
		} = this.data;
		intership[key] = e.detail.value
		this.setData({
			intership: intership
		})
	},
	save: function() {
		//wx.request
		if (this.data.flag) {
			app.resume('resume/updateIntership', 'POST', {
				intership: JSON.stringify(this.data.intership)
			}).then((res) => {
				if (res.data) {
					event.emit('resumeChanged', {
						key: 'interships',
						value: this.data.intership,
						event_type: 'change'
					})
					wx.navigateBack({})
				}
			})
		} else {
			app.resume('resume/addIntership', 'POST', {
				intership: JSON.stringify(this.data.intership)
			}).then((res) => {
				if (res.data) {
					event.emit('resumeChanged', {
						key: 'interships',
						value: this.data.intership,
						event_type: 'add'
					})
					wx.navigateBack({})
				}
			})
		}
	},
	delete: function() {
		//wx.request
		app.resume('resume/deleteIntership', 'POST', {
			id: this.data.intership.id
		}).then((res) => {
			if (res.data) {
				event.emit('resumeChanged', {
					key: 'interships',
					value: {
						id: this.data.intership.id
					},
					event_type: 'delete'
				})
				wx.navigateBack({})
			}
		})
	},
	textareaInput: function(e) {
		this.setData({
			'intership.description': e.detail.value
		})
	},
	changeChecked: function() {
		this.setData({
			checked: true,
			'intership.end_date': '至今'
		})
	}
})