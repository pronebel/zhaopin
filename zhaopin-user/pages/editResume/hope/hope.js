const app = getApp();
const $ = require('../../../utils/util.js');
const event = require('../../../utils/event.js');
const types = require('../../../configs/data_configs.js').types;
const salaryRanges = require('../../../configs/data_configs.js').salaryRanges;
let {
	server
} = require('../../../configs/serverConfig.js');
Page({
	data: {
		types: types,
		salaryRanges: salaryRanges,
		maxlength: 200,
		salaryIndex: 2
	},
	onLoad: function(options) {
		let _this = this;
		if (options.job == 'undefined' || options.job == 'null') {
			this.setData({
				'hope.resume_id': options.resume_id
			})
		} else {
			this.setData({
				hope: options
			})
			if (!options.otherDescription || options.otherDescription == 'null' || options.otherDescription == 'undefined') {
				this.setData({
					'hope.otherDescription': ''
				})
			}
			types.forEach((val, index) => {
				if (val == _this.data.hope.type) {
					_this.setData({
						typeIndex: index
					})
				}
			})
			salaryRanges.forEach((val, index) => {
				if (val == _this.data.hope.salary) {
					_this.setData({
						salaryIndex: index
					})
				}
			})
		}
		event.on('hope_city_changed', this, (data) => {
			_this.setData({
				'hope.city': data.city
			})
		});
	},
	input(e) {
		let {
			key
		} = e.currentTarget.dataset;
		let {
			hope
		} = this.data;
		hope[key] = e.detail.value
		this.setData({
			hope: hope
		})
	},
	bindTypePickerChange: function(e) {
		this.setData({
			'hope.type': types[e.detail.value]
		})
	},
	bindSalaryPickerChange: function(e) {
		this.setData({
			'hope.salary': salaryRanges[e.detail.value]
		})
	},
	textareaInput: function(e) {
		this.setData({
			'hope.otherDescription': e.detail.value
		})
	},
	toWorkplace() {
		wx.navigateTo({
			url: `../../workplace/workplace?city=${this.data.hope.city}&flag=${'hope_city'}`
		})
	},
	save: function() {
		//wx.request
		var _this = this;
		let {
			id
		} = this.data.hope;
		let url = '';
		if (id) {
			url = 'resume/updateHope'
		} else {
			url = 'resume/addHope'
		}
		$.ajax({
			url: `${server}/${url}`,
			method: 'POST',
			data: {
				hope: JSON.stringify(this.data.hope)
			}
		}).then((res) => {
			if (res.data) {
				event.emit('resumeChanged', {
					key: 'hope',
					value: this.data.hope,
					event_type: 'change'
				})
				wx.navigateBack({})
			}
		})
	}
})