import svgLoader from 'vite-svg-loader';

import client from './env/client';
import server from './env/server';

export default defineNuxtConfig({
  devServer: {
    port: Number(process.env.NUXT_PORT) || 4000,
  },

  ssr: false,

  typescript: {
    strict: true,
  },

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    public: client,
    private: server,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/core.scss" as *;',
        },
      },
    },
    plugins: [svgLoader()],
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/features',
      pathPrefix: false,
    },
  ],

  modules: [
    '@nuxtjs/html-validator',
    [
      '@nuxt/image',
      {
        domains: ['cdn.rebrickable.com'],
        provider: 'ipx',
      },
    ],
    [
      '@nuxtjs/i18n',
      {
        langDir: 'assets/locales/',
        fallbackLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE,
        strategy: 'prefix_except_default',
        legacy: false,
        defaultLocale: 'en',
        allowComposition: true,
        baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
        locales: [{ code: 'en', iso: 'en-US', file: 'en.json' }],
      },
    ],
    [
      '@nuxtjs/stylelint-module',
      {
        cache: false,
        lintOnStart: false,
      },
    ],
  ],
});
