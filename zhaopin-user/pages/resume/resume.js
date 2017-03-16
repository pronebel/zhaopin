var app = getApp();
let event = require('../../utils/event.js');
let $ = require('../../utils/util.js');
const {
	server
} = require('../../configs/serverConfig.js');

Page({
	data: {
		userInfoFromWX: {},
		index: 0,
		changeResumeName: false
	},
	onLoad: function() {
		app.getUserInfoFromWX((data) => {
			this.setData({
				userInfoFromWX: data
			})
		})
		let defaultResumeId = wx.getStorageSync('defaultResumeId');
		this.setData({
			defaultResumeId: defaultResumeId
		})
		this.getResumesName();
	},
	getResumeName(resume_id) {
		if (!resume_id) return '';
		let name = '';
		this.data.resumes.forEach((val, index) => {
			if (val.id == resume_id) {
				name = this.data.resumes[index].name;
			}
		})
		return name;
	},
	getResumesName() {
		let _this = this;
		$.ajax({
			url: `${server}/resume/getResumesName`,
			data: {
				thirdSessionKey: app.globalData.session.thirdSessionKey
			}
		}).then((res) => {
			_this.setData({
				resumes: res.data,
			})
			_this.setData({
				defaultResumeName: _this.getResumeName(this.data.defaultResumeId)
			})

		})
	},
	toEditResume: function(e) {
		let {
			flag,
			id
		} = e.currentTarget.dataset;
		let options = `flag=${flag}&id=${id}`;
		wx.navigateTo({
			url: '../editResume/editResume?' + options
		});
	},
	setDefaultResume: function() {

	},
	bindPickerChange: function(e) {
		let index = e.detail.value;
		console.log(index);
		this.setData({
			index: index,
			defaultResumeId: this.data.resumes[index].id,
			defaultResumeName: this.getResumeName(this.data.resumes[index].id)
		})
		wx.setStorageSync('defaultResumeId', this.data.resumes[index].id)
	},
	cancel() {
		this.setData({
			changeResumeName: false
		})
	},
	confirm() {
		if (!this.data.newResumeName) {
			wx.showToast({
				icon: 'warn',
				title: '名字不能为空'
			})
		} else {
			$.ajax({
				url: `${server}/resume/changeResumeName`,
				method: 'POST',
				data: {
					id: this.data.actionResumeId,
					name: this.data.newResumeName
				}
			}).then((res) => {
				if (res.data) {
					let {
						resumes,
						actionIndex
					} = this.data;
					resumes[actionIndex].name = this.data.newResumeName;
					this.setData({
						resumes: resumes,
						changeResumeName: false,
						actionIndex: '',
						actionResumeId: '',
						newResumeName: '',
						defaultResumeName: this.getResumeName(this.data.defaultResumeId)
					})
					wx.showToast({
						title: '修改成功',
						icon: 'success'
					})
				}
			})
		}
	},
	inputNewResumeName(e) {
		let newResumeName = e.detail.value;
		this.setData({
			newResumeName: newResumeName
		})
	},
	newResume() {
		if (this.data.resumes.length >= 5) {
			wx.showToast({
				title: '您的简历个数已达上限!'
			})
			return;
		}
		$.ajax({
			url: `${server}/resume/addResume`,
			method: 'POST',
			data: {
				thirdSessionKey: app.globalData.session.thirdSessionKey,
				name: '简历'
			}
		}).then((res) => {
			if (res.data) {
				let {
					resumes
				} = this.data;
				resumes.push(res.data);
				this.setData({
					resumes: resumes
				})
				let flag = true;
				let options = `flag=${flag}&id=${res.data.id}`;
				wx.navigateTo({
					url: '../editResume/editResume?' + options
				});
			}
		})
	},
	openActionSheet(e) {
		let _this = this;
		let {
			id,
			index
		} = e.currentTarget.dataset;
		wx.showActionSheet({
			itemList: ['修改简历名称', '删除简历'],
			success: function(res) {
				let {
					tapIndex
				} = res;
				if (tapIndex == 0) {
					_this.setData({
						changeResumeName: true,
						actionResumeId: id,
						actionIndex: index,
						actionResumeName: _this.getResumeName(id)
					})
				} else {
					$.ajax({
						url: `${server}/resume/deleteResume`,
						method: 'POST',
						data: {
							id: id
						}
					}).then((res) => {
						if (res.data) {
							let {
								resumes
							} = _this.data;
							resumes.splice(index, 1);
							_this.setData({
								resumes: resumes
							})
							wx.showToast({
								title: '删除成功'
							})
						}
					})
				}
			}
		})
	}
})