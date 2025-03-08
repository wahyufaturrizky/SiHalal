export default defineNuxtPlugin((nuxtApp) => {
  const loadingStore = useMyLoadingStore();

  // Hook into $fetch requests
  nuxtApp.hook("app:fetch:request", () => {
    loadingStore.startLoading();
  });

  nuxtApp.hook("app:fetch:response", () => {
    loadingStore.stopLoading();
  });

  nuxtApp.hook("app:fetch:error", () => {
    loadingStore.stopLoading();
  });
});
