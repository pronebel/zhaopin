const app = getApp();
let {
	server
} = require('../../configs/serverConfig');
let $ = require('../../utils/util.js');
let event = require('../../utils/util.js');
let loop = require('../../utils/event-loop.js');
Page({
	data: {
		job: {
			careertalk: [{
				school: '深圳大学',
				date: '2017-02-20',
				time: '13:00'
			}],
			duties: ['负责基于TCP/IP协议的数据上报server实现和调优', '负责基于TCP/IP协议的数据上报server实现和调优', '负责基于TCP/IP协议的数据上报server实现和调优', '负责基于TCP/IP协议的数据上报server实现和调优', '负责基于TCP/IP协议的数据上报server实现和调优'],
		},
		star: false,
		STAR: false
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
				job_id: id,
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
	}

})