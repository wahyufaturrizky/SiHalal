import type { NuxtError } from "nuxt/app";

interface DraftBody {
  type: string;
}

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event: any) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }
  const body: DraftBody = await readBody(event);
  const { id } = body;

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pelaku-usaha/halal-certificate-reguler/pengambangan`,
    {
      method: "post",
      headers: { Authorization: authorizationHeader },
      body: {
        no_sertifikat: id,
      },
    }
  ).catch((err: NuxtError) => {
    // setResponseStatus(event, 400)

    return err.data;
  });

  return data || null;
});
