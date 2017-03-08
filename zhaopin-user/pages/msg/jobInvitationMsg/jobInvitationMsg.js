Page({
	data: {
		pages: ['全部', '未处理', '已处理'],
		current: 0,
		sliderLeft: 0
	},
	onLoad() {
		let {
			windowWidth,
			windowHeight
		} = wx.getSystemInfoSync();
		let {
			pages
		} = this.data;
		this.setData({
			sliderLeft: windowWidth / pages.length,
			windowHeight: windowHeight,
			windowWidth: windowWidth
		})
	},
	changeIndicatorDots: function(e) {
		this.setData({
			indicatorDots: !this.data.indicatorDots
		})
	},
	changeAutoplay: function(e) {
		this.setData({
			autoplay: !this.data.autoplay
		})
	},
	intervalChange: function(e) {
		this.setData({
			interval: e.detail.value
		})
	},
	durationChange: function(e) {
		this.setData({
			duration: e.detail.value
		})
	},
	changeCurrent(e) {
		let {
			current
		} = this.data;
		current = parseInt(e.currentTarget.dataset.index);
		this.setData({
			current: current
		})
	},
	currentChanged(e) {
		let current = e.detail.current;
		this.setData({
			current: current
		})
	}
})