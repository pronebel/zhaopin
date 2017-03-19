var event = require('../../../../utils/event.js');
let $ = require('../../../../utils/util.js');
const prizes = require('../../../../configs/data_configs.js').prizes;
let app = getApp();
Page({
	data: {
		honor: {},
		prizeIndex: 3
	},
	onLoad: function(options) {
		this.setData({
			honor: options,
			prizes: prizes
		});
		let _this = this;
		if (options.flag === 'false') {
			this.setData({
				flag: false //表示新建
			})
		} else {
			this.setData({
				flag: true
			})
			prizes.forEach((val, index) => {
				if (val == this.data.honor.prize) {
					_this.setData({
						prizeIndex: index
					})
				}
			})
		}
	},
	input(e) {
		let {
			key
		} = e.currentTarget.dataset;
		let {
			honor
		} = this.data;
		honor[key] = e.detail.value
		this.setData({
			honor: honor
		})
	},
	bindDatePickerChange: function(e) {
		this.setData({
			'honor.date': e.detail.value
		})
	},
	bindPrizePickerChange: function(e) {
		this.setData({
			'honor.prize': prizes[e.detail.value]
		})
	},
	save: function() {
		if (this.data.flag) {
			app.resume('resume/updateHonor', 'POST', {
				honor: JSON.stringify(this.data.honor)
			}).then((res) => {
				if (res.data) {
					event.emit('resumeChanged', {
						key: 'honors',
						value: this.data.honor,
						event_type: 'change'
					})
					wx.navigateBack({})
				}
			})
		} else {
			app.resume('resume/addHonor', 'POST', {
				honor: JSON.stringify(this.data.honor)
			}).then((res) => {
				if (res.data) {
					event.emit('resumeChanged', {
						key: 'honors',
						value: this.data.honor,
						event_type: 'add'
					})
					wx.navigateBack({})
				}
			})
		}
	},
	delete: function() {
		//wx.request
		app.resume('resume/deleteHonor', 'POST', {
			id: this.data.honor.id
		}).then((res) => {
			if (res.data) {
				event.emit('resumeChanged', {
					key: 'honors',
					value: {
						id: this.data.honor.id
					},
					event_type: 'delete'
				})
				wx.navigateBack({})
			}
		})
	},
})