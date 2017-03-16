let event = require('../../../../utils/event.js');
var $ = require('../../../../utils/util.js');
const years = require('../../../../configs/data_configs.js').years;
const degrees = require('../../../../configs/data_configs.js').degrees;
let app = getApp();
Page({
	data: {
		project: {},
		maxlength: 1000,
		checked: false,
	},
	onLoad: function(options) {
		this.setData({
			project: options,
			now: $.formatDate(new Date())
		});
		if (options.description == 'null') {
			this.setData({
				'project.description': ''
			})
		}
		if (options.end_date == '至今') {
			this.setData({
				checked: true
			})
		}
		if (options.flag === 'false') {
			this.setData({
				flag: false //表示新建
			})
		} else {
			this.setData({
				flag: true
			})
		}
	},
	bindEndPickerChange: function(e) {
		this.setData({
			'project.end_date': e.detail.value,
			checked: false
		})
	},
	bindStartPickerChange: function(e) {
		this.setData({
			'project.start_date': e.detail.value
		})
	},
	input(e) {
		let {
			key
		} = e.currentTarget.dataset;
		let {
			project
		} = this.data;
		project[key] = e.detail.value
		this.setData({
			project: project
		})
	},
	save: function() {
		//wx.request
		if (this.data.flag) {
			app.resume('resume/updateProject', 'POST', {
				project: JSON.stringify(this.data.project)
			}).then((res) => {
				if (res.data) {
					event.emit('resumeChanged', {
						key: 'projects',
						value: this.data.project,
						event_type: 'change'
					})
					wx.navigateBack({})
				}
			})
		} else {
			app.resume('resume/addProject', 'POST', {
				project: JSON.stringify(this.data.project)
			}).then((res) => {
				if (res.data) {
					event.emit('resumeChanged', {
						key: 'projects',
						value: this.data.project,
						event_type: 'add'
					})
					wx.navigateBack({})
				}
			})
		}
	},
	delete: function() {
		//wx.request
		app.resume('resume/deleteProject', 'POST', {
			id: this.data.project.id
		}).then((res) => {
			if (res.data) {
				event.emit('resumeChanged', {
					key: 'projects',
					value: {
						id: this.data.project.id
					},
					event_type: 'delete'
				})
				wx.navigateBack({})
			}
		})
	},
	textareaInput: function(e) {
		this.setData({
			'project.description': e.detail.value
		})
	},
	changeChecked: function() {
		this.setData({
			checked: true,
			'project.end_date': '至今'
		})
	}
})