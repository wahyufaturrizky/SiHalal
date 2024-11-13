export default defineNuxtRouteMiddleware((to, from) => {
  const query = from.query;
  if (
    Object.keys(to.query).length === 0 ||
    Object.keys(to.query).at(0) !== "_t"
  ) {
    // Redirect to another page if there are no query parameters
    return navigateTo("/forgot-password");
  }
  return;
});
