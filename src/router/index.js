import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login.vue')

const Register = () => import('../views/register/Register.vue')

const Home = () => import('../views/home/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/home',
    component: Home,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
