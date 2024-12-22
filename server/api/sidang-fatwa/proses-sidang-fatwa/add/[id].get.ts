import type { NuxtError } from "nuxt/app";
import { NewAccountGovernment } from "~/server/interface/new-account.iface";

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  const id = getRouterParam(event, "id");

  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const body: NewAccountGovernment = await readBody(event);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/sidang-fatwa/entri-ketetapan-halal/update${id}`,
    {
      method: "post",
      headers: { Authorization: authorizationHeader },
      body,
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);

    return err.data;
  });

  return data || null;
});
