<template>
  <mod-pop ref="pop">
    <form>
        <div class="host_add">
          <div class="host_add_business">业务分类：{{ business }}</div>
          <div class="host_add_case">方案名：<input v-model="caseName"/></div>
          <ul class="host_add_list">
            <li class="host_add_item" v-for="item in hostList">
              <p>ip：<input v-model="item.ip" /></p>
              <p>domain：<input v-model="item.domain" /></p>
              <button class="host_mod_btn">删除</button>
            </li>
          </ul>
          <button class="host_mod_btn">添加host</button>
          <button class="host_mod_btn">批量录入host</button>
        </div>
    </form>
  </mod-pop>
</template>

<script>
import eventHub from './../eventHub.js'
import ModPop from './Pop'

export default {
  components: {
    ModPop
  },
  data () {
    return {
      business: '业务名',
      caseName: 'dev',
      hostList: [
        {ip: '127.0.0.1', domain: 'www.jd.com'},
        {ip: '127.0.0.1', domain: 'www.jd.com'},
        {ip: '127.0.0.1', domain: 'www.jd.com'}
      ]
    }
  },
  created: function () {
    eventHub.$on('showModifyPop', this.showPop)
  },
  methods: {
    showPop () {
      this.$refs.pop.showPop()
    }
  }
}
</script>

<style lang="sass">
.host{
  &_add {
    width: 600px;
    height: 400px;
  }
  &_close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>