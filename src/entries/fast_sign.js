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
        uploadMaxLength: 4
    },
    methods: {
        selectType: function(type){
            this.type = type;
        }
    }
})