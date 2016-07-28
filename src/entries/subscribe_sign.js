'use strict'
import uploader from '../components/uploader/uploader.vue'

new Vue({
    el: '#main_contain',
    components: {
        uploader: uploader
    },
    data: {
        date: new Date(),
        selectedItem: 'item1',
        items: [
            {
                value: 'item1',
                text: '项目一'
            },
            {
                value: 'item2',
                text: '项目二'
            },
            {
                value: 'item3',
                text: '项目三'
            },
            {
                value: 'item4',
                text: '项目四'
            }
        ],
        uploadMaxLength: 4,
        description: '',
        descMaxLength: 200
    },
    methods: {

    }
})
