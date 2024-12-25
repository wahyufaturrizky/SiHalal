export const $api = $fetch.create({
  // Request interceptor
  async onRequest({ options }) {
    // Set baseUrl for all API calls
    options.baseURL = useRuntimeConfig().public.apiBaseUrl || "/api";

    const accessToken = useCookie("accessToken").value;
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjYzMjI4MjQsInBheWxvYWQiOiJscGgxNyIsInN1YiI6ImZjNzIwOThkLTAxZTYtNDRkNi05ZGM0LTM4ZDUwYTUyYjEzZCIsInRva2VuX3V1aWQiOiJmZmU0NTBhMS01ZWVkLTQzZWQtYmNjNS1iMjY3ZTA3M2NlZDIifQ.2Zp70bQNfSdpuEX5T-XoOGoFJV8hTwws9Mtny9Y8N9EMezrvCIiKEKTO_ermaJH2c8_12iPgAnx13Aq-Q18haA`,
      };
    }
  },
  async onRequestError({ request, options, error }) {
    console.error("Request error:", error);
  },
});
