<template>
  <mod-pop ref="pop" title="编辑业务" class="o2host_pop_business">
    <el-form :model="business" :rules="rules" ref="business" label-width="80px">
      <el-form-item label="业务名" prop="name" class="o2host_pop_business_name">
        <el-input v-model="business.name"></el-input>
      </el-form-item>
      <div v-for="(item, index) in business.urlList" class="o2host_pop_business_url">
        <div class="o2host_pop_business_url_item">
          <el-form-item :label="'地址'+(index+1)" prop="url">
            <el-input placeholder="请输入页面ID" v-model="item.url" v-if="item.isCms">
              <template slot="prepend">{{cmsPrefix}}</template>
            </el-input>
            <el-input class="o2host_pop_business_url_input" v-model="item.url" v-else></el-input>
          </el-form-item>
          <div class="o2host_pop_business_del">
            <a href="javascript:;" v-on:click="delUrl(index)"><i class="el-icon-delete"></i></a>
          </div>
        </div>
      </div>
      <el-form-item class="o2host_pop_business_btn">
        <el-button v-on:click="addUrl(false)">添加地址</el-button>
        <el-button v-on:click="addUrl(true)">添加CMS地址</el-button>
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
  data () {
    return {
      cmsPrefix: 'portal.cms.jd.com/preview/preview/preview/',
      business: {
        id: '',
        name: '',
        urlList: []
      },
      rules: {
        name: [
          { required: true, message: '业务名不能为空 😫', trigger: 'blur' },
          { max: 20, message: '长度不超过 20 个字符', trigger: 'blur' }
        ]
        // url: [
        //   { required: true, message: 'url不能为空 😫', trigger: 'blur' }
        // ]
      }
    }
  },
  created () {
    eventHub.$on('showBusinessPop', this.showPop)
  },
  mounted () {
    this.pop = this.$refs.pop
  },
  methods: {
    delEmptyUrl () {
      let urlList = []
      this.business.urlList.map((item) => {
        if (item.url !== '') {
          urlList.push(item)
        }
      })
      this.business.urlList = urlList
    },
    addFn () {
      this.$refs['business'].validate((valid) => {
        if (valid) {
          this.delEmptyUrl()
          eventHub.$emit('submitData')
          const BusinessData = AV.Object.extend('BUSINESS')
          const business = new BusinessData()
          let url = []
          this.business.urlList.map((item) => {
            url.push({
              url: item.isCms ? this.cmsPrefix + item.url : item.url,
              isCms: item.isCms
            })
          })
          console.log(url)
          business.set('name', this.business.name)
          business.set('url', url)
          business.save().then(function (results) {
            eventHub.$emit('addData', results)
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
      this.$refs['business'].validate((valid) => {
        if (valid) {
          this.delEmptyUrl()
          eventHub.$emit('submitData')
          const business = AV.Object.createWithoutData('BUSINESS', this.business.id)
          let url = []
          this.business.urlList.map((item) => {
            url.push({
              url: item.isCms ? this.cmsPrefix + item.url : item.url,
              isCms: item.isCms
            })
          })
          business.set('name', this.business.name)
          business.set('url', url)
          business.save().then(function (results) {
            eventHub.$emit('modifyData', results)
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
      this.$refs['business'].resetFields()
    },
    showPop (obj) {
      this.business.urlList = []
      switch (obj.type) {
        case 'add':
          this.business = {
            id: '',
            name: '',
            urlList: []
          }
          // eventHub.$emit('showPop', this.addFn, this.cancelFn)
          this.pop.showPop(this.addFn, this.cancelFn)
          break
        case 'modify':
          this.business.id = JSON.parse(JSON.stringify(obj.data.id))
          this.business.name = JSON.parse(JSON.stringify(obj.data.name))
          obj.data.urlList.map((item) => {
            this.business.urlList.push({
              url: item.isCms ? item.url.replace(this.cmsPrefix, '') : item.url,
              isCms: item.isCms
            })
          })
          // eventHub.$emit('showPop', this.modifyFn, this.cancelFn)
          this.pop.showPop(this.modifyFn, this.cancelFn)
          break
      }
    },
    addUrl (isCms) {
      // const url = isCms ? this.cmsPrefix : ''
      this.business.urlList.push({ url: '', isCms: isCms })
      // const urlLen = this.business.urlList.length
      // console.log(document.querySelectorAll('.o2host_pop_business_url_input'))
      // document.querySelectorAll('.o2host_pop_business_url_input')[urlLen - 1].foucs()
    },
    delUrl (i) {
      this.business.urlList.splice(i, 1)
    }
  }
}
</script>

<style scoped lang="sass">
.o2host_pop_business{
  &_url{
    &_item {
      position: relative;
      padding: 0 40px 0 0;
    }
    &_cms {
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid #c0ccda;
      height: 34px;
      span {
        position: absolute;
        padding: 0 10px;
        background: #EFF2F7;
        height: 34px;
        line-height: 34px;
        color: #c0ccda;
      }
      .el-input__inner {
        padding-left: 320px;
        border: none;
        height: 34px;
      }
    }
  }
  &_del {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
.o2host_pop_business_del {
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