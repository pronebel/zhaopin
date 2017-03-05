var app = getApp();
const MENU_WIDTH_SCALE = 0.82;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 5;
const FAST_SPEED_EFF_Y = 50;
Page({
	data: {
		scrollTop: 1,
		ui: {
			windowWidth: 0,
			menuWidth: 0,
			offsetLeft: 0,
			tStart: true,
			offsetTop: 0,
		},
		jobList: [{
			name: '前端',
			salary: '8-10k',
			campany: 'xxx公司',
			city: '深圳',
			degree: '本科',
			scale: '100-500人',
			type: '移动互联网',
			releaseDate: '01月11日'
		}, {
			name: '前端',
			salary: '8-10k',
			campany: 'xxx公司',
			city: '深圳',
			degree: '本科',
			scale: '100-500人',
			type: '移动互联网',
			releaseDate: '01月11日'
		}, {
			name: '前端',
			salary: '8-10k',
			campany: 'xxx公司',
			city: '深圳',
			degree: '本科',
			scale: '100-500人',
			type: '移动互联网',
			releaseDate: '01月11日'
		}, {
			name: '前端',
			salary: '8-10k',
			campany: 'xxx公司',
			city: '深圳',
			degree: '本科',
			scale: '100-500人',
			type: '移动互联网',
			releaseDate: '01月11日'
		}],
		userInfo: {
			imgUrl: '',
			name: '林锐'
		},
		hope: {
			city: '深圳',
			job: '前端开发'
		}
	},
	navigateTo(e) {
		console.log(e.currentTarget.dataset.url);
		wx.navigateTo({
			url: e.currentTarget.dataset.url
		})
	},
	toSearch: () => {
		wx.navigateTo({
			url: '../search/search'
		})
	},
	onLoad: function() {
		var that = this
		try {
			let res = wx.getSystemInfoSync()
			this.windowWidth = res.windowWidth;
			this.data.ui.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
			this.data.ui.offsetLeft = 0;
			this.data.ui.windowWidth = res.windowWidth;
			this.setData({
				ui: this.data.ui,
				windowHeight: res.windowHeight
			})
		} catch (e) {}

		app.getUserInfo(function(data) {
			that.setData({
				userInfoFromWX: data
			})
		})

		//todo 获取用户信息
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
	},
	handlerStart(e) {
		let {
			clientX,
			clientY
		} = e.touches[0];
		this.tapStartX = clientX;
		this.tapStartY = clientY;
		this.tapStartTime = e.timeStamp;
		this.startX = clientX;
		this.startY = clientY;
		this.data.ui.tStart = true;
		this.setData({
			ui: this.data.ui
		})
	},
	handlerMove(e) {
		let {
			clientX,
			clientY
		} = e.touches[0];
		let {
			ui
		} = this.data;
		let offsetX = this.startX - clientX;
		let offsetY = this.startY - clientY;
		this.startY = clientY;
		this.startX = clientX;
		if (Math.abs(offsetY) * 1.5 > Math.abs(offsetX))
			return;
		ui.offsetLeft -= offsetX;
		// ui.offsetTop -= offsetY;
		if (ui.offsetLeft <= 0) {
			ui.offsetLeft = 0;
		} else if (ui.offsetLeft >= ui.menuWidth) {
			ui.offsetLeft = ui.menuWidth;
		}
		this.setData({
			ui: ui
		})
	},
	handlerEnd(e) {
		this.data.ui.tStart = false;
		this.setData({
			ui: this.data.ui
		})
		let {
			ui
		} = this.data;
		let {
			clientX,
			clientY
		} = e.changedTouches[0];
		let endTime = e.timeStamp;
		let offsetX = this.startX - clientX;
		let offsetY = this.startY - clientY;
		if (Math.abs(offsetY) * 1.5 > Math.abs(offsetX))
			return;
		//快速滑动
		if (endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
			//向左
			if (this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
				ui.offsetLeft = 0;
			} else if (this.tapStartX - clientX < -FAST_SPEED_DISTANCE && Math.abs(this.tapStartY - clientY) < FAST_SPEED_EFF_Y) {
				ui.offsetLeft = ui.menuWidth;
			} else {
				if (ui.offsetLeft >= ui.menuWidth / 2) {
					ui.offsetLeft = ui.menuWidth;
				} else {
					ui.offsetLeft = 0;
				}
			}
		} else {
			if (ui.offsetLeft >= ui.menuWidth / 2) {
				ui.offsetLeft = ui.menuWidth;
			} else {
				ui.offsetLeft = 0;
			}
		}
		this.setData({
			ui: ui
		})
	},
	shadowcatch: function() {
		return;
	},
	showScan: function() {
		wx.scanCode({
			success: function(res) {
				console.log(res);
			}
		})
	},
	handlerPageTap(e) {
		let {
			ui
		} = this.data;
		if (ui.offsetLeft != 0) {
			ui.offsetLeft = 0;
			this.setData({
				ui: ui
			})
		}
	},
	showBars(e) {
		this.setData({
			'ui.offsetLeft': 1
		})
		setTimeout(function() {
			let {
				ui
			} = this.data;
			if (ui.offsetLeft == 1) {
				ui.offsetLeft = ui.menuWidth;
				this.setData({
					ui: ui
				})
			}
		}.bind(this), 30)
	}
})