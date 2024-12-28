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
  const { id_reg, keterangan } = await readBody(event);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/verifikator/kirimLPH`,
    {
      method: "post",
      headers: { Authorization: authorizationHeader },
      body: {
        id_reg,
        keterangan,
      },
    }
  ).catch((err: NuxtError) => {
    return err.data;
  });
  return data || null;
});
