// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  routeRules: {
    '/food': { ssr: false },
    '/livros/listar': { ssr: false },
    '/livros/descricao': { ssr: false },
    '/descricao_food': { ssr: false }
  },
  modules: ['@nuxtjs/tailwindcss']

})
