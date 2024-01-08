// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

const path = require('path');

export default defineNuxtConfig({
  srcDir:'src',
  css: ['~/assets/styles/main.scss'],
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@nuxtjs/i18n'
    //...
  ],
  plugins: [
    '@/plugins/draggable'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.NUXT_API_ENDPOINT,
    },
  },
})
