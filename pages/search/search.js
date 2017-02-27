var app = getApp();

var $ = require('../../utils/util.js');

var items = require('../../configs/data_configs.js').items
Page({
	data: {
		workplaceCity: '',
		workplaceDistrict: '',
		searchHistory: [],
		jobList: [],
		animationData: {},
		handleHeight: '',
		active: ['#353535', '#353535', '#353535'],
		citycidx: [],
		hidden: [false, false, false],
		searchMsg: '',
		pickerViewValue: 0,
		searchSuggestions: [],
		showSuggestions: false,
		lower: 1,
		upper: 50,
		items: items,
		checkedValues: {
			educations: [],
			types: [],
			industry: []
		}
	},
	onLoad: function() {
		this.setData({
			searchHistory: wx.getStorageSync('searchHistory') || []
		})
	},
	onShow: function() { //这里用es6的箭头函数 this是window
		this.setData({
			workplaceCity: app.globalData.workplaceCity,
			workplaceDistrict: app.globalData.workplaceDistrict
		})

		//获取城市区县
		$.getDistrictByCityName(this.data.workplaceCity, app.globalData.cityList, this);

		var res = wx.getSystemInfoSync();
		this.setData({
			handleHeight: res.windowHeight - 48 - 38,
			areaHeight: (res.windowHeight - 48) / 3 * 2 - 38,
			windowHeight: res.windowHeight
		})
	},
	changeDistrict: function(e) {
		// const val = e.detail.value;
		// if (val == 0) { //选择是默认的全城市
		// 	this.setData({
		// 		workplaceDistrict: ''
		// 	})
		// 	return;
		// }
		// this.setData({
		// 	workplaceDistrict: this.data.citycidx[val - 1].fullname
		// })

		this.setData({
			pickerViewValue: e.detail.value
		})

	},
	handleAnimate: function(e) {
		const index = e.target.dataset.index;
		if (index == 1) {
			if (this.data.workplaceCity == '全国') {
				this.toChooseWorkPlace();
				return;
			}
			this.setData({
				hidden: [false, true, true],
				active: ['#888888', '#353535', '#353535'],
			})
		} else if (index == 2) {
			this.setData({
				hidden: [true, false, true],
				active: ['#353535', '#888888', '#353535']
			})
		} else {
			this.setData({
				hidden: [true, true, false],
				active: ['#353535', '#353535', '#888888']
			})
		}
		this.animate1(0);
	},
	animate1: function(top) {
		//create animation
		var animation = wx.createAnimation({
			duration: 400
		})

		animation.top(top).step();
		// if (this.data.hidden[0] || this.data.hidden[1] || this.data.hidden[2]) {
		// 	animation.top(0).step();
		// } else {
		// 	animation.top(-300).step();
		// }
		this.setData({
			animationData: animation.export()
		})
	},
	hideHandle: function() {
		const val = this.data.pickerViewValue - 1;
		var workplace = '';
		if (val == -1) {
			workplace = this.data.workplaceCity;
		} else {
			workplace = this.data.citycidx[val].fullname;
		}

		if (workplace != this.data.workplaceDistrict) {

			this.setData({
				workplaceDistrict: workplace
			})

			wx.setStorageSync('workplaceDistrict', workplace);
			app.globalData.workplaceDistrict = workplace;

			// ajax 更新list
			this.ajaxData();
		} else {
			this.setData({
				workplaceDistrict: workplace
			})
		}

		setTimeout(function() {
			this.setData({
				hidden: [false, false, false],
				active: ['#353535', '#353535', '#353535']
			})
		}.bind(this), 400)
		this.animate1(-400);
	},
	cancle: function() {
		if (this.data.jobList.length == 0) {
			wx.navigateBack({
				delta: 1
			})
		} else {
			this.setData({
				showSuggestions: false,
			})
		}

	},
	toChooseWorkPlace: () => {
		wx.navigateTo({
			url: '../workplace/workplace'
		})
	},
	clickBtnSearch: function(e) {
		const val = e.target.dataset.value;
		this.setData({
			searchMsg: val
		})

		// ajax 更新list
		this.ajaxData();
	},
	toSearch: function(e) {
		const val = e.detail.value;
		var str = val;
		if (str.replace(/\s/g, '') == '') {
			return;
		}

		this.setData({
			searchMsg: val
		})

		// ajax 更新list
		this.ajaxData();
	},
	ajaxData: function() {
		var arr = wx.getStorageSync('searchHistory') || [];
		var val = this.data.searchMsg;
		if ($.inArray(val, arr) == -1) {
			arr.unshift(this.data.searchMsg);
			wx.setStorageSync('searchHistory', arr);
		}
		this.setData({
			searchHistory: arr,
			showSuggestions: false,
		})
		this.setData({
			jobList: [{
				'searchMsg': 'java'
			}]
		})
	},
	complementSearch: function(e) {
		this.setData({
			searchMsg: e.target.dataset.complement
		})

		// ajax 更新list
		this.ajaxData();
	},
	keyInput: function(e) {
		this.setData({
			searchMsg: e.detail.value
		})

		if (e.detail.value == '') {
			this.setData({
				searchSuggestions: []
			})
		}
		//ajax get searchSuggestions
		this.setData({
			searchSuggestions: ['java', '前端']
		})
	},
	showSuggestions: function() {
		this.setData({
			showSuggestions: true
		})
	},
	changeLower: function(e) {
		this.setData({
			lower: e.detail.value
		})
	},
	changeUpper: function(e) {
		this.setData({
			upper: e.detail.value
		})
	},
	bindCheckbox: function(e) {
		/*绑定点击事件，将checkbox样式改变为选中与非选中*/

		//拿到下标值，以在items作遍历指示用
		var index = parseInt(e.currentTarget.dataset.index);
		var value = e.currentTarget.dataset.value;
		var items = this.data.items[value];
		//原始的icon状态
		var type = items[index].type;
		if (type == 'circle') {
			//未选中时
			items[index].type = 'success_circle';
		} else {
			items[index].type = 'circle';
		}

		var allItems = this.data.items;
		allItems[value] = items;
		// 写回经点击修改后的数组
		this.setData({
			items: allItems
		});
		// 遍历拿到已经勾选的值
		var checkedValues = this.data.checkedValues;
		checkedValues[value] = [];
		for (var i = 0; i < items.length; i++) {
			if (items[i].type == 'success_circle') {
				checkedValues[value].push(items[i].value);
			}
		}
		// 写回data，供提交到网络
		this.setData({
			checkedValues: checkedValues
		});
	},
	toJobDetail: function() {
		wx.navigateTo({
			url: '../jobDetail/jobDetail'
		})
	}
})