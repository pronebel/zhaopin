const app = getApp();
let {
    server
} = require('../../../configs/serverConfig.js');
let $ = require('../../../utils/util.js');
let event = require('../../../utils/event.js');
Page({
    data: {
        pages: [{
            key: '全部',
            count: 0
        }, {
            key: '未处理',
            count: 0
        }, {
            key: '已处理',
            count: 0
        }],
        current: 0,
        sliderLeft: 0
    },
    onLoad() {
        let {
            windowWidth,
            windowHeight
        } = wx.getSystemInfoSync();
        let {
            pages
        } = this.data;
        this.setData({
            sliderLeft: windowWidth / pages.length,
            windowHeight: windowHeight,
            windowWidth: windowWidth,
            loading: true,
            hiddenLoader: false
        });
        event.on('invicationRead', this, (data) => {
            let InvicationList = this.data.InvicationList;
            InvicationList.forEach((val) => {
                if (val.id == data.id) {
                    console.log("id:" + data.id);
                    val.seeker_read = true;
                }
            })
            this.setData({
                InvicationList: InvicationList
            })
            wx.setStorageSync('InvicationList', InvicationList)
        })
        event.on('setInvicationResult', this, (data) => {
            let InvicationList = this.data.InvicationList;
            InvicationList.forEach((val) => {
                if (val.id == data.id) {
                    val.result = data.result;
                    val.status = data.status
                }
            })
            this.setData({
                InvicationList: InvicationList
            })
            wx.setStorageSync('InvicationList', InvicationList)
        })
        event.on('ws_job_invication_update', this, () => {
            this.getInvicationUnread();
        })
        this.getInvicationUnread();
    },
    onUnload() {
        event.remove('invicationRead', this);
        event.remove('setInvicationResult', this);
        event.remove('ws_job_invication_update', this);
    },
    getInvicationUnread(cb) {
        $.ajax({
            url: `${server}/jobInvication/getUnRead`,
            data: {
                openid: app.globalData.session.openid
            },
            method: 'POST'
        }).then((res) => {
            if (res.statusCode == 200) {
                let oldInvicationList = wx.getStorageSync('InvicationList') || [];
                res.data.forEach((val) => {
                    oldInvicationList = oldInvicationList.filter((value) => {
                        return val.id != value.id
                    })
                })
                let InvicationList = res.data.concat(oldInvicationList);
                let pages = this.data.pages;
                InvicationList.map((val, index, arr) => {
                    if (val.invicate_date_time) {
                        val.invicate_date_time_filter = val.invicate_date_time.dateFilter();
                    }
                    pages.map((page) => {
                        if (page.key == val.status) {
                            return page.count++;
                        }
                    })
                })
                pages[0].count = InvicationList.length;
                this.setData({
                    InvicationList: InvicationList,
                    pages: pages
                })
                wx.setStorageSync('InvicationList', InvicationList)
                typeof cb == 'function' && cb();
            }
            app.hiddenLoader(this)
        }).catch(error => app.hiddenLoader(this))
    },
    onPullDownRefresh() {
        this.getInvicationUnread(() => {
            wx.stopPullDownRefresh();
        })
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeCurrent(e) {
        let {
            current
        } = this.data;
        current = parseInt(e.currentTarget.dataset.index);
        this.setData({
            current: current
        })
    },
    currentChanged(e) {
        let current = e.detail.current;
        this.setData({
            current: current
        })
    },
    navigateTo(e) {
        wx.navigateTo({
            url: `invication/invication?id=${e.currentTarget.dataset.id}&job_id=${e.currentTarget.dataset.job_id}`
        })
    }
})
