<template>
  <div id="o2host" class="o2host">
    <!-- s:页面头部 -->
    <com-header></com-header>
    <!-- e:页面头部 -->
    <div class="o2host_login">
      <el-alert :title="alert.txt" class="o2host_login_alert" :type="alert.type" v-show="alert.txt"></el-alert>
      <el-form :model="loginInfo" :rules="rules" class="o2host_login_form" ref="loginInfo" label-width="80px">
        <el-form-item label="用户名" prop="uesrname" class="o2host_login_uesrname">
          <el-input placeholder="请输入用户名" v-model="loginInfo.uesrname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="o2host_login_password">
          <el-input type="password" placeholder="请输入密码" v-model="loginInfo.password"></el-input>
        </el-form-item>
        <el-form-item class="o2host_login_btn">
          <el-button type="primary" @click="submitLoginForm">确认</el-button>
          <el-button @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import AV from './leancloud.js'
// import eventHub from './eventHub.js'

import Header from './components/Header'

export default {
  name: 'o2host',
  components: {
    comHeader: Header
  },
  data () {
    return {
      loginInfo: {
        uesrname: '',
        password: ''
      },
      alert: {
        txt: '',
        type: ''
      },
      rules: {
        uesrname: [
          { required: true, message: '请输入用户名 😫', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码 😫', trigger: 'blur' }
        ]
      }
    }
  },
  created: function () {
  },
  methods: {
    submitLoginForm () {
      this.$refs['loginInfo'].validate((valid) => {
        if (valid) {
          AV.User.logIn(this.loginInfo.uesrname, this.loginInfo.password).then(loginedUser => {
            // 登出后跳转到登录页面
            this.alert = {
              txt: '登录成功！',
              type: 'success'
            }
            this.$router.push('/')
          }, error => {
            const code = error.code
            console.log(code)
            switch (code) {
              case 210:
                this.alert = {
                  txt: '用户名或密码不正确！',
                  type: 'error'
                }
                break
              case 211:
                this.alert = {
                  txt: '用户名不存在！',
                  type: 'error'
                }
                break
              case 219:
                this.alert = {
                  txt: '登录失败次数超过限制，15分钟后再试！',
                  type: 'error'
                }
                break
            }
          })
        } else {
          return false
        }
      })
    },
    resetLoginForm () {
      this.alert = {
        txt: '',
        type: ''
      }
      this.$refs['loginInfo'].resetFields()
    }
  }
}
</script>

<style>
.o2host_login {
  position: relative;
  width: 1200px;
  border-radius: 5px;
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  background: #fff;
}
.o2host_login_alert {
  text-align: center;
}
.o2host_login_form {
  width: 400px;
  padding: 50px 80px 10px 0;
  margin: 0 auto;
}
</style>