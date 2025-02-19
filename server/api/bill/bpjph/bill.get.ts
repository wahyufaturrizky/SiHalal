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

    const { page, size, channel_id, f_ln, fac_id, tgl_daftar } = (await getQuery(event)) as {
      page: string
      size: string
      channel_id: string
      f_ln: string
      fac_id: string
      tgl_daftar: string
    }

    const params = {
      page: +page,
      size: +size,
      channel_id,
      f_ln,
      fac_id,
      tgl_daftar
    }

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/filter/komisi-fatwa-invoice`,
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
