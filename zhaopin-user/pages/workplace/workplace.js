const app = getApp();

Page({
	data: {
		workplaceCity: ''
	},
	onLoad: function() {
		// this.setData({
		// 	workplaceCity: app.globalData.workplaceCity
		// })
		app.getWorkplace((data) => {
			this.setData({
				workplaceCity: data
			})
		})
	},
	goBack: () => {
		wx.navigateBack({
			delta: 1
		})
	},
	selectPlace: function(e) {
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
	}
})