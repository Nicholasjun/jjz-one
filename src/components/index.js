// 封装vue插件,
// 作用:注册components下的所有的组件为全局组件
import MyBread from '@/components/my-bread'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}
