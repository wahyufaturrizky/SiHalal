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

  const { id } = (await getQuery(event)) as {
    id: string
  }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pelaku-usaha/${id}/download/sttd`,
    {
      method: 'get',
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    
    if (
      err.data?.code === 4001 &&
      err.data?.errors?.list_error?.includes("STTD not found")
    ) {
      setResponseStatus(event, 200);
      return err.data;
    }else{
      setResponseStatus(event, 400);
      return err.data;
    }


  })

  return data || null
})
