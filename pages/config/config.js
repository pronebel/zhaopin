const app = getApp();

Page({
	data: {
		config: {
			resumeOpen: true
		}
	},
	onload: function() {

	},
	resumeSwitchChange: function(e) {
		this.setData({
			'config.resumeOpen': e.detail.value
		})
	}
})