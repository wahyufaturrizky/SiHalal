import { defineStore } from "pinia";

export const useMyTabEditRegulerStore = defineStore({
  id: "myTabEditRegulerStore",
  state: () => ({
    certificateHalal: {},
    produk: [],
    bahan: [],
    produkAllBahan: false,
    bahanCheck: false,
  }),
  actions: {
    async getProduct(submissionId: string) {
      try {
        const response: any = await $api(
          `/self-declare/business-actor/product/list`,
          {
            method: "get",
            query: {
              id_reg: submissionId,
            },
          } as any
        );

        if (response.code === 2000) {
          this.produk = response.data ? response.data : [];
        }
      } catch (error) {}
    },
    async getBahan(submissionId: string) {
      try {
        const options = {
          method: "get",
        };
        const response = await $api(
          `/self-declare/submission/bahan/${submissionId}/list`,
          options
        );
        if (response.code != 2000) {
          return;
        }
        this.bahan = response.data ? response.data : [];
      } catch (error) {}
    },
    isAllBahanSelected() {
      const distinctProductBahan = new Set(
        this.produk.flatMap((item) => item.bahan_selected)
      );
      // const allBahanId = new Set(this.bahan.flatMap((item) => item.id));
      // if (distinctProductBahan.size != allBahanId.size) {
      //   this.produkAllBahan = false;
      //   return false;
      // }
      // for (const value of allBahanId) {
      //   if (!distinctProductBahan.has(value)) {
      //     this.produkAllBahan = false;
      //     return false;
      //   }
      // }
      if (distinctProductBahan.size < 1) {
        this.produkAllBahan = false;
        return false;
      } else {
        this.produkAllBahan = true;
        return true;
      }
    },
    isBahan() {
      let countBahan = 0;
      const jenisBahan = new Set(this.bahan.map((item) => item.jenis_bahan));
      const verifyBahan = new Set(["Kemasan", "Cleaning Agent", "Bahan"]);
      if (jenisBahan.size != verifyBahan.size) {
        this.bahanCheck = false;
        return false;
      }
      for (const value of verifyBahan) {
        if (!jenisBahan.has(value)) {
          this.bahanCheck = false;
          return false;
        }
      }
      this.bahan.map((item: any) => {
        if (item.jenis_bahan === "Bahan") {
          countBahan ++
        }
      })
      if (countBahan < 3) {
        this.bahanCheck = false;
        return false;
      }
      this.bahanCheck = true;

      return true;
    },
    setCertificateHalal(cert: any) {
      this.certificateHalal = cert;
    },
    getCertificateHalal() {
      return this.certificateHalal;
    },
    async getApiCertHalal(submissionId: string) {
      try {
        const response: any = await $api(
          `/self-declare/submission/${submissionId}/detail`,
          {
            method: "get",
          }
        );

        if (response.code === 2000) {
          this.certificateHalal = response.data.certificate_halal;
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
