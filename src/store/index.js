// 存储信息的时候
// 1.约定信息的key是什么    hm-toutiao-78-user
// 2.存储信息的值是什么      用户信息对象  字符串json
const KEY = 'hm-toutiao-78-user'
export default {
  // 设置用户信息
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 获取用户信息
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  // 移除用户信息
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}