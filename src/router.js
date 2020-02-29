import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import About from './views/About.vue'
import Register from './views/Register.vue'
import Logged from './views/Logged.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/logged',
      name: 'logged',
      component: Logged
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
