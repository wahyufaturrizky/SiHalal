import type { NuxtError } from 'nuxt/app'

interface DraftBody {
  nama_penyelia: string
  ttd_pj: string
  ttd_ph: string
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

  console.log("body : ", body)

  const { id } = (await getQuery(event)) as {
    id: string
  }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/business-actor/${id}/ttd`,
    {
      method: 'post',
      headers: { Authorization: authorizationHeader },
      body,
    },
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400)

    return err.data
  })

  return data || null
})
