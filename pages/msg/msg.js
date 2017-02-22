var app=getApp();

Page({
	data:{
		
	},
	onLoad:function(){
		wx.getLocation({
			type: 'gcj02', //返回可以用于wx.openLocation的经纬度
			success: function(res) {
				var latitude = res.latitude
				var longitude = res.longitude
				wx.openLocation({
					latitude: latitude,
					longitude: longitude,
					scale: 16
				})
			}``
		})

		// wx.chooseLocation({
		// 	success:function(res){
		// 		console.log(res);
		// 	}
		// })
	}
})