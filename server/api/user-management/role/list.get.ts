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

  const { page, size, keyword } = (await getQuery(event)) as {
    page: string;
    size: string;
    keyword: string;
  };

  const params: any = {
    page: isNaN(Number.parseInt(page, 10)) ? 1 : Number.parseInt(page, 10),
    size: isNaN(Number.parseInt(size, 10)) ? 10 : Number.parseInt(size, 10),
  };

  if (keyword !== "") {
    params["search"] = keyword;
  }
  const data = await $fetch<any>(
    `${runtimeConfig.authBaseUrl}/api/v1/admin/users-type/list`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      params,
    }
  ).catch((err: NuxtError) => {
    console.log(err);
    setResponseStatus(event, 400);
    return err.data;
  });
  return data || null;
});
