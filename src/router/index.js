import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('@/pages/HomePage.vue')
const FormulaPage = () => import('@/pages/FormulaPage.vue')

const LoginPage = () => import('@/pages/LoginPage.vue')
const RegistrationPage = () => import('@/pages/RegistrationPage.vue')

const ProfilePage = () => import('@/pages/ProfilePage.vue')

const NotFoundPage = () => import('@/pages/NotFoundPage.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/formula/:id',
    name: 'formula',
    component: FormulaPage,
    props: true,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationPage,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { isAuth: false, trasition: 'fade' },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: { isAuth: true, trasition: 'fade' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const isAuth = localStorage.getItem('user_id')
//   const isAdmin = localStorage.getItem('admin_id')

//   const toMeta = to.meta.transition
//   const fromMeta = from.meta.transition

//   if (toMeta && fromMeta && toMeta !== fromMeta) {
//     document.body.classList.remove(fromMeta)
//     document.body.classList.add(toMeta)
//   }

//   // Redirect to admin page if user has admin privileges
//   if (to.meta.admin && isAdmin) {
//     next()
//   } else {
//     // Redirect to login page if route requires authentication and user is not authenticated
//     if (to.meta.isAuth && !isAuth) {
//       next({ name: 'registration' })
//     } else {
//       next()
//     }
//   }
// })

export default router
