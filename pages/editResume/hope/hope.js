const app = getApp();
const $ = require('../../../utils/util.js');
const event = require('../../../utils/event.js');
const types = require('../../../configs/data_configs.js').types;
const salaryRanges = require('../../../configs/data_configs.js').salaryRanges;

Page({
	data: {
		hope: {},
		types: types,
		salaryRanges: salaryRanges,
		maxlength: 200,
		salaryIndex: 2
	},
	onLoad: function(options) {
		let _this = this;
		if (!$.isEmptyObject(options)) {
			this.setData({
				'hope.name': options.name,
				'hope.type': options.type,
				'hope.city': options.city,
				'hope.salaryRange': options.salaryRange,
				'hope.otherDescription': options.otherDescription
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
			if (val == _this.data.hope.salaryRange) {
				_this.setData({
					salaryIndex: index
				})
			}
		})
	},
	bindTypePickerChange: function(e) {
		this.setData({
			'hope.type': types[e.detail.value]
		})
	},
	bindSalaryPickerChange: function(e) {
		this.setData({
			'hope.salaryRange': salaryRanges[e.detail.value]
		})
	},
	textareaInput: function(e) {
		this.setData({
			'hope.otherDescription': e.detail.value
		})
	},
	save: function() {
		//wx.request
		var _this = this;
		event.emit('resumeChanged', {
			key: 'hope',
			value: this.data.hope,
			event_type: 'change'
		})
		wx.navigateBack({})
	}
})