var $ = require('utils/util.js');

App({
    onLaunch: function() {
        //获取本地存储的workplaceCity,如为空,采用当地为workplaceCity
        var workplaceCity = wx.getStorageSync('workplaceCity');
        if (!workplaceCity) {
            //还没存储workplaceCity，应该为第一次访问
        } else {
            this.globalData.workplaceCity = workplaceCity;
            console.log(workplaceCity);
        }
        $.getLocationAddress(this);

        //获取本地存储的cityList
        var cityList = wx.getStorageSync('cityList');
        if (!cityList) {
            $.getCityList(); //调用腾讯地图开放平台获取城市列表 保存在本地存储
            this.globalData.cityList = wx.getStorageSync('cityList');
        } else {
            this.globalData.cityList = cityList;
        }

        var workplaceDistrict = wx.getStorageSync('workplaceDistrict');
        console.log(workplaceDistrict);
        this.globalData.workplaceDistrict = workplaceDistrict;
    },
    getUserInfo: function(cb) {
        var _this = this;
        if (this.globalData.userInfoFromWX) {
            typeof cb == "function" && cb(this.globalData.userInfoFromWX)
        } else {
            wx.login({
                success: function() {
                    // wx.request({
                    //     url:'',
                    //     data:{code:res.code},
                    //     success:function(res){

                    //     },fail:()=>{

                    //     }
                    // })
                   
                   
                    wx.getUserInfo({
                        success: function(res) {
                            _this.globalData.userInfoFromWX = res.userInfo;
                            typeof cb == "function" && cb(_this.globalData.userInfoFromWX)
                        },
                        fail: function() {
                            console.log('用户拒绝授权');
                            _this.globalData.userInfoFromWX = {};
                            typeof cb == "function" && cb(_this.globalData.userInfoFromWX)
                        }
                    })
                }
            })
        }
    },
    onShow: function() {
        //获取本地存储 简历信息
        var newResume = wx.getStorageSync('newResume');
        if (newResume) {
            this.globalData.newResume = newResume;
        }
        var editResume = wx.getStorageSync('editResume');
        if (editResume) {
            this.globalData.editResume = editResume;
        }
    },
    onHide: function() {
        //保存简历信息到本地存储
        wx.setStorageSync('newResume', this.globalData.newResume);
        wx.setStorageSync('editResume', this.globalData.editResume);
    },
    globalData: {
        userInfoFromWX: null,
        location: '',
        workplaceCity: '',
        workplaceDistrict: '',
        cityList: [],
        newResume: {},
        editResume: {}
    }
})