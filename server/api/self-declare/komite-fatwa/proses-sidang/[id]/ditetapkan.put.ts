import type { NuxtError } from 'nuxt/app'

interface StatusBody {
  status: string
  notes: string
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

  // Read the body and ensure it matches the expected structure
  const body: StatusBody = await readBody(event)

  if (!body.status) {
    throw createError({
      statusCode: 400,
      statusMessage: 'The "status" field is required',
    })
  }

  const { id } = event.context.params

  console.log('masuk sini:', body)

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/komite/halal-certificate-reguler/self-declare/${id}/status`,
    {
      method: 'put',
      headers: { Authorization: authorizationHeader },
      body,
    },
  ).catch((err: NuxtError) => {
    console.log(err.data, 'ini error api')
    setResponseStatus(event, 400)

    return err.data
  })

  return data || null
})
