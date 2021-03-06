import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  // mode: 'history',
  routes: [{
    path: '/login',
    name: 'login',
    component: r => require['ensure']([], () => r(require('../views/Login')), 'login')
  }]
})
