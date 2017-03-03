const app = getApp();
const event = require('../../../utils/event.js');

Page({
	data: {
		selfAssessment: '',
		maxlength: 1000
	},
	onLoad: function(options) {
		this.setData({
			selfAssessment: options.msg,
			windowHeight: wx.getSystemInfoSync().windowHeight
		})
	},
	textareaInput: function(e) {
		this.setData({
			selfAssessment: e.detail.value
		})
	},
	save: function() {
		//wx.request
		var _this = this;
		event.emit('resumeChanged', {
			key: 'selfAssessment',
			value: this.data.selfAssessment,
			event_type: 'change'
		})
		wx.navigateBack({})
	}
})