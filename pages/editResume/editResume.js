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
			}],
			interships: [{
				campany: '深圳云计算',
				job: '前端实习',
				startDate: '2016-06',
				endDate: '2016-09',
				description: '阿德块哈师大是看见和萨芬哈市客服哈啥时考司sadadasdasdasdadadada法奥斯卡的骄傲开始的急啊跨世纪的看看'
			}],
			projects: [{
				name: '基于微信小程序的招聘系统开发',
				selfDuty: '前端开发',
				startDate: '2017-02',
				endDate: '至今',
				description: '阿德块哈师大是看见和萨芬哈市客服哈啥时考司sadadasdasdasdadadada法奥斯卡的骄傲开始的急啊跨世纪的看看'
			}],
			selfAssessment: '阿德块哈师大是看见和萨芬哈市客服哈啥时考司sadadasdasdasdadadada法奥斯卡的骄傲开始的急啊跨世纪的看看阿德块哈师大是看见和萨芬哈市客服哈啥时考司sadadasdasdasdadadada法奥斯卡的骄傲开始的急啊跨世纪的看看',
			honor: [{
				date: '2011-06',
				name: 'xx竞赛',
				prize: '二等奖'
			}],
			hope: [{
				name: '前端开发',
				type: '全职',
				city: '深圳',
				salaryLower: '5k',
				salaryUpper: '10k',
				otherDescription: '阿德块哈师大是看见和萨芬哈市客服哈啥时考司sadadasdasdasdadadada法奥斯卡的骄傲开始的急啊跨世纪的看看'
			}]
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
		this.setData({
			userInfoFromWX: app.globalData.userInfoFromWX
		})

		//添加event 进行跨page通讯
		event.on('resumeChanged', this, (data) => {
			// this.setData({
			// 	'resume[data.key]':data.value
			// })
			var _resume = this.data.resume;
			if (data.key == 'userInfo') {
				_resume[data.key] = data.value;
				this.setData({
					resume: _resume
				})
			} else if (data.key == 'education') {
				_resume.educations.forEach((val, index) => {
					if (val.id == data.value.id) {
						var _educations = _resume.educations;
						_educations[index] = data.value;
						this.setData({
							'resume.educations': _educations
						})
					}
				})
			}
		})

		event.on('resumeDeleted', this, (data) => {
			var _resume = this.data.resume;
			if (data.key == 'education') {
				var _educations = _resume.educations;
				_educations.forEach((val, index) => {
					if (val.id == data.value.id) {
						_educations.splice(index, 1);
						this.setData({
							'resume.educations': _educations
						})
					}
				})
			}
		})
	},
	onShow: function() {
		console.log(this.data.resume.educations);
	},
	onUnload: function() {
		event.remove('resumeChanged', this);
		event.remove('resumeDeleted', this);
	},
	toUserInfo: function() {
		wx.navigateTo({
			url: '../userInfo/userInfo'
		})
	},
	toEducation: function() {
		wx.navigateTo({
			url: 'education/education'
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
	}
})