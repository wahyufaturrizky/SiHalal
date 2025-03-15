import { defineStore } from "pinia";

export const useMyRegulerPelakuUsahaStore = defineStore({
  id: "myRegulerPelakuUsahaStore",
  state: () => ({
    dataPengajuanCertData: {},
  }),
  actions: {
    setCertData(value: any) {
      this.dataPengajuanCertData = value;
    },
    getCertData() {
      return this.dataPengajuanCertData;
    },
  },
});
