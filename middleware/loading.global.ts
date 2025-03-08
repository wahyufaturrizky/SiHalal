export default defineNuxtRouteMiddleware((to, from) => {
  const loadingStore = useMyLoadingStore();
  loadingStore.startLoading();

  // Stop loading when the page is ready
  onNuxtReady(() => {
    loadingStore.stopLoading();
  });

  // Optional: Stop loading after navigation is complete
  return () => {
    loadingStore.stopLoading();
  };
});
