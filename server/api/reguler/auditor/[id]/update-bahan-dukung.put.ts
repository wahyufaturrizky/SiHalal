import type { NuxtError } from 'nuxt/app'

interface DraftBody {
  id_reg_bahan: string
  id_bahan_data_dukung: string
  nama_bahan: string
  diragukan: string
  kriteria_bahan: string
  keterangan: string
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
  console.log("update data bahan body : ", body)
  const { id } = event.context.params

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/auditor/${id}/bahan-data-dukung`,
    {
      method: 'put',
      headers: { Authorization: authorizationHeader },
      body,
    },
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400)

    return err.data
  })

  return data || null
})
