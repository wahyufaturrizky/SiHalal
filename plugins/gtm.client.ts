export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV === 'production') {
    // Initialize dataLayer array
    window.dataLayer = window.dataLayer || []

    // Insert Google Tag Manager script
    ;(function (w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })

      const f = d.getElementsByTagName(s)[0]
      const j = d.createElement(s)
      const dl = l != 'dataLayer' ? `&l=${l}` : ''

      j.async = true
      j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`
      f.parentNode.insertBefore(j, f)
    })(window, document, 'script', 'dataLayer', 'GTM-NLP5B23R')

    console.log('Google Tag Manager initialized')
  }
})
