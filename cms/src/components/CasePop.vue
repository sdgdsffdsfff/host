<template>
  <mod-pop ref="pop" title="编辑方案" class="o2host_pop_case">
    <el-form :model="caseData" :rules="rules" ref="caseData" label-width="85px">
      <el-form-item label="方案名" prop="caseName" class="o2host_pop_case_name">
        <el-input v-model="caseData.caseName"></el-input>
      </el-form-item>
      <el-form-item label="方案描述" prop="caseIntro" class="o2host_pop_case_intro">
        <el-input v-model="caseData.caseIntro"></el-input>
      </el-form-item>
      <el-form-item label="HOST" class="o2host_pop_case_host">
        <div class="o2host_pop_case_host_list" v-show="!showEdit" @click="onHostFoucs">
          <div class="o2host_pop_case_host_item" v-for="(item, index) in caseData.hostList">
            <div class="o2host_pop_case_host_ip">{{item.ip}}</div>
            <div class="o2host_pop_case_host_domain">{{item.domain}}</div>
          </div>
        </div>
        <div class="o2host_pop_case_host_edit" v-show="showEdit">
          <el-input autosize v-model="hostText" type="textarea" @blur="onHostBlur" placeholder="格式如下：xx.xx.xx.xx www.xx.com（一条 host 占一行）"></el-input>
          <template v-for="(item, index) in pubHostList">
           <button type="button" class="el-button el-button--primary el-button--mini o2host_pop_case_host_pub" @mousedown="onSelectHost(index)"><i class="el-icon-plus"></i><span>{{item.name}}</span></button>
          </template>
        </div>
      </el-form-item>
    </el-form>
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
      // checkIp: (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('ip 不能为空 😫'))
      //   }
      //   var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g
      //   if (re.test(value)) {
      //     if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
      //       callback()
      //     } else {
      //       callback(new Error('ip 格式不符合 😫 ：单个字节最大为255 '))
      //     }
      //   } else {
      //     callback(new Error('ip 格式不符合 😫 ：正确格式 "x.x.x.x"'))
      //   }
      // },
      rules: {
        caseName: [
          { required: true, message: '方案名不能为空 😫', trigger: 'blur' },
          { max: 10, message: '长度不超过 10 个字符 😫', trigger: 'blur' }
        ],
        caseIntro: [
          { required: true, message: '方案描述不能为空 😫', trigger: 'blur' },
          { max: 20, message: '长度不超过 20 个字符 😫', trigger: 'blur' }
        ]
      },
      pubHostList: [
        {
          name: '32 static',
          ip: '192.168.193.32',
          domain: 'static.360buyimg.com'
        },
        {
          name: '26 static',
          ip: '192.168.101.26',
          domain: 'static.360buyimg.com'
        },
        {
          name: '32 misc',
          ip: '192.168.193.32',
          domain: 'misc.360buyimg.com'
        },
        {
          name: '26 misc',
          ip: '192.168.101.26',
          domain: 'misc.360buyimg.com'
        }
      ],
      showEdit: false,
      hostText: '',
      needBlur: true
    }
  },
  created () {
    eventHub.$on('showCasePop', this.showPop)
  },
  mounted () {
    this.pop = this.$refs.pop
  },
  methods: {
    bindEvents () {
      document.addEventListener('mouseup', this.finishSelectHost)
    },
    unbindEvents () {
      document.removeEventListener('mouseup', this.finishSelectHost)
    },
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
            this.unbindEvents()
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
            this.unbindEvents()
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
      this.unbindEvents()
    },
    showPop (obj) {
      this.bindEvents()
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
    onHostFoucs () {
      this.showEdit = true
      this.$nextTick(() => {
        document.querySelector('.o2host_pop_case_host_edit textarea').focus()
      })
    },
    onHostBlur (event) {
      if (this.needBlur) {
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
    },
    onSelectHost (idx) {
      this.needBlur = false
      this.hostText += this.pubHostList[idx].ip + ' ' + this.pubHostList[idx].domain + '\n'
    },
    finishSelectHost (event) {
      this.needBlur = true
      document.querySelector('.o2host_pop_case_host_edit textarea').focus()
      // console.log(this.needBlur)
    }
  }
}
</script>

<style lang="sass">
.o2host_pop_case {
  &_item {
    position: relative;
  }
  &_host {
    min-height: 150px;
    &_list {
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #c0ccda;
      color: #1f2d3d;
      padding: 0 10px;
      min-height: 106px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      &:hover {
        border-color: #8492a6;
      }
    }
    &_edit {
      margin-bottom: 5px;
      textarea {
        min-height: 108px;
        line-height: 24px;
      }
    }
    &_item {
      position: relative;
      border-bottom: 1px dashed #c0ccda;
      overflow: hidden;  
      .el-checkbox {
        position: absolute;
        right: 0;
      }
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
      width: 40%;
      float: left;
      padding-right: 10%;
    }
  }
  &_del {
    position: absolute;
    right: 10px;
    top: 30px;
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