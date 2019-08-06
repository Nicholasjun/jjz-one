import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
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
// to是去哪里,from是来自哪里,next方法

export default router
