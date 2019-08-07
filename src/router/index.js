import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import store from '@/store'
Vue.use(VueRouter)
// VueRouter
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    //   redirect: '/welcome',
    //   children: [
    //     { path: '/welcome', name: 'welcome', component: Welcome }
    //   ]
    // }
    // 上边这个也可以写成下边这个
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})
// 前置导航守卫
// to是去哪里,from是来自哪里,next方法(放行)
router.beforeEach((to, from, next) => {
  // to.path为要跳转的路径, 如果是登录页面的话放行
  if (to.path === '/login') return next()
  // 判断是否登录,如果有token说明登录过,!是取非,如果没token就去登录页面
  if (!store.getUser().token) return next('/login')
  // 放行
  next()
  // 可以简化为:
  // if (to.path !== '/login' && !store.getUser().token) return next('/login')
  // next()
})
export default router
