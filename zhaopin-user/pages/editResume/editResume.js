var event = require('../../utils/event.js');

var app = getApp();

Page({
	data: {
		actionType: '', //0表示新建简历   1表示修改简历
		resume: {
			userInfo: {
				name: '林锐',
				sex: '男',
				city: '深圳',
				phone: '13728738411',
				birth: '1994-11-05',
				email: '670390939@qq.com',
				imgUrl: '',
				degree: '本科',
				school: '深圳大学',
				major: '软件工程'
			},
			skills: [],
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
			}],
			interships: [{
				id: '0',
				campany: '深圳云计算',
				job: '前端实习',
				startDate: '2016-06',
				endDate: '2016-09',
				description: '阿德块哈师大是看见和萨芬哈市客服哈啥时考司sadadasdasdasdadadada法奥斯卡的骄傲开始的急啊跨世纪的看看'
			}],
			projects: [{
				id: 0,
				name: '基于微信小程序的招聘系统开发',
				selfDuty: '前端开发',
				startDate: '2017-02',
				endDate: '至今',
				url: '',
				description: '阿德块哈师大是看见和萨芬哈市客服哈啥时考司sadadasdasdasdadadada法奥斯卡的骄傲开始的急啊跨世纪的看看'
			}],
			selfAssessment: '阿德块哈师大是看见和萨芬哈市客服哈啥时考司sadadasdasdasdadadada法奥斯卡的骄傲开始的急啊跨世纪的看看阿德块哈师大是看见和萨芬哈市客服哈啥时考司sadadasdasdasdadadada法奥斯卡的骄傲开始的急啊跨世纪的看看',
			honors: [{
				id: 0,
				date: '2011-06',
				name: 'xx竞赛',
				prize: '二等奖'
			}],
			// hope: {
			// 	name: '前端开发',
			// 	type: '全职',
			// 	city: '深圳',
			// 	salaryRange: '5k-10k',
			// 	otherDescription: '阿德块哈师大是看见和萨芬哈市客服哈啥时考司sadadasdasdasdadadada法奥斯卡的骄傲开始的急啊跨世纪的看看'
			// }
			hope: null
		},
		userInfoFromWX: {},
	},
	onLoad: function(options) {
		if (options.flag == 'true') {
			// 通过options.id  获取简历信息  设置app.globalData.editResume 
			this.setData({
				actionType: 1
			})
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
	toUserInfo: function() {
		wx.navigateTo({
			url: '../userInfo/userInfo'
		})
	},
	toEducation: function(e) {
		var flag = e.currentTarget.dataset.flag;

		if (flag == 'true') {
			wx.navigateTo({
				url: 'education/education?'
			})
		} else {
			wx.navigateTo({
				url: 'education/editEducation/editEducation'
			})
		}
		wx.navigateTo({
			url: 'education/education?'
		})
	},
	toIntership: function() {
		wx.navigateTo({
			url: 'intership/intership'
		})
	},
	toProject: function() {
		wx.navigateTo({
			url: 'project/project'
		})
	},
	toHonor: function() {
		wx.navigateTo({
			url: 'honor/honor'
		})
	},
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