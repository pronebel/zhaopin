const app = getApp();
let event = require('../../utils/event.js');

Page({
	data: {

	},
	onLoad: function(options) {
		if (options.city || options.city == '') {
			this.setData({
				workplaceCity: options.city,
				flag: false //如果是个人信息的选择城市 为false
			})
		} else {
			app.getWorkplace((data) => {
				this.setData({
					workplaceCity: data,
					flag: true
				})
			})
		}
		console.log(this.data.workplaceCity == null)
	},
	goBack: () => {
		wx.navigateBack({
			delta: 1
		})
	},
	selectPlace: function(e) {
		if (this.data.flag) {
			this.setData({
				workplaceCity: e.target.dataset.place
			})
			if (app.globalData.workplaceCity != this.data.workplaceCity) {
				console.log('change place');
				app.globalData.workplaceCity = this.data.workplaceCity;
				wx.setStorageSync('workplaceCity', app.globalData.workplaceCity);
				app.globalData.workplaceDistrict = this.data.workplaceCity;
				wx.setStorageSync('workplaceDistrict', app.globalData.workplaceDistrict);
			}
		} else {
			this.setData({
				workplaceCity: e.target.dataset.place
			})
			event.emit('cityChanged', {
				city: this.data.workplaceCity
			})
		}
	}
})