<template>
  <header class="o2host_header">
    <div class="o2host_header_main">
      <h1 class="o2host_tit">
        <div class="o2host_logo">
          <i class="o2host_logo_top"></i>
          <i class="o2host_logo_bottom"></i>
        </div>
        O2HOST
      </h1>
      <div class="o2host_user" v-show="showUser">
        <img class="o2host_user_photo" src="../images/logo.png" />
        <span class="o2host_user_name">{{ user.name }}</span>
        <a href="javascript:;" @click="logout" class="o2host_user_logout">退出</a>
      </div>
    </div>
  </header>
</template>

<script>
import AV from './../leancloud.js'

export default {
  name: 'hd',
  data () {
    return {
      user: {
        name: '',
        photo: ''
      },
      showUser: false
    }
  },
  created () {
    const user = AV.User.current()
    if (user) {
      this.showUser = true
      this.user.name = user.get('username')
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    logout () {
      AV.User.logOut().then(() => {
        // 登出后跳转到登录页面
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="sass">
.o2host_header {
  position: relative;
  height: 100px;
  background: linear-gradient(to right, #1F2D3D, #475669);
  &_main {
    position: relative;
    max-width: 1200px;
    min-width: 990px;
    height: 100%;
    margin: 0 auto;
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: url("https://aotu.io/img/ball_1408.png") 50% 50% no-repeat;
    background-size: auto 1200px;
    opacity: 0.1;
  }
}
.o2host_logo {
  position: absolute;
  width: 46px;
  height: 46px;
  top: 27px;
  left: 10px;
  &_top,
  &_bottom {
    position: absolute;
    width: 46px;
    height: 23px;
    left: 0;
  }
  &_top {
    top: 0;
    &:before,
    &:after {
      content: ''; 
      position: absolute;
      width: 16px;
      height: 16px;
      border: 3px solid #fff;
      top: 0;
    }
    &:before {
      border-radius: 50% 50% 0 50%;  
      left: 0;
    }
    &:after {
      border-color: #20a0ff;
      border-radius: 50% 0 50% 0; 
      left: 24px;
      top: 0;
    }
  }
  &_bottom {
    top: 24px;
    &:before,
    &:after {
      content: ''; 
      position: absolute;
      width: 16px;
      height: 16px;
      border: 3px solid #fff;
      top: 0;
    }
    &:before {
      border-radius: 50% 0 50% 50%;  
      left: 0;
    }
    &:after {
      border-radius: 0 50% 50% 50%;  
      left: 24px;
    }
  }
}
.o2host_tit {
  float: left;
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  color: #fff;
  padding-left: 70px;
  left: 0;
}
.o2host_user {
  float: right;
  height: 80px;
  margin-top: 20px;
  &_name,
  &_logout {
    display: inline-block;
    margin: 40px 15px 0 0;
  }
  &_name {
    color: #fff;
  }
  &_logout {
    color: #8492A6;
  }
  &_photo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
