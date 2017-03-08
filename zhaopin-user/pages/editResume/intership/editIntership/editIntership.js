var event = require('../../../../utils/event.js');
var $ = require('../../../../utils/util.js');
const years = require('../../../../configs/data_configs.js').years;
const degrees = require('../../../../configs/data_configs.js').degrees;

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
		if (options.endDate == '至今') {
			this.setData({
				checked: true
			})
		}
		var _this = this;
		if ($.isEmptyObject(options)) {
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
			'intership.endDate': e.detail.value,
			checked: false
		})
	},
	bindStartPickerChange: function(e) {
		this.setData({
			'intership.startDate': e.detail.value
		})
	},
	save: function() {
		//wx.request
		var _this = this;
		if (_this.data.flag) {
			event.emit('resumeChanged', {
				key: 'interships',
				value: _this.data.intership,
				event_type: 'change'
			})
		} else {
			event.emit('resumeChanged', {
				key: 'interships',
				value: _this.data.intership,
				event_type: 'add'
			})
		}
		wx.navigateBack({})
	},
	delete: function() {
		//wx.request
		var _this = this;
		event.emit('resumeChanged', {
			key: 'interships',
			value: {
				id: this.data.intership.id
			},
			event_type: 'delete'
		})
		wx.navigateBack({})
	},
	textareaInput: function(e) {
		this.setData({
			'intership.description': e.detail.value
		})
	},
	changeChecked: function() {
		this.setData({
			checked: true,
			'intership.endDate': '至今'
		})
	}
})