import type { NuxtError } from 'nuxt/app'

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, 'Authorization')
  if (typeof authHeader === 'undefined') {
    throw createError({
      statusCode: 403,
      statusMessage:
        'Need to pass valid Bearer-authorization header to access this endpoint',
    })
  }

  try {
    const runtimeConfig = useRuntimeConfig()
    const query: any = await getQuery(event)

    const params = {
      jenis_produk: query.jenis_produk,
      fasilitas: query.fasilitas,
      lembaga: query.lembaga,
      pendamping: query.pendamping,
      page: isNaN(Number.parseInt(query.page, 10))
        ? 1
        : Number.parseInt(query.page, 10),
      size: isNaN(Number.parseInt(query.size, 10))
        ? 1
        : Number.parseInt(query.size, 10),
      keywords: query.keyword,
      no_daftar: query.no_daftar,
      status_permohonan: 'OF74',
      is_penerbitan: query.is_penerbitan,
    }

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/komite/halal-certificate-reguler/self-declare/inquiry`,
      {
        method: 'get',
        headers: { Authorization: authHeader },
        params,
      } as any,
    )

    return response || null
  }
  catch (error) {
    setResponseStatus(event, 400)

    return (error as NuxtError).data
  }
})
