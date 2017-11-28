import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import ProjectList from '@/pages/ProjectList'
import ProjectDetail from '@/pages/ProjectDetail'
import Add from '@/pages/Add'

import Footer from '@/components/Footer'
import Nav from '@/components/Navigation'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      components: {
        default: Login,
        footer: Footer
      },
      children: [
        {
          path: '',
          component: LoginForm
        },
        {
          path: 'login',
          name: 'Login',
          component: LoginForm
        },
        {
          path: 'register',
          name: 'Register',
          component: RegisterForm
        }
      ]
    },
    {
      path: '/list',
      name: 'ProjectList',
      components: {
        default: ProjectList,
        footer: Footer,
        nav: Nav
      }
    },
    {
      path: '/detail',
      name: 'ProjectDetail',
      components: {
        default: ProjectDetail,
        footer: Footer,
        nav: Nav
      }
    },
    {
      path: '/add',
      name: 'Add',
      components: {
        default: Add,
        footer: Footer,
        nav: Nav
      }
    }
  ]
})
