<template>
	<div class="o2host_business">
	  <h2 class="o2host_business_tit">业务分类：</h2>
    <div class="o2host_business_ctn">
      <el-select v-model="curBusiness" :loading="loading" loading-text="玩命加载中～" filterable @change="selectBusiness" placeholder="请选择业务" class="o2host_business_select" :class="{ loaded: !loading }">
        <el-option v-for="(item, index) in businessArr" :label="item.name" :value="item.id">
          <span class="o2host_business_name">{{ item.name }}</span>
          <span class="o2host_business_operate">
            <a href="javascript:;" @click.stop="showBusinessModifyPop(index)" class="o2host_business_modify"><i class="el-icon-edit"></i></a>
            <a href="javascript:;" @click.stop="showConfirmPop(item)" class="o2host_business_del"><i class="el-icon-delete"></i></a>
          </span>
        </el-option>
        <li><a class="o2host_business_add" href="javascript:;" @click="showBusinessAddPop">
          <i class="el-icon-plus"></i> 新增业务
        </a></li>
      </el-select>
    </div>
    <el-button class="o2host_business_btn" @click="showCaseAddPop" type="primary" v-show="curBusiness">新增方案</el-button>
	</div>
</template>

<script>
import AV from './../leancloud.js'
import eventHub from './../eventHub.js'

export default {
  // props: {
  //   curBusiness: {
  //     type: String,
  //     default: ''
  //   },
  //   businessArr: {
  //     type: Array,
  //     default: []
  //   }
  // },
  data () {
    return {
      businessArr: [],
      loading: true,
      curBusiness: ''
    }
  },
  created: function () {
    // 查找业务数据并赋值给 businessArr
    const query = new AV.Query('BUSINESS')
    let businessArr = []
    query.equalTo('status', 1)
    query.find().then((results) => {
      results.map((item) => {
        let obj = {
          id: item.id,
          name: item.get('name'),
          urlList: item.get('url')
        }
        businessArr.push(obj)
      })
      this.businessArr = businessArr
      // 通知 Business 业务数据拉取完成
      eventHub.$emit('finishQueryHostData', businessArr)
      this.showData()
    })
    eventHub.$on('addData', this.addBusiness)
    eventHub.$on('modifyData', this.modifyBusiness)
    eventHub.$on('delData', this.delBusiness)
    // eventHub.$on('finishQueryHostData', this.showData)
  },
  methods: {
    showData () {
      this.loading = false
    },
    getCurObj (id) {
      for (var i = 0; i < this.businessArr.length; i++) {
        var item = this.businessArr[i]
        if (item.id === id) {
          return item
        }
      }
    },
    showCaseAddPop () {
      const cur = this.curBusiness
      eventHub.$emit('showCasePop', {
        type: 'add',
        obj: this.getCurObj(cur)
      })
    },
    showBusinessAddPop () {
      eventHub.$emit('showBusinessPop', {
        type: 'add',
        data: ''
      })
    },
    showBusinessModifyPop (idx) {
      eventHub.$emit('showBusinessPop', {
        type: 'modify',
        data: this.businessArr[idx]
      })
    },
    showConfirmPop (obj) {
      eventHub.$emit('showConfirmPop', {
        type: 'business',
        obj: obj,
        text: '确定要删除“' + obj.name + '”业务吗？'
      })
    },
    selectBusiness (id) {
      if (id !== this.curBusiness) {
        // this.$data.cur = id
        this.curBusiness = id
        // this.$emit('selectBusiness', id)
      }
      // 将curBusiness数据传递给comTable
      eventHub.$emit('queryHostData', this.curBusiness)
    },
    addBusiness (obj) {
      this.businessArr.push({
        id: obj.id,
        name: obj.get('name'),
        urlList: obj.get('url')
      })
      this.curBusiness = obj.id
    },
    modifyBusiness (obj) {
      this.businessArr.map((item) => {
        if (item.id === obj.id) {
          item.name = obj.get('name')
          item.urlList = obj.get('url')
        }
      })
      this.curBusiness = obj.id
    },
    delBusiness (obj) {
      for (var i = 0; i < this.businessArr.length; i++) {
        var item = this.businessArr[i]
        if (item.id === obj.id) {
          this.businessArr.splice(i, 1)
        }
      }
      this.curBusiness = ''
    }
  }
}
</script>

<style lang="sass">
.o2host_business {
  position: relative;
  margin-top: 20px;
  z-index: 1;
  &_tit {
    position: absolute;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    font-weight: bold;
    color: #324057;
  }
  &_btn {
    position: absolute;
    left: 505px;
    top: 0;
  }
  &_ctn {
    width: 400px;
    padding-left: 85px;
  }
  &_select.loaded {
  }
  &_operate {
    float: right;
    opacity: 0;
    transition: all 0.2s ease;
    a {
      font-size: 16px;
      color: #20A0FF;
      padding: 5px;
      &:hover {
        color: #58B7FF;
      }
    }
  }
  &_add {
    position: relative;
    text-align: center;
    display: block;
    font-size: 14px;
    padding: 8px 10px;
    height: 21px;
    line-height: 21px;
    cursor: pointer;
    border-top: 1px dashed #c0ccda;
    color: #20A0FF;
    &:hover {
      color: #58B7FF;
      text-decoration: none;
    }
  }
}
.el-select-dropdown__item.selected {
  .o2host_business_operate {
    a {
      color: #fff;
    }
  }
}
.el-select-dropdown__item.hover {
  .o2host_business_operate {
    opacity: 1;
  }
}
</style>