import { NuxtError } from "nuxt/app";
import { NewAccountDomestic } from "~/server/interface/new-account.iface";
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
  const body: NewAccountDomestic = await readBody(event);
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/business-actor/domestic`,
    {
      method: "post",
      body: body,
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    return err.data;
  });
  return data || null;
});
