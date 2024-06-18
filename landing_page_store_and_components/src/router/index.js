import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import DataTableView from '@/views/DataTableView.vue'
import CreateDataComponent from '@/views/CreateDataComponent.vue'
import UpdateDataComponent from '@/views/UpdateDataComponent.vue'
import DeleteDataComponent from '@/views/DeleteDataComponent.vue'
import store from '@/store'; // Import the Vuex store

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: { requiresAuth: true },
    
  },
  {
    path: '/login',
    component: LoginComponent,    
  },
  
  {
    path: '/about',
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dataTable',
    component: DataTableView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dataTable/create',
    component: CreateDataComponent,
    meta: { requiresAuth: true },
  },
  {
    path: '/dataTable/update/:id',
    component: UpdateDataComponent,
    meta: { requiresAuth: true },
  },
  {
    path: '/dataTable/delete/:id',
    component: DeleteDataComponent,
    meta: { requiresAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated;

  //debugging:
  console.log("Navigating to:", to.path);
  console.log("Requires Auth:", requiresAuth);
  console.log("Is Authenticated:", isAuthenticated);

  if (requiresAuth && !isAuthenticated) {
    //debugging
    console.log("Unauthorized access, redirecting to login page.");

    next('/login');
  } else {
    //debugging
    console.log("Authorized access, proceeding to destination.");
    
    next();
  }
});

export default router;
