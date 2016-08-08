'use strict'
/*wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxa196eef9e5f0511c', // 必填，公众号的唯一标识
    timestamp: new Date(), // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function(data){
    console.log(data)
    wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            console.log(res.latitude)
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
        }
    });
})*/

import {bitTo2} from './utils.js'
$.promiseAjax({
    url: 'https://api.leancloud.cn/1.1/classes/Order/' + UrlParams.id,
    beforeSend(xhr, setting){
        xhr.setRequestHeader('X-LC-Id', AppId);
        xhr.setRequestHeader('X-LC-Key', AppKey);
        xhr.setRequestHeader('X-LC-Session', SessionToken);
    },
    contentType: 'application/json',
    data: {
        include: 'createdBy, quotation'
    }
}).catch(function(err){

}).then(function(data){
    new Vue({
        el: '#main_contain',
        data: {
            order: data,
            statusMap: OrderStatusMap,
            now: undefined
        },
        created(){
            var self = this;

            $.promiseAjax({
                url: 'https://api.leancloud.cn/1.1/date'
            }).then(function(data){
                self.now = (+new Date(data.iso));
                var _countDown = setInterval(function(){
                    self.now += 1000;
                }, 1000);
            }).catch(err => console.log(err));
        },
        methods: {
            confirmOrder(){
                var self = this;
                ToastHandler.showLoading('正在确认...');
                $.promiseAjax({
                    url: '/api/order/confirm',
                    type: 'put',
                    data: {
                        order_object_id: UrlParams.id
                    }
                }).then(function(data){
                    if(data.success){
                        ToastHandler.hideLoading();
                        ToastHandler.showToast('操作成功');
                        self.order.status = 1;
                    }
                }).catch(function(err){
                    ToastHandler.hideLoading();
                    console.log(err)
                })
            },
            confirmFixed(){
                var self = this;
                ToastHandler.showLoading('操作处理中...');
                $.promiseAjax({
                    url: '/api/order/confirm_fixed',
                    type: 'put',
                    data: {
                        order_object_id: UrlParams.id
                    }
                }).then(function(data){
                    if(data.success){
                        ToastHandler.hideLoading();
                        ToastHandler.showToast('操作成功');
                        self.order.status = 3;
                    }
                }).catch(function(err){
                    ToastHandler.hideLoading();
                    console.log(err)
                })
            },
            payLeft(){
                WeixinJSBridge.invoke('getBrandWCPayRequest', {
                        "appId" : "wx2421b1c4370ec43b",
                        "timeStamp":" 1395712654",
                        "nonceStr" : "e61463f8efa94090b1f366cccfbbb444",
                        "package" : "prepay_id=u802345jgfjsdfgsdg888",
                        "signType" : "MD5",
                        "paySign" : "70EA570631E4BB79628FBCA90534C63FF7FADD89"
                    },
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request：ok" ) {}
                    }
                );
            }
        },
        filters: {
            countDownText(value){
                if(value <= 0){
                    return '<p class="color_red">已超时</p>'
                }else{
                    var _str = '';
                    var _min = '';
                    var _sec = '';
                    value = Math.round(value/1000);
                    _min = bitTo2(parseInt(value/60));
                    _sec = bitTo2(value%60);
                    return '接单倒计时<p class="color_green">' + _min + ' : ' + _sec + '</p>';
                }
            }
        }
    })
})
