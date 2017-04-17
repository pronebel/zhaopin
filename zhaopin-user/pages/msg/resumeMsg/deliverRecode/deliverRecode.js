<<<<<<< HEAD
// pages/msg/resumeMsg/deliverRecode/deliverRecode.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
=======
const app = getApp();
let $ = require('../../../../utils/util.js');
let {
    server
} = require('../../../../configs/serverConfig.js');
let event = require('../../../../utils/event.js');
Page({
    data: {

    },
    onLoad(options) {
        let id = options.id;
        if (id) {
            this.getDeliverRecode(id)
        }
    },
    getDeliverRecode(id) {
        this.setData({
            loading: true,
            hiddenLoader: false
        })
        $.ajax({
            url: `${server}/resumeStatus/getDeliverRecodeById`,
            method: 'GET',
            data: {
                id: id
            }
        }).then((res) => {
            if (res.statusCode === 200) {
                let obj = res.data;
                Object.keys(obj).forEach((val) => {
                    if (val.match(/time/g)) {
                        if (obj[val]) {
                            obj[val + '_filter'] = obj[val].dateFilter();
                        }
                    }
                })
                this.setData({
                    detail: obj
                })
                if (!obj.seeker_read) {
                    this.setRead(id);
                }
            }
            app.hiddenLoader(this);
        }).catch((error) => app.hiddenLoader(this))
    },
    setRead(id) {
        $.ajax({
            url: `${server}/resumeStatus/setRead`,
            method: 'POST',
            data: {
                id: id
            }
        }).then((res) => {
            console.log(event.events);
            event.emit('resumeStatusRead', {
                id: id
            })
            event.emit('length--', {
                key: 'resumeStatusLength',
                id: id
            })
        })
    }
})
>>>>>>> 7c3b5d26c4576ca14b0248eda920654be896fd81
