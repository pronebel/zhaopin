const app = getApp();
let {
	server
} = require('../../configs/serverConfig');
let $ = require('../../utils/util.js');
let event = require('../../utils/util.js');
let loop = require('../../utils/event-loop.js');
let {
	ripple
} = require('../../utils/ripple.js');
Page({
	data: {
		star: false,
		STAR: false,
		resume_id: null,
		btnDisable: false,
		hadDelivered: false,
		ripple: {
			s1: ''
		}
	},
	onLoad: function(options) {
		let {
			id
		} = options;
		if (id == 'null' || id == 'undefined' || !id) {
			console.log('没有拿到id');
			return;
		}
		this.getJobDetail(id);
		this.isStar(id);
		this.hadDelivered(id);
		this.getResumesName();
		app.getUserInfoFromWX((data) => {
			this.setData({
				userInfoFromWX: data
			})
		})
		app.getUserInfo((data) => {
			this.setData({
				userInfo: data
			})
		})
		app.getConfig((data) => {
			this.setData({
				config: data
			})
		})
	},
	getJobDetail(id) {
		this.setData({
			loading: true,
			hiddenLoader: false
		})
		$.ajax({
			url: `${server}/job/getJobDetail`,
			data: {
				id: parseInt(id)
			}
		}).then((res) => {
			if (res.statusCode == 200) {
				if (res.data.campustalk.length > 1) {
					res.data.campustalk.sort((a, b) => {
						return a.date_time > b.date_time
					})
					let now = $.formatTime(new Date()).substring(0, 16);
					console.log(now);
					let flag = false;
					res.data.campustalk.map((val) => {
						if (val.date_time < now) {
							val.status = 'out_of_date';
						} else if (!flag) {
							flag = true;
							val.status = 'dead_line'
						} else {
							val.status = 'after_the_date'
						}
					})
				}
				this.setData({
					jobDetail: res.data
				})
			}
			app.hiddenLoader(this);
		})
	},
	isStar(id) {
		$.ajax({
			url: `${server}/collection/isStar`,
			data: {
				job_id: parseInt(id),
				openid: app.globalData.session.openid
			},
			method: 'GET'
		}).then((res) => {
			if (res.statusCode && res.statusCode == 200) {
				this.setData({
					star: res.data,
					STAR: res.data
				})
			}
		})
	},
	hadDelivered(id) {
		$.ajax({
			url: `${server}/resumeStatus/hadDelivered`,
			method: 'GET',
			data: {
				openid: app.globalData.session.openid,
				job_id: parseInt(id)
			}
		}).then((res) => {
			if (res.statusCode == 200 && res.data) {
				this.setData({
					btnDisable: true,
					hadDelivered: true
				})
			}
		})
	},
	star: function() {
		let {
			star,
			STAR
		} = this.data;
		this.setData({
			star: !star
		})
		loop.push('toggleStar', this, STAR, (STAR) => {
			if (this.data.star == STAR) {
				console.log('没有改变');
				return;
			}
			$.ajax({
				url: `${server}/collection/toggleStar`,
				data: {
					job_id: this.data.jobDetail.id,
					openid: app.globalData.session.openid,
					star: this.data.star
				},
				method: 'POST'
			}).then((res) => {
				if (res.statusCode && res.statusCode == 200) {
					let title = this.data.star ? '收藏成功' : '取消收藏成功';
					wx.showToast({
						title: title
					})
					this.setData({
						STAR: !STAR
					})
				}
			})
		}, 300)
	},
	openMap: function() {
		// const latitude = parseFloat(this.data.job.workplace.location.latitude);
		// const longitude = parseFloat(this.data.job.workplace.location.longitude);
		// wx.openLocation({
		// 	latitude: latitude,
		// 	longitude: longitude,
		// 	scale: 16
		// })
	},
	getResumesName() {
		$.ajax({
			url: `${server}/resume/getResumesName`,
			data: {
				openid: app.globalData.session.openid
			}
		}).then((res) => {
			this.setData({
				resumes: res.data,
			})
		})
	},
	showAction(cb) {
		let {
			resumes
		} = this.data
		let that = this;
		let _resumes = [];
		resumes.forEach((val) => {
			_resumes.push(val.name);
		})
		wx.showActionSheet({
			itemList: _resumes,
			success: function(res) {
				if (res.cancel) {
					return;
				}
				that.setData({
					resume_id: resumes[res.tapIndex].id,
					resume_name: resumes[res.tapIndex].name
				})
				typeof cb == 'function' && cb();
			}
		})
	},
	showModal() {
		let that = this;
		wx.showModal({
			title: `投递不可撤销,已选------${this.data.resume_name}`,
			content: '',
			success: function(res) {
				if (res.confirm) {
					that.deliver();
				}
			}
		})
	},
	judge(e) {
		if (this.data.btnDisable) {
			return;
		}
		ripple.call(this, e);
		let {
			config,
			resumes
		} = this.data;
		let resume_id = '';
		if (config.default_send_open) {
			//打开默认投递
			let defaultResumeId = wx.getStorageSync('defaultResumeId');
			if (defaultResumeId) {
				resumes.forEach((val) => {
					if (val.id == defaultResumeId) {
						this.setData({
							resume_id: defaultResumeId,
							resume_name: val.name
						})
					}
				})
			} else {
				this.showAction(this.showModal);
			}
		} else {
			this.showAction(this.showModal);
		}
	},
	deliver() {
		this.setData({
			btnDisable: true,
			sending: true
		})
		$.ajax({
			url: `${server}/resumeStatus/deliver`,
			method: 'POST',
			data: {
				deliver: JSON.stringify({
					job_id: this.data.jobDetail.id,
					seeker_id: app.globalData.session.openid,
					resume_id: this.data.resume_id,
					deliver_date_time: $.formatTime(new Date())
				})
			}
		}).then((res) => {
			if (res.statusCode === 200) {
				setTimeout(function() {
					this.setData({
						hadDelivered: true,
						sending: false
					})
				}.bind(this), 1000)
			} else {
				setTimeout(function() {
					this.setData({
						btnDisable: false,
						sending: false
					})
				}.bind(this), 1000)
			}
		}).catch((res) => {
			setTimeout(function() {
				this.setData({
					btnDisable: false,
					sending: false
				})
			}.bind(this), 1000)
		})
	}
})