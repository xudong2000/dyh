import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login.vue')

const Register = () => import('../views/register/Register.vue')

const Home = () => import('../views/home/Home.vue')
const Index = () => import('../views/index/Index.vue')
const Student = () => import('../views/student/Student.vue')
const Teacher = () => import('../views/teacher/Teacher.vue')
const Class = () => import('../views/class/Class.vue')
const Admin = () => import('../views/admin/Admin.vue')

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
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: Index,
      },
      {
        path: '/student',
        component: Student,
      },
      {
        path: '/teacher',
        component: Teacher,
      },
      {
        path: '/class',
        component: Class,
      },
      {
        path: '/admin',
        component: Admin,
      },
    ],
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = localStorage.getItem('username')
  if (!token) return next('/login')
  next()
})

export default router
