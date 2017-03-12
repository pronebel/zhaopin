// pages/config/config.js
const app = getApp();

Page({
	data: {
		config: {
			defaultSend: false
		}
	},
	onload: function() {

	},
	unDisturbChange: function(e) {
		this.setData({
			'config.unDisturb': e.detail.value
		})
	}
})