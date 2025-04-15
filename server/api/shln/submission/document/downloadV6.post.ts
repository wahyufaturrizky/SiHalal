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
  const { filename, param } = await readBody(event);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/documents/${filename?.nama_file}?${param}`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    // console.log("event = ", err.data);
    if (err.data?.code == "404") {
      throw createError({
        statusCode: err.data?.code,
        statusMessage: err.data?.errors?.list_error[0],
        data: err.data,
      });
    } else {
      setResponseStatus(event, 400);
    }

    // return err.data;
  });

  return data || null;
});
