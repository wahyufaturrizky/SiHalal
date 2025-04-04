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
  const { hcb_id } = getQuery(event);
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/certificate-halal-foreign/scopes`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      params: { hcb_id },
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 200);

    return err.data;
  });
  return data || null;
});
