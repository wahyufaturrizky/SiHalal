export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    useCheckVersion();
  }
});
