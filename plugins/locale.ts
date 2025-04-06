export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const { setLocale } = nuxtApp.$i18n
    const asalUsaha = localStorage.getItem('asalUsaha')
    if (asalUsaha === 'Luar Negeri')
      setLocale('en')
  }
})
