// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入路由组件
import VueRouter from 'vue-router'
// 导入路由配置文件
import routes from './routes'
// 导入UI组件
import { Button, Select, Table, TableColumn, Option, Dialog, Form, FormItem, Input, Loading, Card, Alert } from 'element-ui'
import AV from './leancloud'

// 注册插件
Vue.use(VueRouter)
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Option.name, Option)
Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.use(Loading)
Vue.component(Card.name, Card)
Vue.component(Alert.name, Alert)
/* eslint-disable no-new */
// const app = new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App },
//   data: {
//     currentLocation: window.location.href
//   },
//   computed: {
//     ViewComponent () {
//       var locationArr = this.currentLocation.split('#', 2)
//       // console.log(locationArr)
//       var location = locationArr[1] ? locationArr[1] : ''
//       return require('./' + routes[location] + '.vue')
//     }
//   },
//   render (h) {
//     return h(this.ViewComponent)
//   }
// })

// window.addEventListener('popstate', () => {
//   app.currentRoute = window.location.pathname
// })

// 创建路由
const router = new VueRouter({
  routes: routes
})

router.beforeEach(({meta, path}, from, next) => {
  const isLogin = AV.User.current()
  if (!isLogin) {
    if (path === '/login') {
      console.log('未登录cur')
      next()
    } else {
      console.log('未登录jump')
      next({ path: '/login' })
    }
  } else {
    if (path === '/') {
      console.log('已登录cur')
      next()
    } else {
      console.log('已登录jump')
      next({ path: '/' })
    }
  }
})

// 实例化根组件，并绑定路由
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  render: h => h(App)
})

// Vue.directive('focus', function (el, option) {
//   var defClass = 'el-textarea'
//   var defTag = 'textarea'
//   var value = option.value || true
//   if (typeof value === 'boolean') {
//     value = { cls: defClass, tag: defTag, foc: value }
//   } else {
//     value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false }
//   }
//   if (el.classList.contains(value.cls) && value.foc) {
//     el.getElementsByTagName(value.tag)[0].focus()
//   }
// })

