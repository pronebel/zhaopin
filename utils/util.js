function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n
}

function getLocationAddress(app){
  wx.getLocation({
      success:function(res){
        var location=res.latitude+','+res.longitude;
        wx.request({
          url: 'http://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            location:location,
            key:'7YHBZ-KIT3W-R5BRE-RNQUQ-NAOCE-M7BVE'
          },
          method: 'GET', 
          success: function(res){
            app.globalData.location=res.data.result.address_component.city.substring(0,res.data.result.address_component.city.length-1);
            //默认期待工作地点为当地
            if(app.globalData.workplace==''){
              app.globalData.workplace=app.globalData.location;
              wx.setStorageSync('workplace',app.globalData.workplace);
            }           
          }
        })
      },
      fail:function(){
        //当用户拒绝授权时,采用默认地点------深圳
        console.log('用户拒绝授权获取当前地址,采用默认地点---深圳')
        app.globalData.location='深圳';
        //默认期待工作地点为当地
        if(app.globalData.workplace==''){
          app.globalData.workplace=app.globalData.location;
          wx.setStorageSync('workplace',app.globalData.workplace);
        }
      }
    })
}
module.exports = {
  formatTime: formatTime,
  getLocationAddress:getLocationAddress
}
