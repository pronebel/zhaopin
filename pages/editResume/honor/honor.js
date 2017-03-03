var event = require('../../../utils/event.js');

Page({
	data: {
		resume: {
			honors: [{
				id: 0,
				date: '2011-06',
				name: 'xx竞赛',
				prize: '二等奖'
			}]
		}
	},
	onLoad: function() {
		event.on('resumeChanged', this, event.cb.bind(this));
	},
	onUnload: function() {
		event.remove('resumeChanged', this);
	},
	toEditHonor: function(e) {
		if (e.currentTarget.dataset.flag == 'true') {
			wx.navigateTo({
				url: 'editHonor/editHonor?date=' + e.currentTarget.dataset.date + '&name=' + e.currentTarget.dataset.name + '&prize=' + e.currentTarget.dataset.prize + '&id=' + e.currentTarget.dataset.id
			})
		} else {
			wx.navigateTo({
				url: 'editHonor/editHonor'
			})
		}
	}
})