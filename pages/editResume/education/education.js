var event = require('../../../utils/event.js');

Page({
	data: {
		educations: [{
			id: '1',
			endDate: '2017',
			school: '深圳大学',
			degree: '本科',
			major: '软件工程'
		}, {
			id: '2',
			endDate: '2017',
			school: '深圳大学',
			degree: '本科',
			major: '软件工程'
		}]
	},
	onLoad: function() {
		var _this = this;
		event.on('resumeChanged', this, function(data) {
			if (data.key != 'education') {
				return;
			} else {
				_this.data.educations.forEach((val, index) => {
					if (val.id == data.value.id) {
						var _educations = this.data.educations;
						_educations[index] = data.value;
						this.setData({
							educations: _educations
						})
					}
				})
			}
		})
		event.on('resumeDeleted', this, function(data) {
			if (data.key != 'education') {
				return;
			} else {
				var _educations = this.data.educations;
				_educations.forEach((val, index) => {
					if (val.id == data.value.id) {
						_educations.splice(index, 1);
						this.setData({
							educations: _educations
						})
					}
				})
			}
		})
	},
	onUnload: function() {
		event.remove('resumeChanged', this);
		event.remove('resumeDeleted', this);
	},
	toEditEducation: function(e) {
		console.log(e.currentTarget);
		wx.navigateTo({
			url: 'editEducation/editEducation?endDate=' + e.currentTarget.dataset.date + '&school=' + e.currentTarget.dataset.school + '&degree=' + e.currentTarget.dataset.degree + '&major=' + e.currentTarget.dataset.major + '&id=' + e.currentTarget.dataset.id
		})
	}
})