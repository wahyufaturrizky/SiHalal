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

  const {
    search, status_reg, tgl_daftar, fac_id, page, size,
  } = (await getQuery(event)) as {
    status_reg: string
    tgl_daftar: string
    fac_id: string
    page: string
    size: string
  }

  try {
    const runtimeConfig = useRuntimeConfig()

    const params = {
      search,
      status_reg,
      tgl_daftar,
      fac_id,
      page,
      size,
    }

    // console.log("PARAMS : ", params)

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/pendamping/halal-certificate-reguler/filter/pengajuan`,
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
