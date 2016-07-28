'use strict'
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
            statusMap: OrderStatusMap
        },
        created(){
            var self = this;
        },
        methods: {

        }
    })
})
