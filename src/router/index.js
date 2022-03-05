import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/testMain',
    name:'TestMain',
    component:()=> import(/* webpackChunkName: "about" */ '../views/testMain.vue')
  },
  {
    path: '/',
    name: 'MainBox',
    component: () => import(/* webpackChunkName: "about" */ '../views/lrfBox.vue'),//路由懒加载
    children:[
      {//登入
      path: '/',
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
  // {//登入
  //   path: '/',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')//路由懒加载
  // },
  // {//注册
  //   path: '/register',
  //   name: 'register',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
  // },
  // {//忘记密码
  //   path: '/forgetpassword',
  //   name: 'forgetpassword',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/forgetpassword.vue')
  // },
  {//主体
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home.vue'),
    children:[
      {//首页
        path: '/homepage',
        name: 'homepage',
        component: () => import(/* webpackChunkName: "about" */ '../views/homepage.vue')
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
