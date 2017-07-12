<template>
  <mod-pop ref="pop" title="编辑方案" class="o2host_pop_case">
    <div>
      <el-form :model="caseData" ref="caseData" label-width="100px">
        <el-form-item label="方案名" prop="caseName" :rules="{ required: true, message: '方案名不能为空 😫', trigger: 'blur'}" class="o2host_pop_case_name">
          <el-input v-model="caseData.caseName"></el-input>
        </el-form-item>
        <el-form-item label="方案描述" prop="caseIntro" :rules="{ required: true, message: '方案描述不能为空 😫', trigger: 'blur'}" class="o2host_pop_case_intro">
          <el-input v-model="caseData.caseIntro"></el-input>
        </el-form-item>
<!--         <div class="o2host_pop_case_list">
          <div class="o2host_pop_case_item" v-for="(item, index) in caseData.hostList">
            <div class="o2host_pop_case_host">
              <el-form-item label="ip" :prop="'hostList.' + index + '.ip'" :rules="[{required: true, message: 'ip 不能为空 😫', trigger: 'blur'}, { validator: checkIp, trigger: 'blur' }]" class="o2host_pop_case_host_ip">
                <el-input v-model="item.ip"></el-input>
              </el-form-item>
              <el-form-item label="domain" :prop="'hostList.' + index + '.domain'" :rules="{required: true, message: 'domain 不能为空 😫', trigger: 'blur'}" class="o2host_pop_case_host_domain">
                <el-input v-model="item.domain"></el-input>
              </el-form-item>
            </div>
            <div class="o2host_pop_case_del" >
              <a href="javascript:;" v-on:click="delHost(index)"><i class="el-icon-delete"></i></a>
            </div>
          </div>
        </div> -->
        <el-form-item label="HOST" class="o2host_pop_case_host">
          <div class="o2host_pop_case_host_list" v-if="!showEdit" @click="onHostFoucs">
            <div class="o2host_pop_case_host_item" v-for="(item, index) in caseData.hostList">
              <div class="o2host_pop_case_host_ip">{{item.ip}}</div>
              <div class="o2host_pop_case_host_domain">{{item.domain}}</div>
            </div>
          </div>
          <el-input v-focus="showEdit" autosize v-model="hostText" class="o2host_pop_case_host_edit" type="textarea" @blur="onHostBlur" v-else placeholder="格式如下：xx.xx.xx.xx www.xx.com（一条 host 占一行）"></el-input>
        </el-form-item>
<!--         <el-form-item class="o2host_pop_case_btn" v-show="showEdit">
          <el-button type="primary" v-on:click="onHostSave">保存</el-button>
          <el-button v-on:click="onHostCancel">取消</el-button>
        </el-form-item> -->
<!--         <template v-if="caseData.hostList.length">
          <el-table :data="caseData.hostList" class="o2host_pop_case_list">
            <el-table-column prop="ip" label="IP"></el-table-column>
            <el-table-column prop="domain" label="DOMAIN"></el-table-column>
          </el-table>
        </template>
 -->
<!--         <el-form-item class="o2host_pop_case_btn">
          <el-button v-on:click="addHost">添加host</el-button>
          <el-button v-on:click="toggleBatchHost">批量录入host</el-button>
        </el-form-item> -->

<!--         <div class="o2host_pop_case_batch J_case_batch" v-if="batch">
          <el-form-item label="批量host">
            <el-input type="textarea" v-model="batchHost" placeholder="格式如下：xx.xx.xx.xx www.xx.com（一条 host 占一行）"></el-input>
          </el-form-item>
          <el-form-item class="o2host_pop_case_btn">
            <el-button type="primary" v-on:click="saveBatchHost">保存</el-button>
            <el-button v-on:click="toggleBatchHost">取消</el-button>
          </el-form-item>
        </div> -->
      </el-form>
    </div>
<!-- 
      <div class="host_caseform_case">方案名：<input v-model="caseName"/></div>
      <ul class="host_caseform_list">
        <li class="host_caseform_item" v-for="(item, index) in hostList">
          <p>ip：<input v-model="item.ip" /></p>
          <p>domain：<input v-model="item.domain" /></p>
          <button class="host_mod_btn" v-on:click="delHost(index)">删除</button>
        </li>
      </ul>
      <button class="host_mod_btn" v-on:click="addHost">添加host</button>
      <button class="host_mod_btn">批量录入host</button>
 -->
  </mod-pop>
</template>

<script>
import AV from './../leancloud.js'
import { Message } from 'element-ui'

import eventHub from './../eventHub.js'
import ModPop from './Pop'

