const app = getApp();
let {
    server
} = require('../../../../../configs/serverConfig');
let $ = require('../../../../../utils/util.js');
let event = require('../../../../../utils/event.js');
let { ripple } = require('../../../../../utils/ripple.js');
Page({
    data: {
        centent: '',
        anonymity: false,
        range_comment: {
            hr_comment: 5,
            company_comment: 5,
            detail_conform_comment: 5
        },
        maxlength: 150,
        ranges: [0, 1, 2, 3, 4, 5],
        ripple: {
            s0: '',
            s1: '',
            s2: '',
            s3: ''
        }
    },
    onLoad(options) {
        let { id, job_id } = options;
        if (!id || !job_id)
            return;
        this.setData({
            interview_id: id,
            job_id: job_id
        })
    },
    switchChange(e) {
        this.setData({
            anonymity: e.detail.value
        })
    },
    bindPickerChange(e) {
        let { key } = e.currentTarget.dataset;
        let { value } = e.detail;
        let { range_comment } = this.data;
        range_comment[key] = value;
        this.setData({
            range_comment: range_comment
        })
    },
    comment(e) {
        ripple.call(this, e);
        if (!this.checkContent())
            return;
        $.ajax({
            url: `${server}/comment/addComment`,
            data: {
                comment: JSON.stringify({
                    interview_id: this.data.interview_id,
                    seeker_id: app.globalData.session.openid,
                    job_id: this.data.job_id,
                    comment_date_time: $.formatTime(new Date()),
                    content: this.data.content,
                    hr_comment: this.data.range_comment.hr_comment,
                    detail_conform_comment: this.data.range_comment.detail_conform_comment,
                    company_comment: this.data.range_comment.company_comment,
                    anonymity: this.data.anonymity
                })
            },
            method: 'POST'
        }).then((res) => {
            if (res.statusCode == 200 && res.data) {
                event.emit('comment');
                wx.showToast({
                    title: '评价成功!',
                    complete: function() {
                        setTimeout(function() {
                            wx.navigateBack()
                        }, 1500)
                    }
                })

            }
        })
    },
    checkContent() {
        if (this.data.content == 'null' || this.data.content == 'undefined' || !this.data.content) {
            wx.showToast({
                title: '请填写评价内容,说出您此时此刻的想法',
                icon: 'loading'
            })
            return false;
        }
        return true;
    },
    ripple(e) {
        ripple.call(this, e);
    },
    input(e) {
        this.setData({
            content: e.detail.value
        })
    }
})
