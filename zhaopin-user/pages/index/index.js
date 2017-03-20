var app = getApp();
const MENU_WIDTH_SCALE = 0.82;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 5;
const FAST_SPEED_EFF_Y = 50;
let $ = require('../../utils/util.js');
let {
	server
} = require('../../configs/serverConfig.js');
let event = require('../../utils/event.js');
Page({
	data: {
		scrollTop: 1,
		loading: false,
		ui: {
			windowWidth: 0,
			menuWidth: 0,
			offsetLeft: 0,
			tStart: true,
			offsetTop: 0,
		},
		setHope_job: false,
		hiddenLoader: true
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

		app.getUserInfoFromWX(function(data) {
			that.setData({
				userInfoFromWX: data
			})
		})
		app.getUserInfo((data) => {
			this.setData({
				userInfo: data
			})
			if (data.hope_job == 'null' || data.hope_job == 'undefined' || !data.hope_job) {
				this.setHope_job();
			} else {
				this.getIndexSearch();
			}
		})
	},
	confirm() {
		let {
			hope_job
		} = this.data.userInfo;
		if (hope_job == 'null' || hope_job == 'undefined' || !hope_job) {
			return;
		}
		$.ajax({
			url: `${server}/seeker/updateHope_job`,
			method: 'POST',
			data: {
				thirdSessionKey: app.globalData.session.thirdSessionKey,
				hope_job: hope_job
			}
		}).then((res) => {
			if (res.data) {
				this.setData({
					setHope_job: false,
				})
				wx.setStorageSync('userInfo', this.data.userInfo);
				app.globalData.userInfo = this.data.userInfo;
				this.getIndexSearch();
			}
		}).catch((error) => {
			console.log(error);
		})
	},
	input(e) {
		this.setData({
			'userInfo.hope_job': e.detail.value
		})
	},
	setHope_job() {
		this.setData({
			setHope_job: true
		})
	},
	getIndexSearch() {
		this.setData({
			loading: true,
			hiddenLoader: false
		})
		setTimeout(function() {
			$.ajax({
				url: `${server}/job/getIndexSearch`,
				data: {
					key: this.data.userInfo.hope_job
				}
			}).then((res) => {
				this.setData({
					jobList: res.data
				})
				app.hiddenLoader(this);
			})
		}.bind(this), 300)
	},
	onShow: function() {
		app.getCollectionLength((data) => {
			this.setData({
				collectionLength: data
			})
		})
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