import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import router from './router/index.js'
// 上边这个可以简写为import router from '@/router'
//  @是一个路径的别名,是src路径,在vue-cli项目下有效,index是目录的索引文件,默认使用的索引文件,index.js     index.vue    index.json
import router from '@/router'
Vue.use(ElementUI)
// Vue.config.productionTip = false的意思是:是否开启产品级别提示,不开启
// 开发阶段是false,上线时候是true
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
