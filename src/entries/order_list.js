'use strict'
require('css/style.scss')

new Vue({
    el: 'body',
    data: {
        orders: []
    },
    created(){
        var orderQuery = new AV.Query('Order');
        orderQuery.find().then(results => {
                this.orders = results
            }).fail(function(err){
            console.log(err);
        });
    }
})