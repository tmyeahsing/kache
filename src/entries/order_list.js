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
            $.get('/api/order', data => this.orders = data)
        }
    }
})