// /api/v1/pendamping/halal-certificate-reguler/self-declare/f417d70b-31b5-50a1-9409-e76f32b64831/ingredients/verify

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
  const id_route = getRouterParam(event, "id");
  const body = await readBody(event);

  //   console.log("id route = ", id_route);
  //   console.log("body = ", JSON.stringify(body));

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pendamping/halal-certificate-reguler/self-declare/${id_route}/ingredients/verify`,
    {
      method: "put",
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/json",
      },
      body,
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);
    console.error(err);
    return err.data;
  });

  return data || null;
});
