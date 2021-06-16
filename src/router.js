import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      meta: { title: 'Home', icon: 'home' },
      component: () => import(/* webpackChunkName: "home" */ './pages/home/Home')
    },
    {
      name: 'login',
      path: '/login',
      meta: { title: 'Login' },
      component: () => import(/* webpackChunkName: "login" */ './pages/login/Login')
    },
    {
      name: 'historico',
      path: '/historico',
      meta: { title: 'Historico', icon: 'book' },
      component: () => import(/* webpackChunkName: "historico" */ './pages/historico/Historico')
    },
    {
      name: 'valor-minuto',
      path: '/valor-minuto',
      meta: { title: 'Valor Minuto', icon: 'phone' },
      component: () => import(/* webpackChunkName: "valor-minuto" */ './pages/valor-minuto/ValorMinuto')
    },
    {
      name: 'plano',
      path: '/plano',
      meta: { title: 'Plano', icon: 'money-bill-alt' },
      component: () => import(/* webpackChunkName: "plano" */ './pages/plano/Plano')
    },
    {
      name: 'logout',
      path: '/logout',
      meta: { title: 'Logout', icon: 'power-off' },
      component: () => import(/* webpackChunkName: "logout" */ './pages/logout/Logout')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - OniQ`

  if (!window.uid && to.name !== 'home' && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
