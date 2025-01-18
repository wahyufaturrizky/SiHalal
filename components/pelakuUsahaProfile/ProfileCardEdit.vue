<script setup lang="ts">
import type { profileMain } from "@/stores/interface/pelakuUsahaProfileIntf";
import { formatCurrencyIntl } from "@/utils/conversionIntl";
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

const convertJnbus = (code: string) => {
  if (code) {
    return "JBU." + code.substring(4);
  } else {
    return "-";
  }
};

const convertFln = (code: string): string => {
  if (!code) {
    return "Instansi Pemerintah";
  } else {
    return code == "Luar Negeri" ? "Luar Negeri" : "Domestik";
  }
};

const convertFumk = (code: string): string => {
  if (!code) {
    return "Non UMK";
  } else {
    return code == "1" ? "UMK" : "Non UMK";
  }
};

const disableEdit = (asalUsaha: string): boolean => {
  if (asalUsaha == "Luar Negeri") {
    return false;
  } else if (asalUsaha === "Dalam Negeri") {
    return true;
  } else {
    return true;
  }
};

const form = ref({
  name: props.profileData?.company_name || "-",
  alamat: props.profileData?.address || "-",
  kota_kab: props.profileData?.city_name || "-",
  provinsi: props.profileData?.province_name || "-",
  kodepos: props.profileData?.kode_pos_pu || "-",
  negara:
    props.profileData?.asal_usaha == "Dalam Negeri"
      ? "Indonesia"
      : props.profileData?.country_name || "-",
  phone: props.profileData?.phone || "-",
  email: props.profileData?.email || "-",
  jenis_badan_usaha: convertJnbus(props.profileData?.jenis_badan_usaha) || "-",
  skala_usaha: props.profileData?.skala_usaha || "-",
  modal_dasar: formatCurrencyIntl(props.profileData?.modal_dasar) || "-",
  asal_usaha: convertFln(props.profileData?.asal_usaha),
  tingkat_usaha: convertFumk(props.profileData?.tingkat_usaha),
});

const profilData = [
  {
    id: 1,
    field: "Nama Perusahaan",
    value: form.value.name,
    disable: disableEdit(props.profileData?.asal_usaha),
  },
  {
    id: 2,
    field: "Alamat",
    value: form.value.alamat,
    disable: disableEdit(props.profileData?.asal_usaha),
  },
  {
    id: 3,
    field: "Kota/Kab",
    value: form.value.kota_kab,
    disable: disableEdit(props.profileData?.asal_usaha),
  },
  {
    id: 4,
    field: "Provinsi",
    value: form.value.provinsi,
    disable: disableEdit(props.profileData?.asal_usaha),
  },
  {
    id: 5,
    field: "Kodepos",
    value: form.value.kodepos,
    disable: disableEdit(props.profileData?.asal_usaha),
  },
  {
    id: 6,
    field: "Negara",
    value: form.value.negara,
    disable: disableEdit(props.profileData?.asal_usaha),
  },
  {
    id: 7,
    field: "Telepon",
    value: form.value.phone,
    disable: disableEdit(props.profileData?.asal_usaha),
  },
  {
    id: 8,
    field: "Email",
    value: form.value.email,
    disable: disableEdit(props.profileData?.asal_usaha),
  },
];

async function getMasterData(mastertype: string) {
  const response = await $api(`master/common-code?type=${mastertype}`, {
    method: "get",
  });

  return response;
}

const jenisBadanUsahaOption = ref([]);
const skalaUsahaOption = ref([]);

onMounted(async () => {
  jenisBadanUsahaOption.value = await getMasterData("bustype");
  skalaUsahaOption.value = await getMasterData("busscale");
});
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <div class="text-h4 font-weight-bold">Profil</div>
      </VExpansionPanelTitle>
      <VExpansionPanelText style="display: flex; align-content: center">
        <VRow v-for="data in profilData" :key="data.id">
          <VCol cols="4">
            <p>{{ data.field }}</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="7">
            <!-- <p>{{ data.value }}</p> -->
            <VTextField
              density="compact"
              :value="data.value"
              :disabled="data.disable"
            ></VTextField>
          </VCol>
        </VRow>
        <VDivider />
        <br />
        <VRow>
          <VCol cols="4"> Jenis Badan Usaha </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7">
            <VSelect
              disabled
              :model-value="form.jenis_badan_usaha"
              :items="jenisBadanUsahaOption"
              item-title="name"
              item-value="code"
            ></VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Tingkat Usaha </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7">
            <VSelect
              :model-value="form.tingkat_usaha"
              :items="['UMK', 'Non UMK']"
              disabled
            ></VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4" style="display: flex; align-items: center">
            Skala Usaha
          </VCol>
          <VCol cols="1" style="display: flex; align-items: center"> : </VCol>
          <VCol cols="7">
            <VSelect
              disabled
              :model-value="form.skala_usaha"
              :items="skalaUsahaOption"
              item-title="name"
              item-value="code"
            ></VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Modal Dasar </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7">
            <VTextField
              :disabled="disableEdit(props.profileData?.asal_usaha)"
              >{{ form.modal_dasar }}</VTextField
            >
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Asal Usaha </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7">
            <!-- {{ props.profileData?.asal_usaha || "-" }} -->
            <VSelect
              :disabled="disableEdit(props.profileData?.asal_usaha)"
              :model-value="form.asal_usaha"
              :items="['Dalam Negeri', 'Luar Negeri']"
            ></VSelect>
          </VCol>
        </VRow>
        <br />
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
