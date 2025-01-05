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
  const { role_name, desc, id_permission } = await readBody(event);
  const data = await $fetch<any>(
    `${runtimeConfig.authBaseUrl}/api/v1/admin/users-type/add`,
    {
      method: "post",
      headers: {
        Authorization: authorizationHeader,
      },
      body: {
        role_name,
        desc,
        id_permission,
      },
    }
  ).catch((err: NuxtError) => {
    console.log(err);
    setResponseStatus(event, 400);
    return err.data;
  });
  return data || null;
});
