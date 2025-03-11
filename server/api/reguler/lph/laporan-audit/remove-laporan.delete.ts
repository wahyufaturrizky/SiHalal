/* eslint-disable camelcase */
import type { NuxtError } from 'nuxt/app'

interface DraftBody {
  id_reg: string
  id_legal: string
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
  const { id, id_hasil_doc } = body

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/lph/remove-laporan-audit/${id}/${id_hasil_doc}`,
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
