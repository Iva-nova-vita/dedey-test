import Vue from 'vue'
import VueRouter from 'vue-router'
import Task1 from '../views/Task1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Task1',
    component: Task1
  },
  {
    path: '/Task2',
    name: 'Task2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Task2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
