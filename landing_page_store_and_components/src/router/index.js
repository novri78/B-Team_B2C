import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dataTable',
    name: 'dataTable',
    component: () => import('../views/DataTableView.vue')
  },
  {
    path: '/dataTable/create',
    name: '/dataTable/create',
    component: () => import('../views/CreateDataComponent.vue')
  },
  {
    path: '/dataTable/update/:id',
    name: '/dataTable/update/:id',
    component: () => import('../views/UpdateDataComponent.vue')
  },
  {
    path: '/dataTable/delete/:id',
    name: '/dataTable/delete/:id',
    component: () => import('../views/DeleteDataComponent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
