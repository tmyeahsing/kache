'use strict'
import {bitTo2} from './utils.js'
new Vue({
    el: '#main_contain',
    data: {
        orders: [],
        statusMap: ['待接单', '待确认', '待维修', '待付款', '已完成'],
        now: undefined
    },
    created(){
        var self = this;
        this.getOrders();

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
        getOrders(){
            var self = this;
            $.promiseAjax({
                url: 'https://api.leancloud.cn/1.1/classes/Order',
                beforeSend(xhr, setting){
                    xhr.setRequestHeader('X-LC-Id', AppId);
                    xhr.setRequestHeader('X-LC-Key', AppKey);
                    xhr.setRequestHeader('X-LC-Session', SessionToken);
                },
                data: {
                    order: '-updatedAt',
                    include: 'createdBy,quotation'
                }
            }).catch(function(err){

            }).then(data => self.orders = data.results)
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
