var app = getApp();

Page({
	data: {

	},
	toSearch: () => {
		wx.navigateTo({
			url: '../search/search'
		})
	},
	onLoad: function() {
		var that = this

	},
	touchmove: function(e) {
		console.log(e);
	},
	touchend: function(e) {
		console.log(e);
	},
	toJobDetail: function() {
		wx.navigateTo({
			url: '../jobDetail/jobDetail'
		})
	},
	longtapHandle: function() {
		wx.showActionSheet({
			itemList: ['不感兴趣', '收藏'],
			itemColor: '#353535',
			success: function() {
				wx.showToast({
					title: '操作成功',
					icon: 'success'
				})
			}
		})
	}
})