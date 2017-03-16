const event = require('../../utils/event.js');
const $ = require('../../utils/util.js');
const {
	server
} = require('../../configs/serverConfig.js');
let app = getApp();

Page({
	data: {
		actionType: '', //0表示新建简历   1表示修改简历
	},
	onLoad: function(options) {
		if (options.flag == 'true') {
			this.setData({
				actionType: 1,
			})

			// 通过options.id  获取简历信息
			this.getResume(options.id);
		} else {
			//新建简历
			this.setData({
				actionType: 0
			})
			wx.setNavigationBarTitle({
				title: '新建简历'
			})
		}
		app.getUserInfo((data) => {
			this.setData({
				userInfo: data
			})
		})
		app.getUserInfoFromWX((data) => {
			this.setData({
				userInfoFromWX: data
			})
		})

		//添加event 进行跨page通讯
		event.on('resumeChanged', this, event.cb.bind(this));
	},
	onShow: function() {

	},
	onUnload: function() {
		event.remove('resumeChanged', this);
	},
	getResume(id) {
		let _this = this;
		$.ajax({
			url: `${server}/resume/getResume`,
			data: {
				id: id
			}
		}).then((res) => {
			if (res.data) {
				_this.setData({
					resume: res.data
				})
			}
		})
	},
	toUserInfo: function() {
		wx.navigateTo({
			url: '../userInfo/userInfo'
		})
	},
	gotoPage(e) {
		let {
			flag,
			url,
		} = e.currentTarget.dataset;
		let resume_id = this.data.resume.id;
		if (flag == 'true') {
			wx.navigateTo({
				url: `${url}?resume_id=${resume_id}`
			})
		} else {
			wx.navigateTo({
				url: `${url}?resume_id=${resume_id}&flag=false`
			})
		}
	},
	// toEducation: function(e) {
	// 	let flag = e.currentTarget.dataset.flag;

	// 	if (flag == 'true') {
	// 		wx.navigateTo({
	// 			url: `education/education?resume_id=${this.data.resume.id}`
	// 		})
	// 	} else {
	// 		wx.navigateTo({
	// 			url: `education/editEducation/editEducation?resume_id=${this.data.resume.id}&flag=false`
	// 		})
	// 	}
	// },
	toSelfAssessment: function(e) {
		wx.navigateTo({
			url: 'selfAssessment/selfAssessment?msg=' + e.currentTarget.dataset.msg
		})
	},
	toHope: function(e) {
		const hope = this.data.resume.hope;
		hope && wx.navigateTo({
			url: 'hope/hope?name=' + hope.name + '&type=' + hope.type + '&city=' + hope.city + '&salaryRange=' + hope.salaryRange + '&otherDescription=' + hope.otherDescription
		});
		!hope && wx.navigateTo({
			url: 'hope/hope'
		})
	}
})