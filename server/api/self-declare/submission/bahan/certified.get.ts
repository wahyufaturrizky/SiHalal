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
  const { page, size, name } = (await getQuery(event)) as {
    page: string;
    size: string;
    name: string;
  };
  let params = {
    page: isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10),
    size: isNaN(parseInt(size, 10)) ? 10 : parseInt(size, 10),
  };
  if (name != "") {
  }
  params["name"] = name;

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/ingredients/certified`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      params,
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);
    return err.data;
  });
  return data || null;
});
