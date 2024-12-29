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

  const { id } = (await getQuery(event)) as {
    id: string
  }

  const body: DraftBody = await readBody(event)

  console.log(`${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/lph/pemeriksaan/${id}/auditor`);
  console.log(body);
  
  

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/lph/pemeriksaan/${id}/auditor`,
    {
      method: 'post',
      headers: { Authorization: authorizationHeader },
      body,
    },
  ).catch((err: NuxtError) => {
    console.log(err, 'err');
    
    setResponseStatus(event, 400)

    return err.data
  })

  return data || null
})
