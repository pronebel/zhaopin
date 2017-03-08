var app=getApp();

Page({
	data:{
		workplace:'',
		jobName:''
	},
	onLoad:function(options){		
		this.setData({
			jobName:options.jobName,
			workplace:app.globalData.workplace
		})

		//发送请求，获取搜索结果
		// wx.request({
		// 	url:''
		// })

	},
	onReady:function(){
		
	},
	onShow:function(){  //这里用es6的箭头函数 this是window

	},
	onHide:function(){
		
	},
	onUnload:function(){
		
	},
	onPullDownRefresh:function(){
		
	},
	onReachBottom:function(){
		
	}
})		