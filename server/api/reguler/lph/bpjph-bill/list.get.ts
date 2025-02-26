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

  // eslint-disable-next-line camelcase
  const { page, size } = (await getQuery(event)) as {
    page: string
    size: string
  }

  const params = {
    page: +page || 1,
    size: +size || 10,
  }

  const data = await $fetch(`${runtimeConfig.coreBaseUrl}/api/v1/lph/tagihan-bpjph`, {
      method: 'get',
      headers: { Authorization: authorizationHeader },
      params,
    } as any,
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400)
    return err.data
  })

  return data || null
})
