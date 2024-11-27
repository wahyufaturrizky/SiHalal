const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async event => {
  try {
    // Membaca payload dari body permintaan
    const payload = await readBody(event)

    // Memanggil API eksternal menggunakan $fetch
    // Mengembalikan data dari API
    return await $fetch(`${runtimeConfig.authBaseUrl}/api/user/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  }
  catch (error) {
    // Menangani error secara eksplisit
    console.error('Error API call:', error)

    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.response?.statusText || 'Internal Server Error',
      data: error?.response?.data || 'Terjadi kesalahan pada server',
    })
  }
})
