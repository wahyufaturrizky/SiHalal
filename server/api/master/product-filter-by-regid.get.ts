import { NuxtError } from "nuxt/app";
const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const { id, idReg } = (await getQuery(event)) as {
    id: string,
    idReg: string
  }

  const { data } = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/jenis-product/${id}/${idReg}/combobox`,
    {
      method: 'get',
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });
  return data || null;
});
