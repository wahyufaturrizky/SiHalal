import type { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, "Authorization");
  if (typeof authHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const id = getRouterParam(event, "id")
  console.log("ID : ", id)
  const body: any = await readBody(event);
  console.log("UPLOAD : ", body)

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/lp3h/profile-doc/${id}`,
    {
      method: "put",
      headers: { Authorization: authHeader },
      body,
    }
  ).catch((err: NuxtError) => {
    console.error("error = ", err);
    setResponseStatus(event, 400);

    return err.data;
  });

  return data || null;

});
