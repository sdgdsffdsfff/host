<template>
  <div class="o2host_wrapper">
    <!-- s:页面头部 -->
    <com-header></com-header>
    <!-- e:页面头部 -->
    <div class="o2host_ctn">
      <!-- s:业务下拉框 -->
      <com-business :curBusiness="curBusiness"></com-business>
      <!-- e:业务下拉框 -->
      <!-- s:host方案数据列表 -->
      <com-table :curBusiness="curBusiness"></com-table>
      <!-- e:host方案数据列表 -->
    </div>
    <!-- s:确认弹窗 -->
    <com-confirm-pop></com-confirm-pop>
    <!-- e:确认弹窗 -->
    <!-- s:业务新增/修改弹窗 -->
    <com-business-pop></com-business-pop>
    <!-- e:业务新增/修改弹窗 -->
    <!-- s:host方案新增/修改弹窗 -->
    <com-case-pop :curBusiness="curBusiness"></com-case-pop>
    <!-- e:host方案新增/修改弹窗 -->
  </div>
</template>

<script>
// import AV from './leancloud.js'
import eventHub from './eventHub.js'

import Header from './components/Header'
import Business from './components/Business'
import Table from './components/Table'
import ConfirmPop from './components/ConfirmPop'
import CasePop from './components/CasePop'
import BusinessPop from './components/BusinessPop'

export default {
  name: 'o2host',
  components: {
    comHeader: Header,
    comBusiness: Business,
    comTable: Table,
    comConfirmPop: ConfirmPop,
    comCasePop: CasePop,
    comBusinessPop: BusinessPop
  },
  created () {
    eventHub.$on('queryHostData', this.setCurBusiness)
  },
  data () {
    return {
      curBusiness: ''
    }
  },
  methods: {
    setCurBusiness (cur) {
      this.curBusiness = cur
    }
  }
}
</script>
