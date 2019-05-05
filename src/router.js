import Vue from 'vue'
import Router from 'vue-router'
import goods from '_c/goods/goods'
import ratings from '_c/ratings/ratings'
import seller from '_c/seller/seller'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }

  ]
})
