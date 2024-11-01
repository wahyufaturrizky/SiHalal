import { defineStore } from "pinia";

export const useMyNewAccountStepStore = defineStore({
  id: "myNewAccountStepStore",
  state: () => ({
    step: 1,
  }),
  actions: {
    goToStep(value: any) {
      this.step = value;
    },
  },
});
