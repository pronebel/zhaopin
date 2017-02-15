var app = getApp();

Page({
	data: {
		userInfoFromWX: {},
		array: ['简历1', '简历2'],
		index: 0
	},
	onLoad: function() {
		this.setData({
			userInfoFromWX: app.globalData.userInfoFromWX
		})
	},
	setDefaultResume: function() {

	},
	bindPickerChange: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	}
})