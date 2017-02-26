var app = getApp();

Page({
	data: {
		userInfoFromWX: {},
		index: 0,
		resumes: [{
			name: '简历1',
			id: ''
		}, {
			name: '简历2',
			id: ''
		}]
	},
	onLoad: function() {
		this.setData({
			userInfoFromWX: app.globalData.userInfoFromWX
		})
	},
	toEditResume: function(e) {
		const flag = e.currentTarget.dataset.flag;
		var index = e.currentTarget.dataset.index;
		var id = flag == 'true' ? this.data.resumes[index].id : 0;
		var options = flag == 'true' ? 'flag=' + flag + '&id=' + id : 'flag=' + flag;
		wx.navigateTo({
			url: '../editResume/editResume?' + options
		});

	},
	setDefaultResume: function() {

	},
	bindPickerChange: function(e) {
		this.setData({
			index: e.detail.value
		})
	}
})