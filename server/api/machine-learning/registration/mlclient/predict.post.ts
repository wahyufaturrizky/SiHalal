import type { NuxtError } from "nuxt/app";
import type { NewAccountGovernment } from "~/server/interface/new-account.iface";

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const body: NewAccountGovernment = await readBody(event);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrlGateway}/registration/mlclient/predict`,
    {
      method: "post",
      body,
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);

    return err.data;
  });

  return data || null;
});
