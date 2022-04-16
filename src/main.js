import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import awaitTo from 'await-to-js'//async await处理异常
import { notice ,noticeInfo} from './js/notice'//

// 引入并使用粒子特效
import VueParticles from 'vue-particles'
// 引入全局样式
import './scss/comGlobal.scss'

//引入element-ui
import ElementUI from 'element-ui';
//引入element-ui其相关样式
import 'element-ui/lib/theme-chalk/index.css';
//引用echart
import * as echart from 'echarts';
//引入和风天气图标
import 'qweather-icons/font/qweather-icons.css';

Vue.config.productionTip = false
//使用element-ui，粒子特效
Vue.use(ElementUI);
Vue.use(VueParticles);

// 保存为全局变量
Vue.prototype.$echarts = echart;
Vue.prototype.$axios =axios;
Vue.prototype.$awaitTo = awaitTo;
Vue.prototype.$notice = notice;
Vue.prototype.$noticeInfo = noticeInfo;

//基本路径全局变量
Vue.prototype.$baseUrl = 'http://localhost:3033'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
