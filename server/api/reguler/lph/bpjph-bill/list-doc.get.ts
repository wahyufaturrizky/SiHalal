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
  const { page, size, channel, year, search } = (await getQuery(event)) as {
    page: string
    size: string
    channel: string,
    year: string,
    search: string,
  }

  const params = {
    page: +page || 1,
    size: +size || 10,
    channel: channel ?? '',
    year: year ?? '',
    search: search ?? '',
  }

  const data = await $fetch(`${runtimeConfig.coreBaseUrl}/api/v1/lph/tagihan-bpjph/list-dokumen`, {
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
