import { defineStore } from "pinia";

export const useMyUpdateSubmissionEditStore = defineStore({
  id: "myUpdateSubmissionEditStore",
  state: () => ({ dataUpdate: "" }),
  actions: {
    setData(type: "identity" | "manufacture" | "product" | "document" | "") {
      this.dataUpdate = type;
    },
  },
});
