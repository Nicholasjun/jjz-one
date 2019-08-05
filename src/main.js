import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import router from './router/index.js'
// 上边这个可以简写为import router from '@/router'
//  @是一个路径的别名,是src路径,在vue-cli项目下有效,index是目录的索引文件,默认使用的索引文件,index.js     index.vue    index.json
import router from '@/router'
// 导入样式
import '@/styles/index.less'
import axios from 'axios'
// 设置一个vue的原型$http=axios,就可以在其他vue文件里直接this.$http使用axios了
Vue.prototype.$http = axios
Vue.use(ElementUI)
// Vue.config.productionTip = false的意思是:是否开启产品级别提示,不开启
// 开发阶段是false,上线时候是true
Vue.config.productionTip = false
new Vue({
  router,
  // render是一个渲染函数,渲染的同时会有一个回调的参数,渲染的是App那个组件,mount是挂载的意思,挂载到public里的index.html里
  render: h => h(App)
}).$mount('#app')
