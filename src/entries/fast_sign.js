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
            var images = this.$refs.uploader.uploadFiles;
            if(images.length){
                var formData = new FormData();
                images.forEach(function(ele, i){
                    formData.append('images['+ i +']', ele.file);
                });
                $.ajax({
                    url: '/api/upload',
                    type: 'post',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        var imageUrls = data.data.map(function(ele, i){
                            return ele.fileUrl;
                        });
                        submit(imageUrls)
                    }
                })
            }else{
                submit();
            }

            function submit(imageUrls){
                var params = {
                    desc: self.typeMap[self.type],
                    type: 1,
                    status: 0
                };
                if(images){
                    params.images = imageUrls;
                }
                $.ajax({
                    url: '/api/order',
                    type: 'POST',
                    data: params,
                    success: function(data){
                        if(data.success){
                            window.location.href = './order_list.html';
                        }
                    }
                })
            }
        }
    }
})