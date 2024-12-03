import { defineStore } from "pinia";

import {
  type apiProfileIntf,
  type businessUnit,
  type factory,
  type kbli,
  type legal,
  type outlet,
  type penanggungJawab,
  type profileMain,
  type supervisorHalal,
} from "./interface/pelakuUsahaProfileIntf";

export const pelakuUsahaProfile = defineStore({
  id: "pelakuUsahaProfileStore",
  state: () => ({
    profileData: null as profileMain | null,
    penanggungJawabHalal: null as penanggungJawab | null,
    BU: [] as Array<businessUnit>,
    factory: [] as Array<factory>,
    kbli: [] as Array<kbli>,
    legal: [] as Array<legal>,
    outlet: [] as Array<outlet>,
    supervisorData: [] as Array<supervisorHalal>,
    isLoading: true as Boolean,
  }),
  getters: {
    getProfileData: (state) => state.profileData,
    getPenanggungJawabHalal: (state) => state.penanggungJawabHalal,
    getBU: (state) => state.BU,
    getFactory: (state) => state.factory,
    getKbli: (state) => state.kbli,
    getLegal: (state) => state.legal,
    getOutlet: (state) => state.outlet,
    getSupervisorData: (state) => state.supervisorData,
  },
  actions: {
    async fetchProfile() {
      this.isLoading = true;
      try {
        const response = await $api<apiProfileIntf | any>(
          `/pelaku-usaha-profile`,
          {
            method: "get",
          }
        );

        console.log("response profile = ", JSON.stringify(response));

        if (response) {
          this.profileData = response.data.business_actor.profile;
          this.penanggungJawabHalal =
            response.data.business_actor.responsible_person;
          this.BU = response.data.business_actor.bussines_unit;
          this.factory = response.data.business_actor.factory;
          this.kbli = response.data.business_actor.kbli;
          this.legal = response.data.business_actor.legal;
          this.outlet = response.data.business_actor.outlet;
          this.supervisorData = response.data.business_actor.supervisor_halal;
        }
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
    setProfileData(input: profileMain) {
      this.profileData = { ...this.profileData, ...input };
    },
    setPenanggungJawab(input: penanggungJawab) {
      this.penanggungJawabHalal = { ...this.penanggungJawabHalal, ...input };
    },
    setBU(input: businessUnit) {
      this.BU.push(input);
    },
    setFactory(input: factory) {
      this.factory.push(input);
    },
    setKBLI(input: kbli) {
      this.kbli.push(input);
    },
    setLegal(input: legal) {
      this.legal.push(input);
    },
    setOutlet(input: outlet) {
      this.outlet.push(input);
    },
    setSupervisor(input: supervisorHalal) {
      this.supervisorData.push(input);
    },
    updateLegal(idLegal: string, newData: legal) {
      const idxOldData = this.legal.findIndex((val) => val.id == idLegal);
      this.legal[idxOldData] = newData;
    },
    deleteLegal(idLegal: string) {
      const idxOldData = this.legal.findIndex((val) => val.id == idLegal);
      this.legal.splice(idxOldData, 1);
    },
    updateFactory(idFactory: string, newData: factory) {
      const idxOldData = this.factory.findIndex((val) => val.id == idFactory);
      this.legal[idxOldData] = newData;
    },
    deleteFactory(idFactory: string) {
      const idxOldData = this.factory.findIndex((val) => val.id == idFactory);
      this.legal.splice(idxOldData, 1);
    },
  },
});
