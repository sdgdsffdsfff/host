<template>
  <v-form ref="form" class="o2_login_form_bd" lazy-validation>
    <h3 class="o2_login_form_hd headline">
      欢迎登录
    </h3>
    <v-text-field
      label="姓名/邮箱"
      prepend-icon="person"
      class="o2_login_form_item o2_login_form_txt o2_login_form_name"
      v-model="userInfo.username"
      single-line
      :rules="rules.nameRules"
      required />
    <v-text-field
      label="密码"
      prepend-icon="lock"
      class="o2_login_form_item o2_login_form_txt o2_login_form_password"
      v-model="userInfo.password"
      single-line
      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
      :append-icon-cb="() => (showPassword = !showPassword)"
      :type="showPassword ? 'password' : 'text'"
      :rules="rules.passwordRules"
      counter
      required />
    <v-checkbox
      label="记住我的状态"  
      class="o2_login_form_item o2_login_form_checkbox o2_login_form_remember"
      v-model="remember" />
    <v-btn
      block
      dark
      large
      @click="login"
      color="indigo"
      class="o2_login_form_btn" >
      登录
    </v-btn>
    <v-btn
      block
      large
      flat
      :to="{ name: 'Register' }"
      class="o2_login_form_btn indigo--text" >
      注册
    </v-btn>
  </v-form>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    // computed: {
    //   ...mapState({
    //     userInfo: {
    //       username: state => state.userInfo.username || '',
    //       password: ''
    //     }
    //   })
    // },
    data () {
      return {
        userInfo: {
          username: '',
          password: ''
        },
        rules: {
          nameRules: [
            (v) => !!v || '请输入姓名/邮箱'
          ],
          passwordRules: [
            (v) => !!v || '请输入密码'
          ]
        },
        showPassword: true,
        remember: true
      }
    },
    methods: {
      login () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('USER_LOGIN', this.userInfo)
            .then(() => {
              this.$router.push({ name: 'ProjectList' })
            }).catch(error => {
              alert(error)
            })
          this.remember ? this.$store.dispatch('SET_USER_COOKIE') : this.$store.dispatch('DEL_USER_COOKIE')
        }
      }
    }
  }
</script>
