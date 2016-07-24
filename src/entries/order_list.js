'use strict'
new Vue({
    el: 'body',
    data: {
        orders: []
    },
    created(){
        this.getOrders();
    },
    methods: {
        getOrders(){
            var self = this;
            $.ajax({
                url: 'https://api.leancloud.cn/1.1/classes/Order',
                beforeSend(xhr, setting){
                    xhr.setRequestHeader('X-LC-Id', AppId);
                    xhr.setRequestHeader('X-LC-Key', AppKey);
                    xhr.setRequestHeader('X-LC-Session', SessionToken);
                },
                data: {
                    order: '-updatedAt',
                    include: 'createdBy'
                },
                success: data => self.orders = data.results
            })
        }
    }
})