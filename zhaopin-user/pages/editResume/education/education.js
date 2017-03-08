var event = require('../../../utils/event.js');

Page({
	data: {
		resume: {
			educations: [{
				id: '0',
				endDate: '2017',
				school: '深圳大学',
				degree: '本科',
				major: '软件工程'
			}, {
				id: '1',
				endDate: '2017',
				school: '深圳大学',
				degree: '本科',
				major: '软件工程'
			}]
		}
	},
	onLoad: function() {
		//添加event 进行跨page通讯
		event.on('resumeChanged', this, event.cb.bind(this));
	},
	onUnload: function() {
		event.remove('resumeChanged', this);
	},
	toEditEducation: function(e) {
		if (e.currentTarget.dataset.flag == 'true') {
			wx.navigateTo({
				url: 'editEducation/editEducation?endDate=' + e.currentTarget.dataset.date + '&school=' + e.currentTarget.dataset.school + '&degree=' + e.currentTarget.dataset.degree + '&major=' + e.currentTarget.dataset.major + '&id=' + e.currentTarget.dataset.id
			})
		} else {
			wx.navigateTo({
				url: 'editEducation/editEducation'
			})
		}
	}
})