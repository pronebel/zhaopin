const $ = require('utils/util.js');
const {
    url
} = require('configs/serverConfig.js');

App({
    onLaunch: function() {
        //获取本地存储的workplaceCity,如为空,采用当地为workplaceCity,如果拒绝,采用'全国'
        var workplaceCity = wx.getStorageSync('workplaceCity');
        if (!workplaceCity) {
            $.getLocationAddress(this);
        } else {
            this.globalData.workplaceCity = workplaceCity;
        }

        //获取本地存储的cityList
        var cityList = wx.getStorageSync('cityList');
        if (!cityList) {
            $.getCityList(this); //调用腾讯地图开放平台获取城市列表 保存在本地存储
        } else {
            this.globalData.cityList = cityList;
        }

        this.globalData.workplaceDistrict = wx.getStorageSync('workplaceDistrict');

        //调用登录接口
        this.login();
    },
    onShow: function() {
        //checkSession
        this.checkSession();

    },
    login() {
        var that = this;
        $.ajaxLogin().then((res) => {
            if (res) {
                //登录成功 得到code 发送到服务器换取session
                return $.ajax({
                    url: url + '/common/onLogin',
                    data: {
                        code: res.code,
                        identity: that.globalData.identity
                    }
                })
            }
        }).catch(() => null).then((res) => {
            if (res) {
                //获取session成功 保存到globalData中并存储到本地
                that.globalData.session = res.data;
                wx.setStorageSync('session', res.data);
            }
        })
    },
    checkSession() {
        var that = this;
        $.ajaxCheckSession().then(() => null).catch(() => $.ajaxLogin()).then((res) => {
            if (res) {
                //登录成功 得到code 发送到服务器换取session
                return $.ajax({
                    url: url + '/common/onLogin',
                    data: {
                        code: res.code,
                        identity: that.globalData.identity
                    }
                })
            }
        }).catch(() => null).then((res) => {
            if (res) {
                //获取session成功 保存到globalData中并存储到本地
                this.globalData.session = res.data;
                wx.setStorageSync('session', res.data);
            }
        })
    },
    getUserInfo(cb) {
        var _this = this;
        if (this.globalData.userInfoFromWX) {
            typeof cb == "function" && cb(this.globalData.userInfoFromWX)
        } else {
            wx.login({
                success: function() {
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
    getWorkplace(cb) {
        var that = this;
        if (this.globalData.workplaceCity) {
            typeof cb == 'function' && cb(this.globalData.workplaceCity)
        } else {
            $.getLocationAddress(this, function() {
                typeof cb == "function" && cb(this.globalData.workplaceCity);
            });
        }
    },
    globalData: {
        userInfoFromWX: null,
        location: '',
        workplaceCity: '',
        workplaceDistrict: '',
        cityList: [],
        identity: 0, //0代表seeker  1代表hr
        session: {}
    }
})