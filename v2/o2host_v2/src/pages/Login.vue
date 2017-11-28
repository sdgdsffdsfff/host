<template>
  <v-container fill-height fluid class="o2_login">
    <v-layout fill-height wrap align-center class="o2_login_main">
      <v-flex fill-height sm6 md9>
        <div class="o2_login_cover">
          <h1 class="display-1 o2_login_logo">O2HOST</h1>
          <h2 class="display-3 o2_login_cms">
            content management system
            <p class='headline'>内容管理系统</p>
          </h2>
        </div>
      </v-flex>
      <v-flex fill-height sm6 md3>
        <v-layout align-center justify-center class="o2_login_form">
          <v-flex xs10>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LoginForm from '@/components/LoginForm'
  import RegisterForm from '@/components/RegisterForm'
  export default {
    components: {
      comLoginForm: LoginForm,
      comRegisterForm: RegisterForm
    },
    data () {
      return {
        isLogin: true
      }
    },
    methods: {
      toggle () {
        this.isLogin = !this.isLogin
      }
    }
  }
</script>

<style lang="scss">
.o2_login {
  position: relative;
  padding: 25px 25px 40px;
  background: url(../assets/bg.jpg) no-repeat;
  background-size: cover;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(63, 81, 181, 0.7);
  }
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  &_main {
    position: relative;
    z-index: 1;
    background: url(../assets/bg.jpg) no-repeat;
    background-size: cover;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(63, 81, 181, 0.7);
    } 
  }
  &_cover {
    position: relative;
    height: 100%;
    z-index: 1;
    color: #fff;
  }
  &_logo {
    position: absolute;
    top: 30px;
    left: 30px;
  }
  &_cms {
    position: absolute;
    text-align: right;
    text-transform:uppercase;
    bottom: 180px;
    right: 80px;
  }
  &_form {
    position: relative;
    z-index: 1;
    background: #fff;
    text-align: center;
    &_hd {
      position: relative;
      display: inline-block;
      height: 45px;
      line-height: 45px;
      margin-bottom: 50px; 
      &:after {
        content: '';
        position: absolute;
        width: 50%;
        height: 3px;
        background: #3f51b5;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    &_btn {
      margin-bottom: 10px;
      &.register {
        margin-top: 30px;
      }
    }
    &_checkbox {
      margin-top: 20px;
      i {
        line-height: 30px;
      }
    }
    &_login:nth-child(1) {
      margin-top: 50px;
    }
  }
}
</style>
