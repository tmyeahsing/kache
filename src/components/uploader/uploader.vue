<template>
<div class="weui_uploader">
  <cell class="weui_uploader_hd">
    <span slot="body"><slot name="title"></slot></span>
    <span slot="footer" v-if="count >= 0 && maxLength > 0">{{count}}/{{maxLength}}</span>
  </cell>
  <div class="weui_uploader_bd">
    <uploader-files>
      <ul>
        <uploader-file :image-url="item.url" v-for="item in uploadFiles" :has-status="false" :index="$index">
        </uploader-file>
      </ul>
    </uploader-files>
    <div class="weui_uploader_input_wrp" v-if="hasInput" v-show="showInput">
      <input type="file" class="weui_uploader_input" accept="image/jpg,image/jpeg,image/png,image/gif" multiple @change="inputChange">
    </div>
  </div>
  <p class="weui_uploader_full" style="display: none;" v-show="count >= maxLength ? true : false">最多上传{{maxLength}}张</p>
</div>
</template>

<script>
import Cell from '../cells/cell.vue';
import UploaderFiles from '../uploader/uploader-files.vue';
import UploaderFile from '../uploader/uploader-file.vue';

export default {
  props: {
    /**
     * 显示的最大可上传数量
     */
    maxLength: {
      type: Number,
      required: false,
      validator: function(value) {
        return value > 0;
      }
    },

    /**
     * 是否包含input元素
     */
    hasInput: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data() {
    return {
      uploadFiles: []
    }
  },

  computed: {
    count: function(){
      return this.uploadFiles.length;
    },
    showInput: function(){
      return this.uploadFiles.length >= this.maxLength ? false : true;
    }
  },

  methods: {
    addFiles: function(files){
      var _balance = this.maxLength - this.uploadFiles.length;
      var _array = [];
      Array.prototype.forEach.call(files, function(file){
        _array.push({
          url: window.URL.createObjectURL(file),
          status: 0,
          file: file
        });
      });
      this.uploadFiles = this.uploadFiles.concat(_array.splice(0, _balance));
    },
    inputChange(event) {
      this.addFiles(event.currentTarget.files);

      event.currentTarget.value = '';
    }
  },

  events: {
    'weui-file-delete': function(event, index){
      this.uploadFiles.splice(index, 1);
    }
  },

  components: {
    Cell,
    UploaderFiles,
    UploaderFile
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
  }
}
</script>
