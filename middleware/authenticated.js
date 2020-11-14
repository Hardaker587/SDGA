/* eslint-disable */

import 'firebase/auth'

export default function ({ app, store, route, redirect }) {
  app.router.beforeEach((to, from, next) => {
    this.$fire.auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        this.$fire.auth.currentUser
          .getIdTokenResult()
          .then(function ({ claims }) {
            if (claims.customer) {
              if (to.path !== '/customer')
                return next({
                  path: '/customer',
                })
            } else if (claims.admin) {
              if (to.path !== '/admin')
                return next({
                  path: '/admin',
                })
            } else if (claims.subscriber) {
              if (to.path !== '/subscriber')
                return next({
                  path: '/subscriber',
                })
            }
          })
      } else {
        if (to.matched.some((record) => record.meta.auth)) {
          next({
            path: '/login',
            query: {
              redirect: to.fullPath,
            },
          })
        } else {
          next()
        }
      }
    })

    next()
  })
}
