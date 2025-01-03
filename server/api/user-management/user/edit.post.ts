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

  const data = await $fetch<any>(
    `${runtimeConfig.authBaseUrl}/api/v1/admin/users-type/edit/54b0f1a3-75a8-4f7d-9322-a940cfeacc4c`,
    {
      method: "put",
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    console.log(err);
    setResponseStatus(event, 400);
    return err.data;
  });
  return data || null;
});
