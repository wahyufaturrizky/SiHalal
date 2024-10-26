import { ensurePrefix } from "@antfu/utils";

export const getPublicUrl = (path: string) => {
  const baseUrl = useRuntimeConfig().public.appBaseUrl ?? "";

  const pathWithBaseUrl = `${baseUrl}${path}`;
  return pathWithBaseUrl;

  return `${ensurePrefix("/", pathWithBaseUrl)}`.replaceAll("//", "/");
};
