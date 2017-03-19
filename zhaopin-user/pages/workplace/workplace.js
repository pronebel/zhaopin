const app = getApp();
let event = require('../../utils/event.js');

Page({
	data: {

	},
	onLoad: function(options) {
		let {
			flag,
			city
		} = options;
		this.setData({
			flag: flag
		})

		if (city == 'undefined' || city == 'null' || !city) {
			this.setData({
				workplaceCity: ''
			})
		} else {
			this.setData({
				workplaceCity: city
			})
		}
	},
	goBack: () => {
		wx.navigateBack({})
	},
	selectPlace: function(e) {
		this.setData({
			workplaceCity: e.target.dataset.place
		})
		let {
			flag,
			workplaceCity
		} = this.data;
		if (flag == 'hope_city') {
			event.emit('hope_city_changed', {
				city: workplaceCity
			})
			console.log(1);
			return;
		} else if (flag == 'userInfo_city') {
			event.emit('cityChanged', {
				city: workplaceCity
			})
		} else if (flag == 'search_city') {
			if (app.globalData.workplaceCity != this.data.workplaceCity) {
				console.log('change place');
				app.globalData.workplaceCity = this.data.workplaceCity;
				wx.setStorageSync('workplaceCity', app.globalData.workplaceCity);
				app.globalData.workplaceDistrict = this.data.workplaceCity;
				wx.setStorageSync('workplaceDistrict', app.globalData.workplaceDistrict);
			}
		}
	}
})