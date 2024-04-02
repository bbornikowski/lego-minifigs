<template>
  <Html>
    <Body>
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
  const config = useRuntimeConfig().public;

  const { locale } = useI18n();

  useHead({
    title: 'Lego Minifigs',
    htmlAttrs: {
      lang: locale.value,
    },
    meta: [
      {
        name: 'charset',
        content: 'utf-8',
      },
      {
        name: 'description',
        content: 'LEGO Harry Potter mystery box!',
      },
      { property: 'og:title', content: 'Lego Minifigs' },
      { property: 'og:url', content: config.NUXT_PUBLIC_BASE_URL },
      {
        property: 'og:description',
        content: 'LEGO Harry Potter mystery box!',
      },
      {
        property: 'og:image',
        content: `${config.NUXT_BASE_URL}/images/hero1.webp`,
      },
      ...(process.env.NODE_ENV === 'production'
        ? [
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1, maximum-scale=5',
            },
            {
              'http-equiv': 'Content-Security-Policy',
              content: 'upgrade-insecure-requests',
            },
          ]
        : []),
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        href: '/favicon/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/favicon/site.webmanifest' },
      {
        rel: 'mask-icon',
        color: '#f88216',
        href: '/favicon/safari-pinned-tab.svg',
      },
    ],
  });
</script>

<style lang="scss">
  @use '~/assets/scss/main.scss';
</style>
