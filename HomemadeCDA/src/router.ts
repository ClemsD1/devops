import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/login.vue'
import Register from './pages/register.vue'
import Profile from './pages/profile.vue'
import Catalog from './pages/catalog.vue'
import Cart from './pages/cart.vue'
import { useUserStore } from './stores/userStore'


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/catalog', component: Catalog },
  { path: '/cart', component: Cart },
  { path: '/profile', component: Profile },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const requiresAuth = !publicPages.includes(to.path)
  const userStore = useUserStore()

  if (requiresAuth && !userStore.isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})
