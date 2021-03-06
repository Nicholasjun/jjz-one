// 存储信息的时候
// 1.约定信息的key是什么    hm-toutiao-78-user
// 2.存储信息的值是什么      用户信息对象  字符串json
const KEY = 'hm-toutiao-78-user'
export default {
  // 设置用户信息
  setUser (user) {
    // 存储 user 对象数据
    // 现在：给什么存什么  完整替换之前的信息。
    // 预期：给一个字段，就局部修改这个字段即可。 {name:''}
    // 做法：获取本地的存储的对象，把传入的对象，合并覆盖到当前存储对象中。
    const localUser = this.getUser()
    const newUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(newUser))
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
