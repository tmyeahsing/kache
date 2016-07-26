'use strict'
new Vue({
    el: 'body',
    data: {
        order: {},
        statusMap: OrderStatusMap
    },
    created(){
        this.getOrder(UrlParams.id);
    },
    methods: {
        getOrder(id){
            var self = this;
            $.promiseAjax({
                url: 'https://api.leancloud.cn/1.1/classes/Order/' + id,
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

            }).then(data => self.order = data)
        }
    }
})