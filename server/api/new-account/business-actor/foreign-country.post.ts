import { NuxtError } from "nuxt/app";
import NewAccountForeign from "~/server/interface/new-account.iface";
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
  const body: NewAccountForeign = await readBody(event);
  console.log(body);
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/business-actor/foreign`,
    {
      method: "post",
      body: body,
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });
  console.log(data);
  return data || null;
});
