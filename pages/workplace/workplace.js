var app=getApp();

Page({
	data:{
		workplace:''
	},
	onLoad:function(){
		this.setData({
			workplace:app.globalData.workplace
		})
	},
	goBack:()=>{
		wx.navigateBack({
  			delta: 1
		})
	},
	selectPlace:function(e){
		this.setData({
			workplace:e.target.dataset.place
		})
		app.globalData.workplace=this.data.workplace;
		wx.setStorageSync('workplace',app.globalData.workplace);
	}
})