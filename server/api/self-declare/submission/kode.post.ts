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
    const { kode, id_reg } = await readBody(event)

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/verificator/self-declare/cek-kuota-fasilitasi`,
      {
        method: 'post',
        headers: { Authorization: authHeader },
        body: {
          id_reg,
          kode_fac: kode,
        },
      } as any,
    )

    return response || null
  }
  catch (error) {
    // setResponseStatus(event, 400)

    return (error as NuxtError).data
  }
})
