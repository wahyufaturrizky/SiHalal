import type { NuxtError } from "nuxt/app";
import type { NewAccountGovernment } from "~/server/interface/new-account.iface";

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  const id = getQuery(event).id;

  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const body: NewAccountGovernment = await readBody(event);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/verificator/halal-certificate-reguler/self-declare/${id}/penyelia`,
    {
      method: "post",
      headers: { Authorization: authorizationHeader },
      body,
    }
  ).catch((err: NuxtError) => {
    return err.data;
  });

  return data || null;
});
