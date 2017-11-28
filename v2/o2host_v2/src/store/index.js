import Vue from 'vue'
import Vuex from 'vuex'
import Parse from './../parse'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    showNav: true,
    userInfo: {
      username: '',
      email: '',
      avatar: ''
    }
  },
  mutations: {
    TOGGLE_NAV: (state) => {
      state.showNav = !state.showNav
    },
    SET_USER_INFO: (state, { userInfo }) => {
      state.userInfo = {
        username: userInfo.get('username'),
        email: userInfo.get('email'),
        avatar: userInfo.get('avatar')
      }
    }
  },
  actions: {
    TOGGLE_NAV: ({ commit }) => {
      commit('TOGGLE_NAV')
    },
    USER_REGISTER: ({ commit }, { username, password, email }) => {
      const user = new Parse.User()
      user.set( 'username', username )
      user.set( 'password', password )
      user.set( 'email', email )
      return new Promise((resolve, reject) => {
        user.signUp(null, {
          success: (userInfo) => {
            commit('SET_USER_INFO', { userInfo: userInfo })
            resolve(userInfo)
          },
          error: (user, error) => {
            reject(error)
          }
        })
      })
    },
    USER_LOGIN: ({ commit }, { username, password }) => {
      return new Promise((resolve, reject) => {
        Parse.User.logIn(username, password, {
          success: (userInfo) => {
            commit('SET_USER_INFO', { userInfo: userInfo })
            resolve(userInfo)
          },
          error: (user, error) => {
            reject(error)
          }
        })
      })
    }
  },
  getters: {},  
  modules: {}
})

export default store
