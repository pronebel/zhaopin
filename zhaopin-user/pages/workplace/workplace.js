const app = getApp();
let event = require('../../utils/event.js');
const citys = require('../../configs/citys_config.js');
Page({
    data: {
        pickerValue: [0, 0]
    },
    onLoad: function(options) {
        try {
            let windowHeight = wx.getSystemInfoSync().windowHeight;
            this.setData({
                windowHeight: windowHeight,
                city_data: citys
            })
        } catch (err) {}

        let {
            flag,
            city
        } = options;
        this.setData({
            flag: flag
        })

        if (city == 'undefined' || city == 'null' || !city) {
            this.setData({
                workplaceCity: ''
            })
        } else {
            this.setData({
                workplaceCity: city
            })
        }
    },
    goBack: () => {
        wx.navigateBack({})
    },
    pickerChange(e) {
        const val = e.detail.value;
        console.log(val);
        this.setData({
            workplaceCity: citys[val[0]].citys[val[1]],
            pickerValue: val
        })
        this.changeCity();
    },
    selectPlace: function(e) {
        this.setData({
            workplaceCity: e.target.dataset.place
        })
        this.changeCity();
    },
    changeCity() {
        let {
            flag,
            workplaceCity
        } = this.data;
        if (flag == 'hope_city') {
            event.emit('hope_city_changed', {
                city: workplaceCity
            })
            console.log(1);
            return;
        } else if (flag == 'userInfo_city') {
            event.emit('cityChanged', {
                city: workplaceCity
            })
        } else if (flag == 'search_city') {
            if (app.globalData.workplaceCity != this.data.workplaceCity) {
                event.emit('search_city_changed', {
                    city: workplaceCity
                })
            }
        }
    }
})
