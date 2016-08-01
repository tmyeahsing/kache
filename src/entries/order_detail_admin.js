'use strict'

Vue.transition('zoom', {
    enterClass: 'zoomIn',
    leaveClass: 'zoomOut'
});

$.promiseAjax({
    url: 'https://api.leancloud.cn/1.1/classes/Order/' + UrlParams.id,
    beforeSend(xhr, setting){
        xhr.setRequestHeader('X-LC-Id', AppId);
        xhr.setRequestHeader('X-LC-Key', AppKey);
        xhr.setRequestHeader('X-LC-Session', SessionToken);
    },
    contentType: 'application/json',
    data: {
        include: 'createdBy'
    }
}).catch(function(err){

}).then(function(data){
    new Vue({
        el: '#main_contain',
        data: {
            order: data,
            statusMap: OrderStatusMap,
            isPriceFormulatorShown: false,
            dropInFee: undefined,
            manHours: undefined,
            manUnitPrice: undefined,
            partsTotal: undefined,
            partsDesc: ''
        },
        created(){
            var self = this;
        },
        methods: {
            showPriceFormulator(){
                this.isPriceFormulatorShown = true;
            },
            hidePriceFormulator(){
                this.isPriceFormulatorShown = false;
            },
            priceFormulatorTouch(ev){
                ev.preventDefault();
            },
            takeOrder(){
                var self = this;
                $.promiseAjax({
                    url: '/api/order/take',
                    type: 'put',
                    data: {
                        drop_in_fee: self.dropInFee,
                        man_hours: self.manHours,
                        man_unit_price: self.manUnitPrice,
                        parts_total: self.partsTotal,
                        parts_desc: self.partsDesc,
                        order_object_id: UrlParams.id
                    }
                }).then(function(data){
                    console.log(data)
                }).catch(function(err){
                    console.log(JSON.parse(err.responseText));
                })
            }
        }
    })
})
