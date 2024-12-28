import type { commonDataMaster } from "./interface/pelakuUsahaProfileIntf";

export const dataMasterStore = defineStore({
  id: "dataMasterStore",
  state: () => ({
    masterJnbus: [] as Array<commonDataMaster>,
    masterJnush: [] as Array<commonDataMaster>,
    masterJnlgl: [] as Array<commonDataMaster>,
    masterStfas: [] as Array<commonDataMaster>,
    masterJnfas: [] as Array<commonDataMaster>,
    masterJnlay: [] as Array<commonDataMaster>,
    masterJnpro: [] as Array<commonDataMaster>,
  }),
  actions: {
    async getMasterData(mastertype: string): Promise<any> {
      const response = await $api(`master/common-code?type=${mastertype}`, {
        method: "get",
      });

      return response;
    },
    async initMasterData() {
      let response = await this.getMasterData("bustype");
      this.masterJnbus = response;

      response = await this.getMasterData("busscale");
      this.masterJnush = response;

      response = await this.getMasterData("legaldocs");
      this.masterJnlgl = response;

      response = await this.getMasterData("factorystatus");
      this.masterStfas = response;

      response = await this.getMasterData("JNFAS");
      this.masterJnfas = response;

      response = await this.getMasterData("jnlay");
      this.masterJnlay = response;

      response = await this.getMasterData("jnpro");
      this.masterJnpro = response;
    },
  },
});
