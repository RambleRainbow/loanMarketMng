import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Manage from '@/components/Manage'
import Borrow from '@/components/Borrow'
import Settings from '@/components/Settings'
import Query from '@/components/Query'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Borrow',
      name: 'Borrow',
      component: Borrow
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/query',
      name: 'Query',
      component: Query
    }
  ]
})
