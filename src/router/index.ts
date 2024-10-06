import { createRouter, createWebHashHistory,  RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { UseSystemValues } from '@/store/UseSystemValues'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      activationRequired:true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta:{
      activationRequired:true
    }
  },
  {
    name: 'sales',
    path: '/sales',
    component: () => import(/* webpackChunkName: "sales" */ '../views/SalesView.vue'),
    meta:{
      activationRequired:true
    }
  },
  {
    name:'salesHistory',
    path: '/salesHistory',
    component: () => import(/* webpackChunkName: "salesHistory" */ '../views/HistorySalesView.vue'),
    meta:{
      activationRequired:true
    }
  },
  {
    name:'activation',
    path: '/activation',
    component: () => import(/* webpackChunkName: "activation" */ '../views/ErrorPageNotPaid.vue'),
    meta:{
      activationRequired:false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAppActivated = UseSystemValues().getIsAppActivated;
    if (to.meta.activationRequired && !isAppActivated) {
      next({ name: 'activation' })  
    } else {
      next()
    }
})
export default router
