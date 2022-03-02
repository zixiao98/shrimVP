import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import './scss/comGlobal.scss'
//引用echart
import * as echart from 'echarts'

//引入element-ui
import ElementUI from 'element-ui';
//引入element-ui其相关样式
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
//使用element-ui
Vue.use(ElementUI);

// 保存为全局变量
Vue.prototype.$echarts = echart;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
