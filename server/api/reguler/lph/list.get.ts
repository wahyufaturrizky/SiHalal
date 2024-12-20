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
  const { url, page, size, search, skala_code, provinsi_code, channel_code } = (await getQuery(event)) as {
    url: string
    page: string
    size: string
    search: string
    skala_code: string
    provinsi_code: string
    channel_code: string
  }

  const params = {
    page: Number.isNaN(Number.parseInt(page, 10)) ? 1 : Number.parseInt(page, 1),
    size: Number.isNaN(Number.parseInt(size, 10)) ? 10 : Number.parseInt(size, 10),
    search,
    // eslint-disable-next-line camelcase
    skala_code,
    // eslint-disable-next-line camelcase
    provinsi_code,
    // eslint-disable-next-line camelcase
    channel_code,
  }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/${url}`,
    {
      method: 'get',
      headers: { Authorization: authorizationHeader },
      params,
    },
  ).catch((err: NuxtError) => {
    console.log(err, 'ini error nya <<<<<<')
    setResponseStatus(event, 400)

    return err.data
  })

  return data || null
})
