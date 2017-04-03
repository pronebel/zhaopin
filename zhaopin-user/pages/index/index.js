var app = getApp();
const MENU_WIDTH_SCALE = 0.82;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 5;
const FAST_SPEED_EFF_Y = 50;
let $ = require('../../utils/util.js');
let { server } = require('../../configs/serverConfig.js');
let event = require('../../utils/event.js');
Page({
    data: {
        loading: false,
        ui: {
            windowWidth: 0,
            menuWidth: 0,
            offsetLeft: 0,
            tStart: true,
            offsetTop: 0,
        },
        setHope_job: false,
        no_hope_job: false,
        hiddenLoader: true,
        limitCount: 10
    },
    navigateTo(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
    },
    onLoad: function() {
        var that = this
        try {
            let res = wx.getSystemInfoSync()
            this.windowWidth = res.windowWidth;
            this.data.ui.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
            this.data.ui.offsetLeft = 0;
            this.data.ui.windowWidth = res.windowWidth;
            this.setData({
                ui: this.data.ui,
                windowHeight: res.windowHeight
            })
        } catch (e) {}

        app.getUserInfoFromWX(function(data) {
            that.setData({
                userInfoFromWX: data
            })
        })
        app.getUserInfo((data) => {
            this.setData({
                userInfo: data
            })
            if (data.hope_job == 'null' || data.hope_job == 'undefined' || !data.hope_job) {
                this.setHope_job();
            } else {
                this.getIndexSearch();
            }
            if (data.avatarUrl == 'null' || data.avatarUrl == 'undefined' || !data.avatarUrl) {
                app.getUserInfoFromWX(function(data) {
                    if (data != 'null' && data != 'undefined' && data && data.avatarUrl) {
                        this.updateSeekerAvatar(data.avatarUrl, function() {
                            app.globalData.userInfo.avatarUrl = data.avatarUrl
                            wx.setStorageSync('userInfo', app.globalData.userInfo)
                        })
                    }
                }.bind(this))
            }
            if (data.name == 'null' || data.name == 'undefined' || !data.name) {
                app.getUserInfoFromWX(function(data) {
                    if (data != 'null' && data != 'undefined' && data && data.nickName) {
                        this.updateSeekerName(data.nickName, function() {
                            app.globalData.userInfo.name = data.nickName
                            wx.setStorageSync('userInfo', app.globalData.userInfo)
                        })
                    }
                }.bind(this))
            }
        })
        event.on('userInfoChanged', this, (data) => {
            this.setData({
                userInfo: data.userInfo
            })
        })
        event.on('cityChanged', this, function(data) {
            this.setData({
                'userInfo.city': data.city
            })
            this.getIndexSearch();
        }.bind(this))
    },
    onUnload() {
        event.remove('userInfoChanged', this);
        event.remove('cityChanged', this);
    },
    updateSeekerAvatar(data, cb) {
        $.ajax({
            url: `${server}/seeker/updateSeekerAvatar`,
            data: {
                avatarUrl: data,
                openid: app.globalData.userInfo.openid
            },
            method: 'POST'
        }).then((res) => {
            if (res.statusCode == 200 && res.data) {
                typeof cb == 'function' && cb();
            }
        })
    },
    updateSeekerName(data, cb) {
        $.ajax({
            url: `${server}/seeker/updateSeekerName`,
            data: {
                name: data,
                openid: app.globalData.userInfo.openid
            },
            method: 'POST'
        }).then((res) => {
            if (res.statusCode == 200 && res.data) {
                typeof cb == 'function' && cb();
            }
        })
    },
    confirm() {
        let {
            hope_job
        } = this.data.userInfo;
        if (hope_job == 'null' || hope_job == 'undefined' || !hope_job) {
            return;
        }
        $.ajax({
            url: `${server}/seeker/updateHope_job`,
            method: 'POST',
            data: {
                openid: app.globalData.session.openid,
                hope_job: hope_job
            }
        }).then((res) => {
            if (res.statusCode == 200) {
                this.setData({
                    setHope_job: false,
                    no_hope_job: false
                })
                wx.setStorageSync('userInfo', this.data.userInfo);
                app.globalData.userInfo = this.data.userInfo;
                this.getIndexSearch();
            }
        }).catch((error) => {
            console.log(error);
        })
    },
    cancel() {
        this.setData({
            setHope_job: false
        })
    },
    input(e) {
        this.setData({
            'userInfo.hope_job': e.detail.value
        })
    },
    setHope_job() {
        this.setData({
            setHope_job: true,
        })
        if (this.data.userInfo.hope_job == 'null' || this.data.userInfo.hope_job == 'undefined' || !this.data.userInfo.hope_job) {
            this.setData({
                no_hope_job: true
            })
        }
    },
    getIndexSearch(flag, cb) {
        let city = this.data.userInfo.city;
        let citys = [];
        if (city == 'undifined' || city == 'null' || !city) {
            citys.push('全国');
        } else {
            citys.push(city);
        }
        this.setData({
            loading: true,
            hiddenLoader: false
        })
        $.ajax({
            url: `${server}/job/getIndexSearch`,
            method: 'POST',
            data: {
                searchConfig: JSON.stringify({
                    search_key: this.data.userInfo.hope_job,
                    citys: citys
                }),
                startIndex: flag ? (this.data.jobList || []).length : 0,
                limitCount: parseInt(this.data.limitCount)
            }
        }).then((res) => {
            if (res.statusCode == 200) {
                if (flag) {
                    let {
                        jobList
                    } = this.data;
                    this.setData({
                        jobList: jobList.concat(res.data)
                    })
                } else {
                    this.setData({
                        jobList: res.data
                    })
                }
                let ripple = {};
                this.data.jobList.forEach((val, index) => {
                    ripple["s" + index] = '';
                })
                this.setData({
                    searched: true,
                    ripple: ripple
                })
                if (res.data.length < 10) {
                    this.setData({
                        dataLimit: true
                    })
                }
                typeof cb == 'function' && cb();
            }
            app.hiddenLoader(this);
        })

    },
    onPullDownRefresh: function() {
        if (this.data.ui.offsetLeft != 0) {
            wx.stopPullDownRefresh();
            return;
        } else {
            this.getIndexSearch(false, () => {
                wx.stopPullDownRefresh();
            });
        }
    },
    loadMore() {
        if (this.data.dataLimit || this.data.ui.offsetLeft != 0) {
            return;
        }
        this.getIndexSearch(true);
    },
    onShow: function() {
        app.getCollectionLength((data) => {
            this.setData({
                collectionLength: data
            })
        })
    },
    longtapHandle: function() {
        wx.showActionSheet({
            itemList: ['不感兴趣', '收藏'],
            itemColor: '#353535',
            success: function() {
                wx.showToast({
                    title: '操作成功',
                    icon: 'success'
                })
            }
        })
    },
    handlerStart(e) {
        let {
            clientX,
            clientY
        } = e.touches[0];
        this.tapStartX = clientX;
        this.tapStartY = clientY;
        this.tapStartTime = e.timeStamp;
        this.startX = clientX;
        this.startY = clientY;
        this.data.ui.tStart = true;
        this.setData({
            ui: this.data.ui
        })
    },
    handlerMove(e) {
        let {
            clientX,
            clientY
        } = e.touches[0];
        let {
            ui
        } = this.data;
        let offsetX = this.startX - clientX;
        let offsetY = this.startY - clientY;
        this.startY = clientY;
        this.startX = clientX;
        if (Math.abs(offsetY) * 1.5 > Math.abs(offsetX))
            return;
        ui.offsetLeft -= offsetX;
        // ui.offsetTop -= offsetY;
        if (ui.offsetLeft <= 0) {
            ui.offsetLeft = 0;
        } else if (ui.offsetLeft >= ui.menuWidth) {
            ui.offsetLeft = ui.menuWidth;
        }
        this.setData({
            ui: ui
        })
    },
    handlerEnd(e) {
        this.data.ui.tStart = false;
        this.setData({
            ui: this.data.ui
        })
        let {
            ui
        } = this.data;
        let {
            clientX,
            clientY
        } = e.changedTouches[0];
        let endTime = e.timeStamp;
        let offsetX = this.startX - clientX;
        let offsetY = this.startY - clientY;
        if (Math.abs(offsetY) * 1.5 > Math.abs(offsetX))
            return;
        //快速滑动
        if (endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
            //向左
            if (this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
                ui.offsetLeft = 0;
            } else if (this.tapStartX - clientX < -FAST_SPEED_DISTANCE && Math.abs(this.tapStartY - clientY) < FAST_SPEED_EFF_Y) {
                ui.offsetLeft = ui.menuWidth;
            } else {
                if (ui.offsetLeft >= ui.menuWidth / 2) {
                    ui.offsetLeft = ui.menuWidth;
                } else {
                    ui.offsetLeft = 0;
                }
            }
        } else {
            if (ui.offsetLeft >= ui.menuWidth / 2) {
                ui.offsetLeft = ui.menuWidth;
            } else {
                ui.offsetLeft = 0;
            }
        }
        this.setData({
            ui: ui
        })
    },
    shadowcatch: function() {
        return;
    },
    showScan: function() {
        wx.scanCode({
            success: function(res) {
                if (res.result) {
                    try {
                        let {
                            uid,
                            action
                        } = JSON.parse(res.result);
                        if (action == 'pc') {
                            wx.navigateTo({
                                url: `../editResume/scanCode/scanCode?uid=${uid}`
                            })
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        })
    },
    handlerPageTap(e) {
        let {
            ui
        } = this.data;
        if (ui.offsetLeft != 0) {
            ui.offsetLeft = 0;
            this.setData({
                ui: ui
            })
        }
    },
    showBars(e) {
        this.setData({
            'ui.offsetLeft': 1
        })
        setTimeout(function() {
            let {
                ui
            } = this.data;
            if (ui.offsetLeft == 1) {
                ui.offsetLeft = ui.menuWidth;
                this.setData({
                    ui: ui
                })
            }
        }.bind(this), 30)
    }
})
