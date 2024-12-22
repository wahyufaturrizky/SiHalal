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
  const id = getRouterParam(event, "id");
  const { page, size, fas_id } = (await getQuery(event)) as {
    page: string;
    size: string;
    fas_id: string;
  };
  let params = {
    page: isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10),
    size: isNaN(parseInt(size, 10)) ? 10 : parseInt(size, 10),
  };
  if (fas_id != "") {
  }
  params["fas_id"] = fas_id;

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pelaku-usaha/${id}/list-fasilitas`,
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
