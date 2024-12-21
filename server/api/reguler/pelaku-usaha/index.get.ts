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

  const { page, size, keyword } = (await getQuery(event)) as {
    page: string
    size: string
    keyword: string
  }

  const params = {
    page: Number.isNaN(Number.parseInt(page, 10)) ? 1 : Number.parseInt(page, 10),
    size: Number.isNaN(Number.parseInt(size, 10)) ? 10 : Number.parseInt(size, 10),
    keyword,
  }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/business-actor/search`,
    {
      method: 'get',
      headers: { Authorization: authorizationHeader },
      params,
    },
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400)

    return err.data
  })

  return data || null
})
