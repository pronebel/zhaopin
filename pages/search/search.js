var app=getApp();

Page({
	data:{
		workplace:'',
		jobName:'',
		jobList:[]
	},
	onShow:function(){  //这里用es6的箭头函数 this是window
		console.log('onShow');
		this.setData({
			workplace:app.globalData.workplace
		})
	},
	goBack:()=>{
		wx.navigateBack({
  			delta: 1
		})
	},
	toChooseWorkPlace:()=>{
		wx.navigateTo({
			url:'../workplace/workplace'
		})
	},
	toSearch:function(e){
		// wx.navigateTo({
		// 	url:'../searchResult/searchResult?jobName='+this.data.jobName
		// })
		// wx.request({
		// 	url:''
		// })
		this.setData({
			jobName:e.details.value
		})
	},
	complementSearch:function(e){
		this.setData({
			jobName:e.target.dataset.complement
		})
		console.log(e.target.dataset.complement);
	},
	keyInput:function(e){
		this.setData({
			jobName:e.detail.value
		})
	}
})