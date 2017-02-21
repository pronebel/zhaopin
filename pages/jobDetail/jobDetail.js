const app = getApp();

Page({
	data: {
		job: {
			jobName: 'C++开发工程师',
			salary: '15k-20k',
			company: {
				short: '爱奇艺',
				full: '北京爱奇艺科技有限公司',
				type: '金融',
				financle: '不需要融资',
				scale: '2000人以上'
			},
			workplace: {
				province: '广东',
				city: '深圳',
				county: '南山区',
				full: '广东省深圳市南山区高新科技园创维半导体大厦'
			},
			duties: ['负责基于TCP/IP协议的数据上报server实现和调优', '负责基于TCP/IP协议的数据上报server实现和调优', '负责基于TCP/IP协议的数据上报server实现和调优', '负责基于TCP/IP协议的数据上报server实现和调优', '负责基于TCP/IP协议的数据上报server实现和调优'],
			internshipLimit: '没要求',
			degreeLimit: '本科',
			campanyScale: '2000人以上',
			companyType: 'D轮及以上',
			releaseDate: '2017-02-18',
			workType: '全职',
			welfare: ['六险一金', '免费下午茶', '免费下午茶', '免费下午茶', '免费下午茶', '免费下午茶', '免费下午茶']
		},
		star: false
	},
	onLoad: function() {
		//getDetail
	},
	star: function() {
		var star = this.data.star;
		this.setData({
			star: !star
		})
		var title = star ? '取消收藏成功!' : '收藏成功!';
		wx.showToast({
			title: title,
			icon: 'success',
			duration: 1500
		})
	}

})