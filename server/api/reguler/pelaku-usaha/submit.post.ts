import type { NuxtError } from 'nuxt/app'

interface DraftBody {
  type: string
}

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
  const body: DraftBody = await readBody(event)

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/business-actor/submit`,
    {
      method: 'post',
      headers: { Authorization: authorizationHeader },
      body,
    },
  ).catch((err: NuxtError) => {
    return err.data
  })

  return data || null
})
