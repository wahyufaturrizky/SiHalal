import type { NuxtError } from 'nuxt/app'

const runtimeConfig = useRuntimeConfig()
export default defineEventHandler(async event => {
  const authorizationHeader = getRequestHeader(event, 'Authorization')
  if (typeof authorizationHeader === 'undefined') {
    throw createError({
      statusCode: 403,
      statusMessage:
        'Need to pass valid Bearer-authorization header to access this endpoint',
    })
  }

  const {
    page,
    size,
    selectedFilterProduk,
    selectedFilterFasilitasi,
    selectedFilterLembaga,
    selectedFilterPendamping,
    searchQuery,
  } = (await getQuery(event)) as {
    page: string
    size: string
    selectedFilterProduk: string
    selectedFilterFasilitasi: string
    selectedFilterLembaga: string
    selectedFilterPendamping: string
  }

  const params: any = {
    page: Number.isNaN(Number.parseInt(page, 10)) ? 1 : Number.parseInt(page, 10),
    size: Number.isNaN(Number.parseInt(size, 10)) ? 10 : Number.parseInt(size, 10),
  }

  if (selectedFilterProduk !== '')
    params['jenis_produk'] = selectedFilterProduk
  if (selectedFilterLembaga !== '')
    params['lembaga'] = selectedFilterLembaga
  if (selectedFilterPendamping !== '')
    params['pendamping'] = selectedFilterPendamping
  if (selectedFilterFasilitasi !== '')
    params['fasilitas'] = selectedFilterFasilitasi
  if (searchQuery !== '')
    params['nama_pu'] = searchQuery

  // if (status !== "" && status !== "Semua") {
  //   params["status"] = status;
  // }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/komite/halal-certificate-reguler/self-declare/inquiry`,
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
