var app = getApp();
let {
    server
} = require('../../configs/serverConfig');
let $ = require('../../utils/util.js');
let { ripple } = require('../../utils/ripple.js');
Page({
    data: {
        loading: true,
        hiddenLoader: false
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
                let ripple = {};
                res.data.forEach((val, index) => {
                    ripple["s" + index] = '';
                    ripple["s_" + index] = '';
                })
                this.setData({
                    collections: res.data,
                    ripple: ripple
                })
                app.globalData.collectionLength = res.data.length;
                wx.setStorageSync('collectionLength', res.data.length);
                app.hiddenLoader(this);
            }
        })
    },
    navigateTo(e) {
        ripple.call(this, e);
        let { url } = e.currentTarget.dataset;
        wx.navigateTo({
            url: url
        })
    },
    judgeDelete(e) {
        ripple.call(this, e);
        let that = this;
        wx.showModal({
            title: '提示信息',
            content: '您确定要删除该收藏吗？',
            success: (res) => {
                if (res.confirm) {
                    that.deleteCollection(e);
                }
            }
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
                console.log(app.globalData.collectionLength);
                app.globalData.collectionLength--;
                wx.setStorageSync('collectionLength', app.globalData.collectionLength);
                console.log(app.globalData.collectionLength);
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
