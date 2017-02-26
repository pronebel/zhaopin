const app = getApp();

Page({
	data: {
		config: {
			resumeOpen: true,
			defaultSend: true
		}
	},
	onload: function() {

	},
	resumeSwitchChange: function(e) {
		this.setData({
			'config.resumeOpen': e.detail.value
		})
	},
	defaultSendSwitchChange: function(e) {
		this.setData({
			'config.defaultSend': e.detail.value
		})
	}
})