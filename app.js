var $=require('utils/util.js');

App({
  onLaunch: function () {
    //获取本地存储的workplace,如为空,采用当地为workplace
    var workplace = wx.getStorageSync('workplace');
    if(!workplace){
      //还没存储workplace，应该为第一次访问
    }else{
      this.globalData.workplace=workplace;
      console.log(workplace);
    }
    $.getLocationAddress(this);
  },
  globalData:{
    userInfo:null,
    location:'',
    workplace:'',
  }
})