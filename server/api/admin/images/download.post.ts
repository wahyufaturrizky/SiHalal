import type { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig();
    const { filename } = await getQuery(event);
    const data = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/documents/${filename}`,
      {
        method: "get",
      } as any
    );
    return data || null;
  } catch (error) {
    setResponseStatus(event, 400);

    return (error as NuxtError).data;
  }
});
