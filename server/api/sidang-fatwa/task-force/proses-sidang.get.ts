import { NuxtError } from 'nuxt/app';

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, 'Authorization');
  if (typeof authHeader === 'undefined') {
    throw createError({
      statusCode: 403,
      statusMessage:
        'Need to pass valid Bearer-authorization header to access this endpoint',
    });
  }

  try {
    const runtimeConfig = useRuntimeConfig();

    const { page, size, keywords, jenis_layanan, jenis_produk, provinsi, lph } = (await getQuery(event)) as {
      page: string
      size: string
      keywords: string
      jenis_layanan: string
      jenis_produk: string
      provinsi: string
      lph: string
    }

    const params = {
      page: +page,
      size: +size,
      keywords,
      jenis_layanan,
      jenis_produk,
      provinsi,
      lph,
    }

    console.log(params, '<<<')

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/komisi-fatwa/proses-sidang`,
      {
        method: 'get',
        headers: { Authorization: authHeader },
        params,
      } as any,
    )

    return response || null
  }
  catch (error) {
    setResponseStatus(event, 400)

    return (error as NuxtError).data
  }
});
