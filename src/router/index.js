import { createRouter, createWebHistory } from 'vue-router'
import AdsPage from '@/views/AdsPage.vue'
import AdPage from '@/views/AdPage.vue'
import AdEditPage from '@/views/AdEditPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import PageLayout from '@/views/Layout/PageLayout.vue'
import AdCreatePage from '@/views/AdCreatePage.vue'

const routes = [
  { path: '/login', name: 'LoginPage', component: LoginPage },
  {
    path: '/',
    component: PageLayout,
    redirect: '/ads',
    children: [
      {
        path: 'ads',
        name: 'AdsPage',
        component: AdsPage
      },
      {
        path: 'ads/:id',
        name: 'AdPage',
        component: AdPage,
        props: true
      },
      {
        path: 'ads/:id/edit',
        name: 'AdEditPage',
        component: AdEditPage,
        props: true
      },
      {
        path: 'ads/create',
        name: 'AdCreatePage',
        component: AdCreatePage
      }
    ]
  },
  { path: '/:catchAll(.*)', redirect: { name: 'AdsPage' } }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  next()
})

export default router
