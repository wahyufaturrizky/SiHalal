export const $api = $fetch.create({
  // Request interceptor
  async onRequest({ options }) {
    // Set baseUrl for all API calls
    options.baseURL = useRuntimeConfig().public.apiBaseUrl || "/api";
    console.log(options.baseURL);

    const accessToken = useCookie("accessToken").value;
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  },
  async onRequestError({ request, options, error }) {
    console.error("Request error:", error);
  },
});
