import type { NuxtError } from 'nuxt/app'

const runtimeConfig = useRuntimeConfig()
export default defineEventHandler(async (event: any) => {
  const authorizationHeader = getRequestHeader(event, 'Authorization')
  if (typeof authorizationHeader === 'undefined') {
    throw createError({
      statusCode: 403,
      statusMessage:
        'Need to pass valid Bearer-authorization header to access this endpoint',
    })
  }
  const body: any = await readBody(event);

    const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/lph/halal-certificate-reguler/outlet`,
    {
      method: 'post',
      headers: { Authorization: authorizationHeader },
      body: body, 
    },
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400)

    return err.data
  })

  return data || null
})
