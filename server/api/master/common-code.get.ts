import type { NuxtError } from "nuxt/app";
import { findRefType } from "~/utils/enum/EnumMasterRef";

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event): Promise<any> => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const query = getQuery(event);
  const refType = query.type;

  if (!refType) {
    throw createError({
      statusCode: 400,
      statusMessage: "Query param not found",
    });
  }

  const { data } = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/list/ref/${findRefType(
      refType.valueOf()
    )}`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });

  return data || null;
});
