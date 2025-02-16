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
  const id = getRouterParam(event, "id");
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pendamping/halal-certificate-reguler/self-declare/${id}/ingredients`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);
    return err.data;
  });
  return data || null;
});
