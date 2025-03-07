import { NuxtError } from "nuxt/app";
const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  // const authorizationHeader = getRequestHeader(event, "Authorization");
  // if (typeof authorizationHeader === "undefined") {
  //   throw createError({
  //     statusCode: 403,
  //     statusMessage:
  //       "Need to pass valid Bearer-authorization header to access this endpoint",
  //   });
  // }

  const params = {
    is_show_code_phone: true,
  };
  const { data } = await $fetch<any>(
    `${runtimeConfig.authBaseUrl}/api/v1/list-phone-number`,
    {
      method: "get",
      // headers: { Authorization: authorizationHeader },
      params,
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });
  return data || null;
});
