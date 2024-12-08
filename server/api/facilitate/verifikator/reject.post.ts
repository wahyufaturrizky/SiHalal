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
  const { id, comment } = await readBody(event);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/fasilitator/fasilitasi/reject`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      body: {
        fasilitasi_id: id,
        keterangan: comment,
      },
    }
  ).catch((err: NuxtError) => {
    console.log(err);
    setResponseStatus(event, 400);
    return err.data;
  });
  return data || null;
});
