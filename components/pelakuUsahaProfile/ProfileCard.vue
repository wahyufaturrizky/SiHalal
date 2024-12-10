<script setup lang="ts">
import type { profileMain } from "@/stores/interface/pelakuUsahaProfileIntf";
const panelOpen = ref(0);

const props = defineProps({
  profileData: {
    type: Object as profileMain | any,
    required: true,
  },
  mode: {
    type: String,
    default: "add",
  },
});
// onMounted(() => {
//   console.log("ini data props", props.profileData);
// });

const profilData = [
  {
    id: 1,
    field: "Nama Perusahaan",
    value: props.profileData?.company_name || "-",
  },
  {
    id: 2,
    field: "Alamat",
    value: props.profileData?.address || "-",
  },
  { id: 3, field: "Kota/Kab", value: props.profileData?.city_name || "-" },
  { id: 4, field: "Provinsi", value: props.profileData?.province_name || "-" },
  { id: 5, field: "Kodepos", value: props.profileData?.kode_pos_pu || "-" },
  { id: 6, field: "Negara", value: props.profileData?.country_name || "-" },
  { id: 7, field: "Telepon", value: props.profileData?.phone || "-" },
  { id: 8, field: "Email", value: props.profileData?.email || "-" },
];
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>Profil</h2></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow v-for="data in profilData" :key="data.id">
          <VCol cols="4">
            <p>{{ data.field }}</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="7">
            <p>{{ data.value }}</p>
          </VCol>
        </VRow>
        <VDivider />
        <br />
        <VRow>
          <VCol cols="4"> Jenis Badan Usaha </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7">
            {{ props.profileData?.jenis_badan_usaha || "-" }}
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Tingkat Usaha </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7"> {{ props.profileData?.tingkat_usaha || "-" }} </VCol>
        </VRow>
        <VRow>
          <VCol cols="4" style="display: flex; align-items: center">
            Skala Usaha
          </VCol>
          <VCol cols="1" style="display: flex; align-items: center"> : </VCol>
          <VCol cols="7">
            {{ props.profileData?.skala_usaha || "-" }}
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Modal Dasar </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7"> {{ props.profileData?.modal_dasar || "-" }} </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Asal Usaha </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7"> {{ props.profileData?.asal_usaha || "-" }} </VCol>
        </VRow>
        <br />
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
