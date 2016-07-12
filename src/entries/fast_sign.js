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
            var self = this;
            $.ajax({
                url: '/api/order',
                type: 'post',
                data: {
                    desc: self.typeMap[self.type],
                    type: 1,
                    status: 0
                },
                success: function(data){
                    console.log(data)
                }
            })
        }
    }
})