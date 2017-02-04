var app=getApp();

Page({
	data:{
		
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
	}
})