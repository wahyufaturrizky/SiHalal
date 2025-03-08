import { defineStore } from "pinia";

export const useMyLoadingStore = defineStore({
  id: "myLoadingStore",
  state: () => ({ isLoading: false }),
  actions: {
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
  },
});
