import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Land from '../views/Land.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
  
    {
      path: '/', //brands/:brand/:id
      name: 'Land',
      component: Land
    },
    {
      path: '/:brand/:id', //brands/:brand/:id
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: "/:catchAll(.*)", redirect: "/" }
  ]
})

export default router
