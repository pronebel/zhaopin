var app = getApp();
let {
    server
} = require('../../configs/serverConfig');
let $ = require('../../utils/util.js');
Page({
    data: {
        loading: true
    },
    onLoad: function() {
        this.getCollections();
    },
    getCollections() {
        $.ajax({
            url: `${server}/collection/getCollections`,
            data: {
                openid: app.globalData.session.openid
            }
        }).then((res) => {
            if (res.statusCode == 200 && res.data) {
                this.setData({
                    collections: res.data
                })
                app.hiddenLoader(this);
            }
        })
    },
    navigateTo(e) {
        let {
            url,
            id
        } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `${url}?id=${id}`
        })
    },
    deleteCollection(e) {
        let {
            id,
            index
        } = e.currentTarget.dataset;
        $.ajax({
            url: `${server}/collection/deleteCollection`,
            data: {
                id: id
            },
            method: 'POST'
        }).then((res) => {
            if (res.statusCode == 200 && res.data) {
                wx.showToast({
                    title: '删除成功!'
                })
                let {
                    collections
                } = this.data;
                collections.splice(index, 1)
                this.setData({
                    collections: collections
                })
                app.globalData.collectionLength--;
            }
        }).catch((res) => {
            wx.showToast({
                title: '删除失败!'
            })
        })
    },
    sendResume() {
        //todo
    }
})
