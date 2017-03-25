const $ = require('utils/util.js');
const {
    server
} = require('configs/serverConfig.js');
let event = require('utils/event.js');
import Websocket from './utils/websocket';
let ws = new Websocket();
App({
    onLaunch: function() {
        let location = wx.getStorageSync('location');
        if (!location) {
            $.getLocation(this);
        } else {
            this.globalData.location = location;
        }
        //获取本地存储的cityList
        let cityList = wx.getStorageSync('cityList');
        if (!cityList) {
            $.getCityList(this); //调用腾讯地图开放平台获取城市列表 保存在本地存储
        } else {
            this.globalData.cityList = cityList;
        }

        //如果本地不存在session 调用登录
        let session = wx.getStorageSync('session');
        if (!session) {
            this.login(() => {
                this.connectSocket();
            });
        } else {
            this.globalData.session = session;
            this.connectSocket();
        }

        event.on('userInfoChanged', this, function(data) {
            this.globalData.userInfo = data.userInfo
        }.bind(this))

        let config = wx.getStorageSync('config');
        if (config) {
            this.globalData.config = config;
        } else {
            this.getConfig();
        }
        //    this.login();
        //this.getUserInfo();

    },
    // onShow: function() {
    //     //checkSession
    //     this.checkSession();
    // },
    login(cb) {
        console.log('登录');
        let that = this;
        $.ajaxLogin().then((res) => {
            if (res) {
                //登录成功 得到code 发送到服务器换取session
                return $.ajax({
                    url: server + '/common/onLogin',
                    data: {
                        code: res.code,
                        identity: that.globalData.identity
                    }
                })
            }
        }).catch((error) => {
            console.log('登录失败!');
            console.log(error);
        }).then((res) => {
            if (res.statusCode == 200) {
                //获取session成功 保存到globalData中并存储到本地
                console.log('登录成功:' + res.data);
                that.globalData.session = res.data;
                wx.setStorageSync('session', res.data);
            }
            typeof cb == 'function' && cb();
        })
    },
    connectSocket() {
        ws.open({
            openid: this.globalData.session.openid
        });
        ws.on((res) => {
            console.log(res);
        });
    },
    checkSession() {
        let that = this;
        wx.checkSession({
            fail: () => {
                that.login();
            }
        })
    },
    getUserInfoFromWX(cb) {
        let _this = this;
        if (this.globalData.userInfoFromWX) {
            typeof cb == "function" && cb(this.globalData.userInfoFromWX)
        } else {
            let userInfoFromWX = wx.getStorageSync('userInfoFromWX');
            if (!userInfoFromWX) {
                wx.login({
                    success: function() {
                        wx.getUserInfo({
                            success: function(res) {
                                _this.globalData.userInfoFromWX = res.userInfo;
                                wx.setStorageSync('userInfoFromWX', res.userInfo);
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
            } else {
                _this.globalData.userInfoFromWX = userInfoFromWX;
                typeof cb == "function" && cb(_this.globalData.userInfoFromWX)
            }
        }
    },
    getUserInfo(cb) {
        let _this = this;
        console.log(1);
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            console.log(2);
            let userInfo = wx.getStorageSync('userInfo');
            if (!userInfo) {
                console.log(3);
                let timer = setInterval(function() {
                    let {
                        thirdSessionKey
                    } = _this.globalData.session;
                    console.log(_this.globalData.session);
                    if (!thirdSessionKey) {
                        console.log(4)
                        return;
                    }
                    console.log(5);
                    $.ajax({
                        url: `${server}/seeker/getUserInfo`,
                        data: {
                            thirdSessionKey: thirdSessionKey
                        }
                    }).then((res) => {
                        if (res.statusCode == 200) {
                            clearInterval(timer);
                            _this.globalData.userInfo = res.data;
                            wx.setStorageSync('userInfo', res.data);
                            typeof cb == "function" && cb(_this.globalData.userInfo)
                        } else {
                            clearInterval(timer);
                        }
                    }).catch((res) => {
                        console.log(7);
                        clearInterval(timer)
                    })
                }.bind(this), 2000)
            } else {
                _this.globalData.userInfo = userInfo;
                typeof cb == "function" && cb(_this.globalData.userInfo)
            }
        }
    },
    getWorkplace(cb) {
        let workplace = this.globalData.workplace || wx.getStorageSync('workplace');
        let _this = this;
        if (workplace) {
            typeof cb == 'function' && cb(workplace)
        } else {
            $.getWorkplace(this, function() {
                typeof cb == "function" && cb(_this.globalData.workplace);
            });
        }
    },
    resume(url, method, data) {
        return $.ajax({
            url: `${server}/${url}`,
            method: method,
            data: data
        })
    },
    getLocation(cb) {
        let _this = this;
        if (this.globalData.location) {
            typeof cb == 'function' && cb(this.globalData.location);
        } else {
            $.getLocation(this, function() {
                typeof cb == "function" && cb(_this.globalData.location);
            })
        }
    },
    getCollectionLength(cb) {
        let collectionLength = this.globalData.collectionLength || wx.getStorageSync('collectionLength');
        if (collectionLength) {
            typeof cb == 'function' && cb(collectionLength)
        } else {
            let timer = setInterval(function() {
                let {
                    thirdSessionKey
                } = this.globalData.session;
                if (!thirdSessionKey) {
                    return;
                }
                $.ajax({
                    url: `${server}/collection/getCollectionLength`,
                    data: {
                        thirdSessionKey: thirdSessionKey
                    }
                }).then((res) => {
                    if (res.statusCode == 200) {
                        this.globalData.collectionLength = res.data;
                        wx.setStorageSync('collectionLength', res.data);
                        cb(res.data);
                        clearInterval(timer);
                    } else {
                        clearInterval(timer);
                    }
                }).catch((error) => {
                    clearInterval(timer);
                })
            }.bind(this), 2000)
        }
    },
    getConfig(cb) {
        let {
            config
        } = this.globalData;
        if (config) {
            typeof cb == 'function' && cb(config)
        } else {
            let timer = setInterval(function() {
                let {
                    thirdSessionKey
                } = this.globalData.session;
                if (!thirdSessionKey)
                    return;
                $.ajax({
                    url: `${server}/config/getConfig`,
                    data: {
                        thirdSessionKey: thirdSessionKey
                    }
                }).then((res) => {
                    if (res.statusCode == 200) {
                        this.globalData.config = res.data;
                        wx.setStorageSync('config', res.data);
                        typeof cb == 'function' && cb(res.data)
                        clearInterval(timer);
                    }
                }).catch((error) => {
                    clearInterval(timer);
                })
            }.bind(this), 2000)
        }
    },
    hiddenLoader(self) {
        self.setData({
            loading: false
        })
        setTimeout(function() {
            self.setData({
                hiddenLoader: true
            })
        }, 600)
    },
    globalData: {
        userInfoFromWX: null,
        location: null,
        workplace: null,
        cityList: [],
        identity: 0, //0代表seeker  1代表hr
        session: {},
        userInfo: null,
        collectionLength: null,
        config: null
    }
})