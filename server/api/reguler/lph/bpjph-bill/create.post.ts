import type { NuxtError } from "nuxt/app";
import type { NewAccountGovernment } from "~/server/interface/new-account.iface";

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
  const body: NewAccountGovernment = await readBody(event);

  const data = await $fetch(
    `${runtimeConfig.coreBaseUrl}/api/v1/lph/tagihan-bpjph/create-invoice`,
    {
      method: "post",
      body,
      headers: { Authorization: authorizationHeader },
    } as any
  ).catch((err: NuxtError) => {
    return err.data;
  });

  return data || null;
});
