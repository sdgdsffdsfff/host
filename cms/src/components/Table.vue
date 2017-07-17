<template>
	<div class="o2host_case" v-loading.body="loading" element-loading-text="玩命加载中～">
    <template v-if="host.length == 0")>
    <div class="o2host_case_blank">
      <img class="o2host_case_blank_img" src="../images/blank.png">
      <p v-if="curBusiness" class="o2host_case_blank_txt">暂无数据</p>
      <p v-else class="o2host_case_blank_txt">请选择或新增业务</p>
    </div>
    </template>
    <template v-else>
    <div class="o2host_case_item" v-for="(item,index) in host">
      <div class="o2host_case_tit">
        <h3>{{ item.caseName }}</h3> - <aside>{{ item.caseIntro }}</aside>
        <div class="o2host_case_operate">
          <a class="o2host_case_modify" href="javascript:;" @click="showCaseModifyPop(index)" ><i class="el-icon-edit"></i></a>
          <a class="o2host_case_del" href="javascript:;" @click="showConfirmPop(index)" ><i class="el-icon-delete"></i></a>
        </div>
      </div>
      <el-table :data="item.hostList" border style="width: 1200px" empty-text="Oops～没有数据～" class="o2host_case_host">
        <el-table-column prop="ip" label="ip" class="o2host_case_host_ip"></el-table-column>
        <el-table-column prop="domain" label="domain" class="o2host_case_host_domain"></el-table-column>
      </el-table>
    </div>
    </template>
	</div>
</template>

<script>
import AV from './../leancloud.js'
import eventHub from './../eventHub.js'

export default {
  name: 'table',
  props: {
    curBusiness: {
      type: String,
      default: ''
    }
    // businessArr: {
    //   type: Array,
    //   default: ''
    // }
  },
  data () {
    return {
      host: [],
      loading: false
    }
  },
  created: function () {
    eventHub.$on('addHostData', this.addData)
    eventHub.$on('modifyHostData', this.modifyData)
    eventHub.$on('delHostData', this.delData)
    eventHub.$on('queryHostData', this.queryData)
  },
  methods: {
    queryData (id) {
      if (id === '') {
        this.host = []
      } else {
        this.loading = true // 添加loading动画
        var self = this
        var Business = AV.Object.createWithoutData('BUSINESS', id)
        var businessQuery = new AV.Query('CASE')
        businessQuery.equalTo('business', Business)
        var statusQuery = new AV.Query('CASE')
        statusQuery.equalTo('status', 1)
        var query = AV.Query.and(businessQuery, statusQuery)
        query.find().then(function (results) {
          var hostArr = []
          if (results.length === 0) {
            self.host = hostArr
            self.loading = false // 去掉loading动画
          } else {
            results.forEach(function (caseItem) {
              hostArr.push({
                id: caseItem.id,
                caseName: caseItem.get('name'),
                caseIntro: caseItem.get('intro'),
                hostList: caseItem.get('host')
              })
            })
            self.host = hostArr
            self.loading = false // 去掉loading动画
          }
        })
      }
    },
    addData (caseItem) {
      this.host.push({
        id: caseItem.id,
        caseName: caseItem.get('name'),
        caseIntro: caseItem.get('intro'),
        hostList: caseItem.get('host')
      })
    },
    modifyData (caseItem) {
      for (var i = 0; i < this.host.length; i++) {
        if (this.host[i].id === caseItem.id) {
          var item = this.host[i]
          item.caseName = caseItem.get('name')
          item.caseIntro = caseItem.get('intro')
          item.hostList = caseItem.get('host')
        }
      }
    },
    delData (caseItem) {
      for (var i = 0; i < this.host.length; i++) {
        var item = this.host[i]
        if (item.id === caseItem.id) {
          this.host.splice(i, 1)
        }
      }
    },
    showCaseModifyPop (i) {
      eventHub.$emit('showCasePop', {
        type: 'modify',
        obj: this.host[i]
      })
    },
    showConfirmPop (i) {
      eventHub.$emit('showConfirmPop', {
        type: 'case',
        obj: this.host[i],
        text: '确定要删除“' + this.host[i].caseName + '”方案吗？'
      })
    }
  }
}
</script>

<style lang="sass">
.o2host_case {
  position: relative;
  padding: 30px 20px 10px;
  border-radius: 5px;
  margin: 20px 0; 
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  background: #fff;
  overflow: hidden;
  &_item,
  &_blank {
    margin-bottom: 30px;
  }
  &_blank {
    text-align: center;
    opacity: 0.3;
    &_img {
      display: block;
      margin: 100px auto 20px;
      width: 300px;
    }
    &_txt {
      color: #475669;
      margin-bottom: 100px;
    }
  }
  &_tit {
    position: relative;
    margin-bottom: 10px;
    h3 {
      position: relative;
      display: inline-block;
      font-size: 16px;
      color: #324057;
      padding-left: 10px;
      &:before {
        content: "";
        position: absolute;
        width: 2px;
        height: 100%;
        left: 0;
        top: 0;
        background: #324057;
      }
    }
    aside {
      display: inline-block;
      font-size: 12px;
      color: #99A9BF;
    }
  }
  &_operate {
    position: absolute;
    right: 0;
    top: 0;
    a {
      font-size: 16px;
      padding: 5px;
      color: #20A0FF;
      &:hover {
        color: #58B7FF;
      }
    }
  }
}
</style>