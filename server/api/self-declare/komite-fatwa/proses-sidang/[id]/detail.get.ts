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
    const { id } = event.context.params

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/komite/halal-certificate-reguler/self-declare/${id}/detail`,
      {
        method: 'get',
        headers: { Authorization: authHeader },
      } as any,
    )

    console.log(response, 'ini reseponse')

    return response || null
  }
  catch (error) {
    setResponseStatus(event, 400)
    console.log(error, 'ini error di detail proses sidang api')
    return (error as NuxtError).data
  }
})
