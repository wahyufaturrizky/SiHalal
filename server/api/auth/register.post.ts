const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async event => {
  try {
    // Membaca payload dari body permintaan
    const payload = await readBody(event)

    // Memanggil API eksternal menggunakan $fetch
    // Mengembalikan data dari API eksternal
    return await $fetch(`${runtimeConfig.authBaseUrl}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  }
  catch (error) {
    // Menangani error dengan memberikan detail ke client
    console.error('Error API call:', error)

    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.response?.statusText || 'Internal Server Error',
      data: error?.response?.data || 'Terjadi kesalahan pada server',
    })
  }
})
