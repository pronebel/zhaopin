const app = getApp();

Page({
	data: {
		scaned: true,
		logined: true
	},
	onLoad(options) {
		if (options.uid) {
			this.setData({
				scaned: true
			})
			console.log(options.uid)
		} else {

		}
	},
	showScan() {
		wx.scanCode({
			success: function(res) {
				if (res.result) {
					try {
						let {
							uid,
							action
						} = JSON.parse(res.result);
						if (action == 'pc') {
							wx.navigateTo({
								url: `../editResume/scanCode/scanCode?uid=${uid}`
							})
						}
					} catch (e) {
						console.log(e);
					}
				}
			}
		})
	},
	cancel() {
		wx.navigateBack({});
	}
})