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

        var _this = this;
        wx.login({
            success: function() {
                wx.getUserInfo({
                    success: function(res) {
                        _this.globalData.userInfo = res.userInfo;
                    },
                    fail: function() {
                        console.log('用户拒绝授权');
                        //do something
                    }
                })
            }
        })

    },
    globalData: {
        userInfo: null,
        location: '',
        workplaceCity: '',
        workplaceDistrict: '',
        cityList: []
    }
})