export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.SITE_NAME || 'Brand Blog',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        vmid: 'description',
        content: '',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/sass/main.sass'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/markdownit'],

  //
  markdownit: {
    runtime: true, // Support `$md()`
  },

  // ENV Variables
  env: {
    API_URL: process.env.API_URL || 'http://localhost:1337/api',
    MEDIA_URL: process.env.MEDIA_URL || 'http://localhost:1337',
    SITE_NAME: process.env.SITE_NAME || 'Brand BLOG',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
