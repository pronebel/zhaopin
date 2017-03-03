var event = require('../../../utils/event.js');

Page({
	data: {
		resume: {
			projects: [{
				id: '0',
				name: '基于微信小程序的招聘系统开发',
				selfDuty: '前端开发',
				startDate: '2017-02',
				endDate: '至今',
				url: '',
				description: '阿德块哈师大是看见和萨芬哈市客服哈啥时考司sadadasdasdasdadadada法奥斯卡的骄傲开始的急啊跨世纪的看看'
			}]
		}
	},
	onLoad: function() {
		event.on('resumeChanged', this, event.cb.bind(this));
	},
	onUnload: function() {
		event.remove('resumeChanged', this);
	},
	toEditProject: function(e) {
		if (e.currentTarget.dataset.flag == 'true') {
			wx.navigateTo({
				url: 'editProject/editProject?endDate=' + e.currentTarget.dataset.endDate + '&startDate=' + e.currentTarget.dataset.startDate + '&name=' + e.currentTarget.dataset.name + '&selfDuty=' + e.currentTarget.dataset.selfDuty + '&description=' + e.currentTarget.dataset.description + '&id=' + e.currentTarget.dataset.id
			})
		} else {
			wx.navigateTo({
				url: 'editProject/editProject'
			})
		}
	}
})