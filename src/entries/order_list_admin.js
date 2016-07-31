'use strict'
import searchBar from '../components/search-bar/search-bar.vue'
import {bitTo2} from './utils.js'
new Vue({
    el: '#main_contain',
    data: {
        orders: [],
        statusCount: {
            map: ['待接单', '待确认', '待维修', '待付款', '已完成'],
            count: {}
        },
        now: undefined,
        keyword: ''
    },
    components: {
        searchBar: searchBar
    },
    created(){
        var self = this;
        this.getOrders();

        $.promiseAjax({
            url: '/api/order/count',
            data: {
                status: [0, 1, 2, 3, 4,]
            }
        }).then(data => this.statusCount.count = data.data).catch(err => console.log(err));

        $.promiseAjax({
            url: 'https://api.leancloud.cn/1.1/date'
        }).then(function(data){
            self.now = (+new Date(data.iso));
            var _countDown = setInterval(function(){
                self.now += 30000;
            }, 30000);
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
                    include: 'createdBy'
                }
            }).catch(function(err){

            }).then(data => self.orders = data.results)
        }
    },
    filters: {
        countDownText(value){
            if(value <= 0){
                return '<p class="color-yellow">已超时</p>'
            }else{
                var _str = '';
                var _hour = '';
                var _min = '';
                value = Math.round(value/1000);
                _hour = bitTo2(parseInt(value/3600));
                _min = bitTo2(Math.ceil((value%3600)/60));
                return '接单倒计时<p class="color-green">' + _hour + ' : ' + _min + '</p>';
            }
        }
    }
})