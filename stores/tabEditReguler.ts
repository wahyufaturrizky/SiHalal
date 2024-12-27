import { defineStore } from "pinia";

export const useMyTabEditRegulerStore = defineStore({
  id: "myTabEditRegulerStore",
  state: () => ({ produk: [], bahan: [], produkAllBahan: false }),
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
        this.bahan = response.data;
      } catch (error) {}
    },
    isAllBahanSelected() {
      console.log("ubah bahan");
      const distinctProductBahan = new Set(
        this.produk.flatMap((item) => item.bahan_selected)
      );
      const allBahanId = new Set(this.bahan.flatMap((item) => item.id));
      if (distinctProductBahan.size != allBahanId.size) {
        this.produkAllBahan = false;
        return false;
      }
      for (const value of allBahanId) {
        if (!distinctProductBahan.has(value)) {
          this.produkAllBahan = false;
          return false;
        }
      }
      this.produkAllBahan = true;
      return true;
    },
  },
});
