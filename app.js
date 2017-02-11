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
    
    //获取本地存储的cityList
    var cityList=wx.getStorageSync('cityList');
    if(!cityList){
      $.getCityList();  //调用腾讯地图开放平台获取城市列表 保存在本地存储
      this.globalData.cityList=wx.getStorageSync('cityList');
    }else{
      this.globalData.cityList=cityList;
    }

  },
  globalData:{
    userInfo:null,
    location:'',
    workplace:'',
    cityList:[]
  }
})