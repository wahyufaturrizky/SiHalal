import { defineStore } from "pinia";

export const useCommonRoutingStore = defineStore({
  id: "commonRoutingStore",
  state: () => ({
    currentRoute: "",
    previousRoute: "",
  }),
  actions: {
    setCurrentRoute(route: string) {
      this.currentRoute = route;
    },
    setPreviousRoute(prevRoute: string) {
      this.previousRoute = prevRoute;
    },
    getPreviousRoute() {
      return this.previousRoute;
    },
  },
});
