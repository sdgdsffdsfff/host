<template>
  <v-form v-model="valid" ref="form" class="o2_login_form_bd" lazy-validation>
    <h3 class="o2_login_form_hd headline">
      欢迎注册
    </h3>
    <v-text-field
      label="姓名"
      prepend-icon="person"
      class="o2_login_form_item o2_login_form_txt o2_login_form_name"
      v-model="userInfo.username"
      single-line
      :counter="10"
      :rules="rules.username"
      required />
    <v-text-field
      label="密码"
      prepend-icon="lock"
      class="o2_login_form_item o2_login_form_txt o2_login_form_password"
      v-model="userInfo.password"
      single-line
      type="password"
      :rules="rules.password"
      counter
      required />
    <v-text-field
      label="确认密码"
      prepend-icon="lock"
      class="o2_login_form_item o2_login_form_txt o2_login_form_password"
      v-model="passwordVerify"
      single-line
      type="password"
      :rules="rules.passwordVerify"
      counter
      required />
    <v-text-field
      label="邮箱"
      prepend-icon="email"
      class="o2_login_form_item o2_login_form_txt o2_login_form_email"
      v-model="userInfo.email"
      single-line
      :rules="rules.email"
      required />
    <v-btn
      block
      dark
      large
      @click="register"
      color="indigo"
      class="o2_login_form_btn register" >
      注册
    </v-btn>
    <v-btn
      block
      large
      flat
      :to="{ name: 'Login' }"
      class="o2_login_form_btn indigo--text" >
      登录
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    data () {
      return {
        valid: false,
        userInfo: {
          username: '',
          password: '',
          email: ''
        },
        passwordVerify: '',
        rules: {
          username: [
            (v) => !!v || '请输入姓名',
            (v) => v && v.length <= 10 || '不超过10个字符',
            (v) => v && v.length >= 3 || '不少于10个字符'
          ],
          password: [
            (v) => !!v || '请输入密码',
            (v) => v && v.length <= 20 || '不超过20个字符',
            (v) => v && v.length >= 6 || '不少于6个字符'
          ],
          passwordVerify: [
            (v) => !!v || '请再次输入密码',
            (v) => v && v === this.userInfo.password || '两次输入密码不相同'
          ],
          email: [
            (v) => !!v || '请输入邮箱',
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || '邮箱格式有误'
          ]
        }
      }
    },
    methods: {
      register () {
        this.$refs.form.validate()
          && this.$store.dispatch('USER_REGISTER', this.userInfo)
          .then(() => {
            this.$router.push({ name: 'Login' })
          }).catch(error => {
            alert(error)
          })
      }
    }
  }
</script>
