<template>
<!--   <div class="host_mod_pop" v-show="show">
    <div class="host_mod_pop_main">
      <slot></slot>
      <a href="javascript:;" class="host_mod_pop_close" v-on:click="CancelFn">X</a>
      <button class="host_mod_btn" v-on:click="ConfirmFn">确定</button>
      <button class="host_mod_btn" v-on:click="CancelFn">取消</button>
    </div>
  </div>
 -->
<el-dialog :title="title" v-model="show" @close="CancelFn" size="small" class="o2host_pop">
  <slot></slot>
  <span slot="footer" class="dialog-footer o2host_pop_btns J_pop_btns">
    <el-button @click="CancelFn">取 消</el-button>
    <el-button type="primary" @click="ConfirmFn" :loading="confirmLoading">确 定</el-button>
  </span>
</el-dialog>

</template>

<script>
import eventHub from './../eventHub.js'

export default {
  name: 'mod-pop',
  components: {
  },
  props: {
    title: {
      type: String,
      default: '提示'
    }
  },
  data () {
    return {
      show: false,
      confirmFn: null,
      cancelFn: null,
      confirmLoading: false
    }
  },
  created: function () {
    // eventHub.$on('showPop', this.showPop)
    eventHub.$on('addData', this.closePop)
    eventHub.$on('modifyData', this.closePop)
    eventHub.$on('delData', this.closePop)
    eventHub.$on('addHostData', this.closePop)
    eventHub.$on('modifyHostData', this.closePop)
    eventHub.$on('delHostData', this.closePop)
    eventHub.$on('submitData', this.setComfirmLoading)
  },
  methods: {
    CancelFn () {
      this.closePop()
      this.cancelFn && this.cancelFn()
    },
    ConfirmFn () {
      this.confirmFn && this.confirmFn()
    },
    showPop (confirmFn, cancelFn) {
      this.show = true
      this.confirmFn = confirmFn
      this.cancelFn = cancelFn
    },
    closePop () {
      this.show = false
      this.confirmLoading = false
    },
    setComfirmLoading () {
      this.confirmLoading = true
    }
  }
}
</script>

<style lang="sass">
/*
.host_mod_pop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  &_main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
  }
  &_close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
*/
</style>