const app = getApp();
let {
    server
} = require('../../../configs/serverConfig.js');
let $ = require('../../../utils/util.js');
let event = require('../../../utils/event.js');
let { ripple } = require('../../../utils/ripple.js');
Page({
    data: {
        loading: true,
        hiddenLoader: false
    },
    onLoad() {
        event.on('interviewRead', this, (data) => {
            let interviewList = this.data.interviewList;
            interviewList.forEach((val) => {
                if (val.id == data.id) {
                    console.log("id:" + data.id);
                    val.seeker_read = true;
                }
            })
            this.setData({
                interviewList: interviewList
            })
            wx.setStorageSync('interviewList', interviewList)
        })
        this.getInterview();
    },
    onUnload() {
        event.remove('interviewRead', this);
    },
    getInterview(cb) {
        $.ajax({
            url: `${server}/interview/getUnRead`,
            data: {
                openid: app.globalData.session.openid
            },
            method: 'POST'
        }).then((res) => {
            if (res.statusCode == 200) {
                let oldInterviewList = wx.getStorageSync('interviewList') || [];
                res.data.forEach((val) => {
                    oldInterviewList = oldInterviewList.filter((value) => {
                        return val.id != value.id
                    })
                })
                let interviewList = res.data.concat(oldInterviewList);
                let ripple = {};
                interviewList.map((val, index, arr) => {
                    if (val.date_time) {
                        val.date_time_filter = val.date_time.substring(0, 16)
                    }
                    ripple["s" + index] = '';
                })
                this.setData({
                    interviewList: interviewList,
                    ripple: ripple
                })

                wx.setStorageSync('interviewList', interviewList)
                typeof cb == 'function' && cb();
            }
            app.hiddenLoader(this)
        }).catch(error => app.hiddenLoader(this))
    },
    onPullDownRefresh() {
        this.getInterview(() => {
            wx.stopPullDownRefresh();
        })
    },
    navigateTo(e) {
        ripple.call(this, e);
        wx.navigateTo({
            url: `interviewDetail/interviewDetail?id=${e.currentTarget.dataset.id}`
        })
    }
})
