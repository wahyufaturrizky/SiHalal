import type { NuxtError } from "nuxt/app";

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
  const body: Importer = await readBody(event);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/certificate-halal-foreign/${body.id}/identity`,
    {
      method: "put",
      headers: { Authorization: authorizationHeader },
      body,
    }
  ).catch((err: NuxtError) => {
    return err.data;
  });

  return data || null;
});

interface Importer {
  id: string;
  profile: Profile;
  hcb: Hcb;
  hcn: Hcn;
}

interface Profile {
  api_type: string;
}

interface Hcb {
  hcb_id: string;
  address: string;
  company_name: string;
  corporate_id_number: string;
  country: string;
}

interface Hcn {
  expired_date: string;
  hcn_number: string;
  issued_date: string;
  scope: string;
}
