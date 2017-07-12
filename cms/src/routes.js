// export default {
//   '': 'App',
//   'login': 'Login'
// }

export default [
  {
    path: '/',
    component: resolve => require(['./Index.vue'], resolve)
  },
  {
    path: '/login',
    component: resolve => require(['./Login.vue'], resolve)
  }
]
