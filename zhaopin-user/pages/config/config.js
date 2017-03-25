const app = getApp();
let $ = require('../../utils/util.js');
let {
	server
} = require("../../configs/serverConfig.js");
Page({
	data: {},
	onLoad: function() {
		this.getConfig();
	},
	getConfig() {
		app.getConfig((data) => {
			this.setData({
				config: data
			})
		})
	},
	switchChange(e) {
		let {
			key
		} = e.currentTarget.dataset;
		let {
			value
		} = e.detail;
		let {
			config
		} = this.data;
		config[key] = value;
		this.setData({
			config: config
		})
		this.updateConfig();
	},
	updateConfig() {
		let {
			config
		} = this.data
		$.ajax({
			url: `${server}/config/updateConfig`,
			method: 'POST',
			data: {
				thirdSessionKey: app.globalData.thirdSessionKey,
				config: JSON.stringify(config)
			}
		}).then((res) => {
			if (res.statusCode == 200 && res.data) {
				app.globalData.config = config;
				wx.setStorageSync('config', config);
			}
		})
	}
})