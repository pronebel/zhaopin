var event = require('../../../utils/event.js');

Page({
	data: {
		resume: {
			interships: [{
				id: '0',
				campany: '深圳云计算',
				job: '前端实习',
				startDate: '2016-06',
				endDate: '2016-09',
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
	toEditIntership: function(e) {
		if (e.currentTarget.dataset.flag == 'true') {
			wx.navigateTo({
				url: 'editIntership/editIntership?endDate=' + e.currentTarget.dataset.endDate + '&startDate=' + e.currentTarget.dataset.startDate + '&campany=' + e.currentTarget.dataset.campany + '&job=' + e.currentTarget.dataset.job + '&description=' + e.currentTarget.dataset.description + '&id=' + e.currentTarget.dataset.id
			})
		} else {
			wx.navigateTo({
				url: 'editIntership/editIntership'
			})
		}
	}
})