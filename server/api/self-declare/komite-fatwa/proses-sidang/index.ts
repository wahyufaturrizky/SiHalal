import type { NuxtError } from 'nuxt/app'

const runtimeConfig = useRuntimeConfig()
export default defineEventHandler(async event => {
  const authorizationHeader = getRequestHeader(event, 'Authorization');
  if (typeof authorizationHeader === 'undefined') {
    throw createError({
      statusCode: 403,
      statusMessage:
        'Need to pass valid Bearer-authorization header to access this endpoint',
    });
  }

  const { page, size, keyword, lembagaPendampingId, pendampingId, facId, namaPengajuan } = (await getQuery(event)) as {
    page: string
    size: string
    keyword: string
    lembagaPendampingId: string
    pendampingId: string
    facId: string
    namaPengajuan: string
    // status: string;
  }

  const params: any = {
    page: Number.isNaN(Number.parseInt(page, 10)) ? 1 : Number.parseInt(page, 10),
    size: Number.isNaN(Number.parseInt(size, 10)) ? 10 : Number.parseInt(size, 10),
  }

  if (keyword !== '')
    params['keyword'] = keyword
  if (lembagaPendampingId !== '')
    params['lembaga_pendamping_id'] = lembagaPendampingId
  if (pendampingId !== '')
    params['pendamping_id'] = pendampingId
  if (facId !== '')
    params['fac_id'] = facId
  if (namaPengajuan !== '')
    params['nama_pengajuan'] = namaPengajuan

  // if (status !== "" && status !== "Semua") {
  //   params["status"] = status;
  // }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/komite/halal-certificate-reguler/list`,
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