export default {
  components: {
    ModPop
  },
  props: {
    curBusiness: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      caseData: {
        id: '',
        caseName: '',
        caseIntro: '',
        hostList: []
      },
      checkIp: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('ip 不能为空 😫'))
        }
        var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g
        if (re.test(value)) {
          if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
            callback()
          } else {
            callback(new Error('ip 格式不符合 😫 ：单个字节最大为255 '))
          }
        } else {
          callback(new Error('ip 格式不符合 😫 ：正确格式 "x.x.x.x"'))
        }
      },
      // batch: false,
      // batchHost: '',
      showEdit: false,
      hostText: ''
    }
  },
  created () {
    eventHub.$on('showCasePop', this.showPop)
  },
  mounted () {
    this.pop = this.$refs.pop
  },
  methods: {
    addFn () {
      this.$refs['caseData'].validate((valid) => {
        if (valid) {
          eventHub.$emit('submitData')
          var Business = AV.Object.createWithoutData('BUSINESS', this.curBusiness)
          var Case = new AV.Object('CASE')
          Case.set('business', Business) // 设置方案所属的业务名business
          Case.set('name', this.caseData.caseName) // 设置方案名case
          Case.set('intro', this.caseData.caseIntro) // 设置方案名case
          Case.set('host', this.caseData.hostList) // 设置该方案下的host
          Case.save().then(function (results) { // 存储Case数据
            eventHub.$emit('addHostData', results)
            this.hostText = ''
            Message.success('添加成功 😃')
          })
        } else {
          // console.log('error submit!!')
          // Message.error('添加失败 😫')
          return false
        }
      })
    },
    modifyFn () {
      this.$refs['caseData'].validate((valid) => {
        if (valid) {
          eventHub.$emit('submitData')
          var Case = AV.Object.createWithoutData('CASE', this.caseData.id)
          Case.set('name', this.caseData.caseName) // 设置方案名case
          Case.set('intro', this.caseData.caseIntro) // 设置方案名case
          Case.set('host', this.caseData.hostList) // 设置该方案下的host
          Case.save().then(function (results) { // 存储Case数据
            eventHub.$emit('modifyHostData', results)
            Message.success('修改成功 😃')
          })
        } else {
          // console.log('error submit!!')
          // Message.error('修改失败 😫')
          return false
        }
      })
    },
    cancelFn () {
      this.$refs['caseData'].resetFields()
    },
    showPop (obj) {
      this.hostText = ''
      switch (obj.type) {
        case 'add':
          this.business = obj.obj.name
          this.caseData.id = ''
          this.caseData.caseName = ''
          this.caseData.caseIntro = ''
          this.caseData.hostList = []
          this.pop.showPop(this.addFn, this.cancelFn)
          // eventHub.$emit('showPop', this.addFn, this.cancelFn)
          break
        case 'modify':
          this.caseData.id = JSON.parse(JSON.stringify(obj.obj.id))
          this.caseData.caseName = JSON.parse(JSON.stringify(obj.obj.caseName))
          this.caseData.caseIntro = JSON.parse(JSON.stringify(obj.obj.caseIntro))
          this.caseData.hostList = JSON.parse(JSON.stringify(obj.obj.hostList))
          this.pop.showPop(this.modifyFn, this.cancelFn)
          // eventHub.$emit('showPop', this.modifyFn, this.cancelFn)
          break
      }
      // this.showEdit = !(this.caseData.hostList.length > 0)
      this.caseData.hostList.map((item) => {
        this.hostText += item.ip + ' '
        this.hostText += item.domain + '\n'
      })
    },
    // addHost () {
    //   this.caseData.hostList.push({ip: '', domain: ''})
    // },
    delHost (i) {
      this.caseData.hostList.splice(i, 1)
    },
    onHostFoucs () {
      this.showEdit = true
    },
    onHostBlur () {
      this.caseData.hostList = []
      const textArr = this.hostText.split(/\s+/g).filter(String)
      for (let index = 0; index < textArr.length; index += 2) {
        const idx = Math.floor(index / 2)
        this.caseData.hostList[idx] = {
          id: '',
          ip: textArr[index] || '',
          domain: textArr[index + 1] || ''
        }
      }
      this.showEdit = false
    }
  }
}
</script>

<style scoped lang="sass">
.o2host_pop_case {
  &_item {
    position: relative;
  }
  &_host {
    &_list {
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #c0ccda;
      color: #1f2d3d;
      padding: 3px 10px;
      min-height: 28px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      &:hover {
        border-color: #8492a6;
      }
    }
    &_item {
      border-bottom: 1px dashed #c0ccda;
      overflow: hidden;
      &:last-child {
        border-bottom: none;
      }
    }
    &_tips {
      font-size: 14px;
      line-height: 28px;
      color: #99a9bf;
    }
    &_ip,
    &_domain {
      width: 50%;
      float: left;
    }
  }
  &_del {
    position: absolute;
    right: 10px;
    top: 30px;
  }
  &_batch {
    border-top: 1px dashed #c0ccda;
    padding: 20px 0 0;
  }
}
.o2host_pop_case_del {
  a {
    font-size: 16px;
    padding: 5px;
    color: #20A0FF;
    &:hover {
      color: #58B7FF;
    }  
  }
}
</style>