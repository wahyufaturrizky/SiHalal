import type { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event: any) => {
  try {
    const runtimeConfig = useRuntimeConfig();
    const response = await $fetch(
      `${runtimeConfig.authBaseUrl}/api/v1/image-auth/random`,
      {
        method: "get",
      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);

    return (error as NuxtError).data;
  }
});
