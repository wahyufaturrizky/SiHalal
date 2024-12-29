import type { NuxtError } from 'nuxt/app'

interface DraftBody {
  id_reg: string
  id_bahan_data_dukung: string
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
  // eslint-disable-next-line camelcase
  const { id_reg, id_bahan_data_dukung } = body

  const data = await $fetch<any>(
    // eslint-disable-next-line camelcase
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/auditor/${id_reg}/bahan-data-dukung/${id_bahan_data_dukung}`,
    {
      method: 'delete',
      headers: { Authorization: authorizationHeader },
    },
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400)

    return err.data
  })

  return data || null
})
