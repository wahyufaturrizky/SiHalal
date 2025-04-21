import { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
    const { id } = event.context.params;

  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthenticated",
    });
  }


  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pelaku-usaha/check/${id}`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 200);

    return err.data;
  });

  return data || null;
});
