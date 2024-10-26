import { ensurePrefix } from "@antfu/utils";

export const getPublicUrl = (path: string) => {
  const baseUrl = useRuntimeConfig().public.apiBaseUrl ?? "";

  const pathWithBaseUrl = `${baseUrl}${path}`;

  return `${ensurePrefix("/", pathWithBaseUrl)}`.replaceAll("//", "/");
};
