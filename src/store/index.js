// 存储信息的时候
// 1.约定信息的key是什么    hm-toutiao-78-user
// 2.存储信息的值是什么      用户信息对象  字符串json
const KEY = 'hm-toutiao-78-user'
export default {
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    return window.sessionStorage.getItem(KEY) || '{}'
  }
}
