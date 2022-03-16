import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainBox',
    component: () => import(/* webpackChunkName: "about" */ '../views/lrfBox.vue'),//路由懒加载
    redirect:'/login',//定向到login
    children:[
      {//登入
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')//路由懒加载
    },
    {//注册
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
    },
    {//忘记密码
      path: '/forgetpassword',
      name: 'forgetpassword',
      component: () => import(/* webpackChunkName: "about" */ '../views/forgetpassword.vue')
    },
    ]
  },
  {//主体
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home.vue'),
    redirect:'/homepage',//定向到homepage
    children:[
      {//首页
        path: '/homepage',
        name: 'homepage',
        component: () => import(/* webpackChunkName: "about" */ '../views/homepage.vue')
      },
      {
        path:'/magnifier',
        name:'magnifier',
        component:() => import(/* webpackChunkName: "about" */ '../views/magnifier.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
