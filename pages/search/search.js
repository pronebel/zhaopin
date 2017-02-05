var app=getApp();

Page({
	data:{
		workplace:''
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
	onShow:function(){  //这里用es6的箭头函数 this是window
		console.log('onShow');
		this.setData({
			workplace:app.globalData.workplace
		})
	},
})