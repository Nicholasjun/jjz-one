// 配置一个axios
import axios from 'axios'
import store from '@/store'
import router from '../router'
import JSONBIG from 'json-bigint'

// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  // 对data进行转化
  // data 在删除接口返回的是null, 使用JSONBIG转换null会报错
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 在每次请求之前,获取token信息,追加在headers中
// 请求拦截器,在每次请求前,做某一些事情
axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
// 响应拦截器,在每次响应之后,做某些事情
axios.interceptors.response.use((res) => {
  // 成功的时候做一些事
  return res
}, (err) => {
  // 失败的时候做一些事
  //   响应对象里包含状态码,如果跳转码等于401,就是token失效或者没有的时候
  if (err.response.status === 401) {
    // 就跳转到登录页 this.$router.push('/login')
    // location.hash = '#/login'
    router.push('/login')
  }
  return Promise.reject(err)
})
// 进行导出
export default axios
