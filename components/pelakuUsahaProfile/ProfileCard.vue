<script setup lang="ts">
import type { profileMain } from "@/stores/interface/pelakuUsahaProfileIntf";
import { formatCurrencyIntl } from "@/utils/conversionIntl";
import { useI18n } from "vue-i18n";
const panelOpen = ref(0);
const { t } = useI18n();
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
    field: `${t("detail-pu.pu-profil-namapu")}`,
    value: props.profileData?.company_name || "-",
  },
  {
    id: 2,
    field: `${t("detail-pu.pu-profil-address")}`,
    value: props.profileData?.address || "-",
  },
  {
    id: 3,
    field: `${t("detail-pu.pu-profil-kota")}`,
    value: props.profileData?.city_name || "-",
  },
  {
    id: 4,
    field: `${t("detail-pu.pu-profil-prov")}`,
    value: props.profileData?.province_name || "-",
  },
  {
    id: 5,
    field: `${t("detail-pu.pu-profil-kodepos")}`,
    value: props.profileData?.kode_pos_pu || "-",
  },
  {
    id: 6,
    field: `${t("detail-pu.pu-profil-negara")}`,
    value:
      props.profileData?.asal_usaha == "Dalam Negeri"
        ? "Indonesia"
        : props.profileData?.negara,
  },
  {
    id: 7,
    field: `${t("detail-pu.pu-profil-telp")}`,
    value: props.profileData?.phone || "-",
  },
  {
    id: 8,
    field: `${t("detail-pu.pu-profil-email")}`,
    value: props.profileData?.email || "-",
  },
];

async function getMasterData(mastertype: string) {
  const response = await $api(`master/common-code?type=${mastertype}`, {
    method: "get",
  });

  return response;
}

const convertJnbus = async (code: string) => {
  // const jnbusCode = "JBU." + code.substring(1);
  const api = await getMasterData("bustype");

  return api.filter((val) => val.code == code)[0]?.name;
};

const convertJnush = async (code: string) => {
  const jnushCode = code;
  const api = await getMasterData("busscale");

  // console.log("jnush => ", );

  return api.filter((val) => val.code == jnushCode)[0]?.name;
};

const convertFln = (code: string): string => {
  if (!code) {
    return "Instansi Pemerintah";
  } else {
    return code == "1" || code == "Luar Negeri" ? "Luar Negeri" : "Domestik";
  }
};

const convertFumk = (code: string): string => {
  if (!code) {
    return "Non UMK";
  } else {
    return code == "1" ? "UMK" : "Non UMK";
  }
};

const jenisBadanUsaha = ref();
const skalaUsaha = ref();

onMounted(async () => {
  jenisBadanUsaha.value = await convertJnbus(
    props.profileData?.jenis_badan_usaha
  );
  skalaUsaha.value = await convertJnush(props.profileData?.skala_usaha);
});
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <div class="text-h4 font-weight-bold">
          {{ t("detail-pu.pu-profil-title") }}
        </div>
      </VExpansionPanelTitle>
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
          <VCol cols="4"> {{ t("detail-pu.pu-profil-jbu") }} </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7">
            {{ jenisBadanUsaha }}
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> {{ t("detail-pu.pu-profil-tingkatu") }} </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7">
            {{ convertFumk(props.profileData?.tingkat_usaha) || "-" }}
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4" style="display: flex; align-items: center">
            {{ t("detail-pu.pu-profil-skala") }}
          </VCol>
          <VCol cols="1" style="display: flex; align-items: center"> : </VCol>
          <VCol cols="7">
            {{ skalaUsaha || "-" }}
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> {{ t("detail-pu.pu-profil-modal") }} </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7">
            {{ formatCurrencyIntl(props.profileData?.modal_dasar) || "-" }}
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> {{ t("detail-pu.pu-profil-asal") }} </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7"> {{ props.profileData?.asal_usaha || "-" }} </VCol>
        </VRow>
        <br />
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
