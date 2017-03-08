var event = require('../../../../utils/event.js');
var $ = require('../../../../utils/util.js');
const prizes = require('../../../../configs/data_configs.js').prizes;

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
		var _this = this;
		if ($.isEmptyObject(options)) {
			_this.setData({
				flag: false //表示新建
			})
		} else {
			_this.setData({
				flag: true
			})
			prizes.forEach((val, index) => {
				if (val == this.data.honor.prize) {
					this.setData({
						prizeIndex: index
					})
				}
			})
		}
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
		//wx.request
		var _this = this;
		if (_this.data.flag) {
			event.emit('resumeChanged', {
				key: 'honors',
				value: _this.data.honor,
				event_type: 'change'
			})
		} else {
			event.emit('resumeChanged', {
				key: 'honors',
				value: _this.data.honor,
				event_type: 'add'
			})
		}
		wx.navigateBack({})
	},
	delete: function() {
		//wx.request
		var _this = this;
		event.emit('resumeChanged', {
			key: 'honors',
			value: {
				id: this.data.honor.id
			},
			event_type: 'delete'
		})
		wx.navigateBack({})
	},
})