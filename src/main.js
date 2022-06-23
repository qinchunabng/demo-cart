import Vue from 'vue'
import App from './App.vue'
import App2 from '@/App2.vue'
import router from '@/router'
// 导入 bootstrap 样式表
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App2),
  router
}).$mount('#app')
