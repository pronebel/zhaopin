Page({
	data: {
		resumeMsg: [1],
		jobInvitationMsg: ['1'],
		seenMsg: [2, 2, 3, 3]
	},
	onLoad() {
		//获取消息

	},
	getMsg() {
		//wx.request
	},
	navigateTo(e) {
		wx.navigateTo({
			url: e.currentTarget.dataset.url
		})
	}
})