function ripple(e) {
    let { target, flag } = e.currentTarget.dataset;
    console.log(e)
    let {
        offsetLeft,
        offsetTop
    } = e.currentTarget;
    let {
        pageX,
        pageY
    } = e.changedTouches[0];
    let ripple = this.data.ripple;
    console.log(`pageY:${pageY} pageX:${pageX} offsetLeft:${offsetLeft} offsetTop:${offsetTop}`);
    if (flag && flag == 'true') { //绝对定位
        ripple[target] = 'top:20px ; left:' + (pageX - offsetLeft - 20) + 'px ;-webkit-animation: ripple 1s cubic-bezier(0, 0, 0.2, 1); animation: ripple 1s cubic-bezier(0, 0, 0.2, 1);'
    } else {
        ripple[target] = 'top:' + (pageY - offsetTop - 20) + 'px ; left:' + (pageX - offsetLeft - 20) + 'px ;-webkit-animation: ripple 1s cubic-bezier(0, 0, 0.2, 1); animation: ripple 1s cubic-bezier(0, 0, 0.2, 1);'
    }

    this.setData({
        ripple: ripple
    })
    setTimeout(function() {
        ripple[target] = '-webkit-animation: ripple-reset 0s linear; animation: ripple-reset 0s linear;'
        this.setData({
            ripple: ripple
        })
    }.bind(this), 1000)
}
module.exports = {
    ripple: ripple
}
