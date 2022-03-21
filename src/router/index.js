import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {//登录前
    path: '/',
    name: 'MainBox',
    component: () => import(/* webpackChunkName: "about" */ '../views/lrfBox.vue'),//路由懒加载
    redirect:'/login',//定向到login
    children:[
      {//登录
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
      {//基地管理
        path:'/breedingBase',
        name:'breedingBase',
        component:() => import(/* webpackChunkName: "about" */ '../views/breedingBase.vue')
      },
      {//虾塘管理
        path:'/shrimpPond',
        name:'shrimpPond',
        component:() => import(/* webpackChunkName: "about" */ '../views/shrimpPond.vue')
      },
      {//设备管理
        path:'/breedingEquipment',
        name:'breedingEquipment',
        component:() => import(/* webpackChunkName: "about" */ '../views/breedingEquipment.vue')
      },
      {//对虾资料
        path:'/magnifier',
        name:'magnifier',
        component:() => import(/* webpackChunkName: "about" */ '../views/magnifier.vue')
      },
      {//个人中心
        path:'/personalcenter',
        name:'personalcenter',
        component:() => import(/* webpackChunkName: "about" */ '../views/personalcenter.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
