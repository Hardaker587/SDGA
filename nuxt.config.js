import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - SDGA',
    title: 'Sustainable Development Goals Assessment Tool for Universities',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/branding/Main_logo.svg' }],
  },
  ssr: false,
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],
  router: {
    middleware: ['authenticated'],
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/utilities', ssr: false },
    { src: '~/plugins/alerts', ssr: false },
    { src: '~/plugins/morris', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://go.nuxtjs.dev/firebase
    '@nuxtjs/firebase',
  ],
  firebase: {
    config: {
      apiKey: 'AIzaSyDsQcXzjkGjOmASG0660I-jKjb-7_cDLZU',
      authDomain: 'sdga-ce4cd.firebaseapp.com',
      databaseURL: 'https://sdga-ce4cd.firebaseio.com',
      projectId: 'sdga-ce4cd',
      storageBucket: 'sdga-ce4cd.appspot.com',
      messagingSenderId: '269949292227',
      appId: '1:269949292227:web:93cf43a7b6df092559dc76',
      measurementId: 'G-07E7BVZ9R6',
    },
    services: {
      auth: {
        ssr: false,
        persistence: 'session',
        initialize: {
          onAuthStateChanged: 'onAuthStateChanged',
          subscribeManually: false,
        },
      },
      database: true,
      functions: {
        location: 'us-central1',
      },
    },
  },
  pwa: {
    meta: false,
    icon: false,
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      dev: false,
    },
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
        child_process: 'empty',
      }
    },
  },
}
