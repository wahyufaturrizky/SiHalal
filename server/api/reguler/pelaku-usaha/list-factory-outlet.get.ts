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

  const { id_reg, type } = (await getQuery(event)) as {
    id_reg: string,
    type: string
  }

  console.log('Server received params:', { id_reg, type });

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pelaku-usaha/${id_reg}/list-fasilitas?page=1&size=10&fas_id=${type}&id_reg=${id_reg}`,
    {
      method: 'get',
      headers: { Authorization: authorizationHeader },
    },
  ).catch((err: NuxtError) => {
    console.error('API Error:', err);
    setResponseStatus(event, 400);
    return err.data;
  })

  return data || null;
})
