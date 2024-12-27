/* eslint-disable camelcase */
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

  const { page, size, status, jatuh_tempo, search } = (await getQuery(event)) as {
    page: string
    size: string
    status: string
    jatuh_tempo
    search: string
  }

  let params = {
    page: +page,
    size: +size,
    status,
    keyword: search,
  }

  if (jatuh_tempo !== null) {
    params = {
      ...params,
      jatuh_tempo,
    }
  }

  console.log(params, '<<<<')

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/business-actor/invoice`,
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
