import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入并使用粒子特效
import VueParticles from 'vue-particles'
// 引入全局样式
import './scss/comGlobal.scss'

//引入element-ui
import ElementUI from 'element-ui';
//引入element-ui其相关样式
import 'element-ui/lib/theme-chalk/index.css';
//引用echart
import * as echart from 'echarts'
Vue.config.productionTip = false
//使用element-ui，粒子特效
Vue.use(ElementUI);
Vue.use(VueParticles)
// 保存为全局变量
Vue.prototype.$echarts = echart;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
