import Vue from 'vue'
import Router from 'vue-router'
import index from '@/index.vue'
import realTime from '@/components/realTime'
import historyInquire from '@/components/historyInquire'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/realTime',
      children:[
        {
          path: '/realTime',
          name: 'realTime',
          component: realTime
        },
        {
          path: '/historyInquire',
          name: 'historyInquire',
          component: historyInquire
        }
      ]
    }
  ]
})

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router;