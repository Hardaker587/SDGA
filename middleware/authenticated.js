/* eslint-disable */
import firebase from 'firebase'
require('firebase/auth')

export default function ({ app, store, route, redirect }) {
  app.router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then(function ({ claims }) {
            if (claims.surveyor) {
              if (to.path !== '/survey')
                return next({
                  path: '/survey',
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
