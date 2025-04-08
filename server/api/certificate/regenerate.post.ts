import type { NuxtError } from "nuxt/app";

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

  const { document_type, ref_id } = await readBody(event);
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/dokumen/generate?is_download=true`,
    {
      method: "post",
      headers: { Authorization: authorizationHeader },
      body: {
        document_type,
        ref_id,
      },
    }
  ).catch((err: NuxtError) => {
    console.log(err);
    // setResponseStatus(event, 400);

    return err.data;
  });
  console.log(data);

  return data || null;
});
