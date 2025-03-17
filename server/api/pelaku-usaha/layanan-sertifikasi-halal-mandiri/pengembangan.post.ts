import type { NuxtError } from "nuxt/app";

interface DraftBody {
  no_sertifikat: string;
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
  const { no_sertifikat, type_pengembangan } = body;

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pelaku-usaha/layanan-sertifikasi-halal-mandiri/pengambangan`,
    {
      method: "post",
      headers: { Authorization: authorizationHeader },
      body: {
        no_sertifikat: no_sertifikat,
        type_pengembangan,
      },
    }
  ).catch((err: NuxtError) => {
    // setResponseStatus(event, 400)

    return err.data;
  });

  return data || null;
});
