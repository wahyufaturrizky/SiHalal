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
    const kode = await readBody(event)

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/verificator/self-declare/filter/search-fasilitasi?fac_code=${kode}`,
      {
        method: 'get',
        headers: { Authorization: authHeader },
      } as any,
    )

    return response || null
  }
  catch (error) {
    setResponseStatus(event, 400)

    return (error as NuxtError).data
  }
})
