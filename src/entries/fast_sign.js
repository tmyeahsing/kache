'use strict'
require('css/style.scss')

import Uploader from '../components/uploader/uploader.vue'

new Vue({
    el: 'body',
    components: {
        Uploader: Uploader
    },
    data: {
        type: 0,
        typeMap: {
            0: '开不动，轮胎坏了',
            1: '开不动，不知何故'
        },
        uploadMaxLength: 4
    },
    methods: {
        selectType: function(type){
            this.type = type;
        },
        sign(){
            var OrderObject = AV.Object.extend('Order');
            var orderObject = new OrderObject();
            var filePromises = [];
            var self = this;
            this.$refs.uploader.uploadFiles.forEach(function (ele, i) {
                filePromises.push((new AV.File('order', ele.file).save()));
            });
            Promise.all(filePromises).then(function (savedFiles) {
                savedFiles.map(function(ele){
                    return ele.attributes.url;
                })
                orderObject.save({
                    desc: self.typeMap[self.type],
                    images:savedFiles,
                    type: 1,
                    status: 0
                }).then(function(order){
                    console.log(order);
                })
            });
        }
    }
})