const app = getApp();
let {
    server
} = require('../../../../configs/serverConfig');
let $ = require('../../../../utils/util.js');
let event = require('../../../../utils/event.js');
let loop = require('../../../../utils/event-loop.js');
let {
    ripple
} = require('../../../../utils/ripple.js');

Page({
    data: {
        loading: true,
        hiddenLoad: false
    },
    onLoad(options) {
        let id = options.id;
        if (!id) {
            return;
        }
        this.getInterviewById(id)
    },
    getInterviewById(id, cb) {
        $.ajax({
            url: `${server}/interview/getInterviewById`,
            data: {
                id: parseInt(id)
            },
            method: 'GET'
        }).then((res) => {
            if (res.statusCode == 200) {
                console.log(1);
                if (res.data.date_time) {
                    res.data.date_time_filter = res.data.date_time.substring(0, 16);
                }
                this.setData({
                    interviewDetail: res.data
                })
                if (!res.data.seeker_read) {
                    this.setRead(id);
                }
            }
            app.hiddenLoad(this);
        }).catch(error => app.hiddenLoad(this))
    },
    setRead(id) {
        $.ajax({
            url: `${server}/interview/setRead`,
            data: {
                id: id
            },
            method: 'POST'
        }).then((res) => {
            if (res.statusCode == 200 && res.data) {
                event.emit('interviewRead', {
                    id: id
                })
                event.emit('length--', {
                    key: 'interviewLength',
                    id: id
                })
            }
        })
    },
})
