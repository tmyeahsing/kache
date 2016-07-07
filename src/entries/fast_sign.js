'use strict'
require('css/style.scss')

import Uploader from '../components/uploader/uploader.vue'
import UploaderFiles from '../components/uploader/uploader-files.vue'
import UploaderFile from '../components/uploader/uploader-file.vue'

new Vue({
    el: 'body',
    components: {
        Uploader: Uploader,
        UploaderFiles: UploaderFiles,
        UploaderFile: UploaderFile
    },
    data: {
        log: '',
        uploadMaxLength: 4,
        uploadFiles: [],
        showAddImgBtn: true
    },
    computed: {
        uploadCount: function(){
            return this.uploadFiles.length;
        },
        showAddImgBtn: function(){
            return this.uploadFiles.length >= 4 ? false : true;
        }
    },
    methods: {
      addFilePreview: function(blobArray){
          var _array = blobArray.map(function(blob){
              return {
                  url: blob,
                  status: 0
              }
          });
          this.uploadFiles = this.uploadFiles.concat(_array);
      }
    },
    filters: {
        status: function(val){
            var _ret;

            if(val === 100){
                _ret = '';
            }else if(typeof val === 'number'){
                _ret = val + '%';
            }else{
                _ret = val;
            }

            return _ret;
        }
    },
    events: {
        'weui-input-change': function(events){
            var _array = [];

            [].forEach.call(events.currentTarget.files, function(ele, i){
                _array.push(window.URL.createObjectURL(ele));
            })

            this.addFilePreview(_array);
        }
    }
})