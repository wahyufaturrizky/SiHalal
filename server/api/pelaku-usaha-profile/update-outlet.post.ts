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
  const body: any = await readBody(event);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/business-actor/foreign/${body.id_profile}/outlet/${body.id_outlet}`,
    {
      method: "put",
      headers: { Authorization: authorizationHeader },
      body: {
        name: body.name,
        address: body.address,
        city: body.city,
        province: body.province,
        country: body.country,
        zip_code: body.zip_code,
      },
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);

    return err.data;
  });

  return data || null;
});
