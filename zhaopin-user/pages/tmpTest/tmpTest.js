// pages/tmpTest/tmpTest.js
Page({
  data:{
    message: "for test"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    // utils.ajax发起网络连接
			$.ajax({
				url: `${server}/job/getIndexSearch`,
				method: 'POST',
				data: {
          // TODO: this.data.userInfo.hope_job 等参数要设为有效值作调试。
					key: this.data.userInfo.hope_job,
					startIndex: flag ? (this.data.jobList || []).length : 0,
					limitCount: parseInt(this.data.limitCount)
				} // Promise 类的的then 方法是回事呢？
			}).then((res) => {
				if (res.statusCode == 200) { // ?res.statusCode?
					if (flag) { // what flag ？？
						let {
							jobList
						} = this.data;
						this.setData({
							jobList: jobList.concat(res.data)
						})
					} else {
						this.setData({
							message: res.data
						})
					}
					this.setData({
						searched: true
					})
					if (res.data.length < 10) {
						this.setData({
							dataLimit: true
						})
					}
					//typeof cb == 'function' && cb();
				}
				app.hiddenLoader(this);
			})
		}.bind(this);
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})