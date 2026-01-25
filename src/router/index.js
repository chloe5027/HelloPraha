import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/stay',
      name: 'stay',
      component: () => import('../views/Stay.vue'),
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import('../views/Reviews.vue')
    },
    {
      path: '/tour',
      name: 'tour',
      component: () => import('../views/Tour.vue'),
    },
    {
      path: '/hellosevilla',
      name: 'hellosevilla',
      component: () => import('../views/HelloSevilla.vue'),
    }
  ],
})

export default router