'use strict'
require('css/style.scss')

import actionSheet from '../components/actionsheet/actionsheet.vue'

new Vue({
    el: 'body',
    components: {
        'Hello': actionSheet
    },
    data:{
        show: false
    },
    methods: {
        showActionSheet(){
            this.show = true
        }
    }
})