<template>
  <mod-pop ref="pop" class="o2host_pop_confirm">
    <p>{{ confirmText }}</p>
  </mod-pop>
</template>

<script>
import AV from './../leancloud.js'
import eventHub from './../eventHub.js'
import ModPop from './Pop'
import { Message } from 'element-ui'

export default {
  components: {
    ModPop
  },
  data () {
    return {
      type: '',
      objId: '',
      confirmText: ''
    }
  },
  created () {
    eventHub.$on('showConfirmPop', this.showPop)
  },
  mounted () {
    this.pop = this.$refs.pop
  },
  methods: {
    showPop (obj) {
      this.type = obj.type
      this.objId = obj.obj.id
      this.confirmText = obj.text
      this.pop.showPop(this.delFn, null)
    },
    delFn () {
      switch (this.type) {
        case 'business':
          var business = AV.Object.createWithoutData('BUSINESS', this.objId)
          business.set('status', 0)
          business.save().then(function (results) {
            eventHub.$emit('delData', results)
            Message.success('删除成功 😃')
          })
          break
        case 'case':
          var Case = AV.Object.createWithoutData('CASE', this.objId)
          Case.set('status', 0)
          Case.save().then(function () {
            eventHub.$emit('delHostData', Case)
            Message.success('删除成功 😃')
          })
          break
      }
    }
  }
}
</script>

<style lang="sass">

</style>