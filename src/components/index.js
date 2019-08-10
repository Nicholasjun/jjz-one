// 封装vue插件,
// 作用:注册components下的所有的组件为全局组件
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyBread.name, MyChannel)
  }
}
