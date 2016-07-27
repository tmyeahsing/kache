'use strict'
import searchBar from '../components/search-bar/search-bar.vue'
new Vue({
    el: 'body',
    data: {
        orders: [],
        statusCount: {
            map: ['待接单', '待确认', '待维修', '待付款', '余欠款', '已完成'],
            count: {}
        },
        serverDate: undefined,
        keyword: ''
    },
    components: {
        searchBar: searchBar
    },
    created(){
        this.getOrders();
        $.promiseAjax({
            url: '/api/order/count',
            data: {
                status: [0, 1, 2, 3, 4, 5]
            }
        }).then(data => this.statusCount.count = data.data).catch(err => console.log(err));
        setTimeout(function(){
            $.promiseAjax({
                url: 'https://api.leancloud.cn/1.1/date'
            }).then(data => this.serverDate = new Date(data.iso)).catch(err => console.log(err));
        },5000)

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
        countDown(value, serverDate, gap){
            if(!serverDate){
                return '倒计时获取中';
            }
            return serverDate;
        }
    }
})