<script setup lang="ts">
import type { profileMain } from "@/stores/interface/pelakuUsahaProfileIntf";
import { formatCurrencyIntl } from "@/utils/conversionIntl";
import { useI18n } from "vue-i18n";
const panelOpen = ref(0);

const store = pelakuUsahaProfile();
const snackbar = useSnackbar();

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

const convertModalDasar = (value: string): string | undefined => {
  if (value) {
    if (
      props.profileData?.asal_usaha?.toLowerCase() == "instansi pemerintah" ||
      props.profileData?.asal_usaha?.toLowerCase() == "dalam negeri"
    ) {
      return formatCurrencyIntl(value);
    }
  }
  return value;
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
  jenis_badan_usaha: convertJnbus(store.profileData?.jenis_badan_usaha) || "-",
  skala_usaha: store.profileData?.skala_usaha || "-",
  modal_dasar: convertModalDasar(store.profileData?.modal_dasar) || "-",
  asal_usaha: convertFln(store.profileData?.asal_usaha),
  tingkat_usaha: convertFumk(store.profileData?.tingkat_usaha),
});

const profilData = ref([
  {
    id: 1,
    field: `${t("detail-pu.pu-profil-namapu")}`,
    value: store.profileData?.company_name || "-",
    disable: disableEdit(props.profileData?.asal_usaha),
    rules: [requiredValidator],
  },
  {
    id: 2,
    field: `${t("detail-pu.pu-profil-address")}`,
    value: store.profileData?.address || "-",
    disable: disableEdit(props.profileData?.asal_usaha),
    rules: [requiredValidator],
  },
  {
    id: 3,
    field: `${t("detail-pu.pu-profil-kota")}`,
    value: store.profileData?.city_name,
    disable: disableEdit(props.profileData?.asal_usaha),
    rules: [requiredValidator],
  },
  {
    id: 4,
    field: `${t("detail-pu.pu-profil-prov")}`,
    value: store.profileData?.province_name || "-",
    disable: disableEdit(props.profileData?.asal_usaha),
    rules: [requiredValidator],
  },
  {
    id: 5,
    field: `${t("detail-pu.pu-profil-kodepos")}`,
    value: store.profileData?.kode_pos_pu || "-",
    disable: disableEdit(props.profileData?.asal_usaha),
    rules: [requiredValidator],
  },
  {
    id: 6,
    field: `${t("detail-pu.pu-profil-negara")}`,
    value:
      store.profileData?.asal_usaha == "Dalam Negeri"
        ? "Indonesia"
        : store.profileData?.negara || "-",
    disable: disableEdit(props.profileData?.asal_usaha),
    rules: [requiredValidator],
  },
  {
    id: 7,
    field: `${t("detail-pu.pu-profil-telp")}`,
    value: store.profileData?.phone,
    disable: disableEdit(props.profileData?.asal_usaha),
    rules: [requiredValidator, integerValidator],
  },
  {
    id: 8,
    field: `${t("detail-pu.pu-profil-email")}`,
    value: store.profileData?.email,
    disable: disableEdit(props.profileData?.asal_usaha),
    rules: [requiredValidator, emailValidator],
  },
]);

async function getMasterData(mastertype: string) {
  const response = await $api(`master/common-code?type=${mastertype}`, {
    method: "get",
  });

  return response;
}

const jenisBadanUsahaOption = ref([]);
const skalaUsahaOption = ref([]);
const profileFormRef = ref<VForm>();
const profileSecondFormRef = ref<VForm>();

async function submitProfile() {
  Promise.all([
    profileFormRef.value?.validate(),
    profileSecondFormRef.value?.validate(),
  ]).then(([profileValid, profileSecValid]) => {
    if (profileValid && profileSecValid) {
      const body = {
        nama_pu: profilData.value[0].value,
        alamat_pu: profilData.value[1].value,
        kota_pu: profilData.value[2].value,
        provinsi_pu: profilData.value[3].value,
        kode_pos_pu: profilData.value[4].value,
        negara_pu: profilData.value[5].value,
        no_tlp: profilData.value[6].value,
        email: profilData.value[7].value,
        jenis_badan_usaha: form.value.jenis_badan_usaha,
        modal_dasar: parseInt(form.value.modal_dasar),
      };

      const submitApi = $api(
        `/pelaku-usaha-profile/${store.profileData?.id}/update-profile`,
        {
          method: "POST",
          body,
        }
      ).then((val: any) => {
        if (val.code == 2000) {
          store.fetchProfile();
          snackbar.sendSnackbar("Berhasil Mengubah Data ", "success");
        } else {
          snackbar.sendSnackbar("Gagal Mengubah Data ", "error");
        }
      });
    }
  });
}

async function submitProfilePemerintah() {
  profileSecondFormRef.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      const body = {
        email: profilData.value[7].value,
        jenis_badan_usaha: form.value.jenis_badan_usaha,
        modal_dasar: parseInt(form.value.modal_dasar),
      };

      const submitApi = $api(
        `/pelaku-usaha-profile/${store.profileData?.id}/update-profile`,
        {
          method: "POST",
          body,
        }
      ).then((val: any) => {
        if (val.code == 2000) {
          store.fetchProfile();
          snackbar.sendSnackbar("Berhasil Mengubah Data ", "success");
        } else {
          snackbar.sendSnackbar("Gagal Mengubah Data ", "error");
        }
      });
    }
  });
}

defineExpose({ submitProfile, submitProfilePemerintah });

onMounted(async () => {
  await store.fetchProfile();
  jenisBadanUsahaOption.value = await getMasterData("bustype");
  skalaUsahaOption.value = await getMasterData("busscale");
});

watch(
  () => store.profileData,
  (newData) => {
    if (newData) {
      profilData.value = [
        {
          id: 1,
          field: `${t("detail-pu.pu-profil-namapu")}`,
          value: newData.company_name,
          disable: disableEdit(newData?.asal_usaha),
          rules: [requiredValidator],
        },
        {
          id: 2,
          field: `${t("detail-pu.pu-profil-address")}`,
          value: newData.address,
          disable: disableEdit(newData?.asal_usaha),
          rules: [requiredValidator],
        },
        {
          id: 3,
          field: `${t("detail-pu.pu-profil-kota")}`,
          value: newData.city_name,
          disable: disableEdit(newData?.asal_usaha),
          rules: [requiredValidator],
        },
        {
          id: 4,
          field: `${t("detail-pu.pu-profil-prov")}`,
          value: newData.province_name,
          disable: disableEdit(newData?.asal_usaha),
          rules: [requiredValidator],
        },
        {
          id: 5,
          field: `${t("detail-pu.pu-profil-kodepos")}`,
          value: newData.kode_pos_pu,
          disable: disableEdit(newData?.asal_usaha),
          rules: [requiredValidator],
        },
        {
          id: 6,
          field: `${t("detail-pu.pu-profil-negara")}`,
          value: newData.negara,
          disable: disableEdit(newData?.asal_usaha),
          rules: [requiredValidator],
        },
        {
          id: 7,
          field: `${t("detail-pu.pu-profil-telp")}`,
          value: newData.phone,
          disable: disableEdit(newData?.asal_usaha),
          rules: [requiredValidator, integerValidator],
        },
        {
          id: 8,
          field: `${t("detail-pu.pu-profil-email")}`,
          value: newData.email,
          disable: disableEdit(newData?.asal_usaha),
          rules: [requiredValidator, emailValidator],
        },
      ];

      form.value.jenis_badan_usaha =
        convertJnbus(newData?.jenis_badan_usaha) || "-";
      form.value.skala_usaha = newData?.skala_usaha || "-";
      form.value.modal_dasar = convertModalDasar(newData?.modal_dasar) || "-";
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => [
    t("detail-pu.pu-profil-namapu"),
    t("detail-pu.pu-profil-address"),
    t("detail-pu.pu-profil-kota"),
    t("detail-pu.pu-profil-prov"),
    t("detail-pu.pu-profil-kodepos"),
    t("detail-pu.pu-profil-negara"),
    t("detail-pu.pu-profil-telp"),
    t("detail-pu.pu-profil-email"),
  ],
  (newData) => {
    profilData.value = profilData.value.map((item, index) => ({
      ...item,
      field: newData[index],
    }));
  },
  { immediate: true }
);
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <div class="text-h4 font-weight-bold">
          {{ t("detail-pu.pu-profil-title") }}
        </div>
      </VExpansionPanelTitle>
      <VExpansionPanelText style="display: flex; align-content: center">
        <VForm ref="profileFormRef">
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
                v-model="data.value"
                :disabled="data.disable"
                :rules="
                  !disableEdit(props.profileData?.asal_usaha) ? data.rules : []
                "
              ></VTextField>
            </VCol>
          </VRow>
        </VForm>
        <VDivider />
        <br />
        <VForm ref="profileSecondFormRef">
          <VRow>
            <VCol cols="4"> {{ t("detail-pu.pu-profil-jbu") }} </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="7">
              <VSelect
                density="compact"
                :disabled="
                  props.profileData?.asal_usaha?.toLowerCase() ==
                  'instansi pemerintah'
                    ? false
                    : disableEdit(props.profileData?.asal_usaha)
                "
                v-model="form.jenis_badan_usaha"
                :items="jenisBadanUsahaOption"
                item-title="name"
                item-value="code"
                :rules="[requiredValidator]"
              ></VSelect>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="4"> {{ t("detail-pu.pu-profil-tingkatu") }} </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="7">
              <VSelect
                density="compact"
                v-model="form.tingkat_usaha"
                :items="['UMK', 'Non UMK']"
                disabled
              ></VSelect>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="4" style="display: flex; align-items: center">
              {{ t("detail-pu.pu-profil-skala") }}
            </VCol>
            <VCol cols="1" style="display: flex; align-items: center"> : </VCol>
            <VCol cols="7">
              <VSelect
                density="compact"
                disabled
                v-model="form.skala_usaha"
                :items="skalaUsahaOption"
                item-title="name"
                item-value="code"
              ></VSelect>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="4"> {{ t("detail-pu.pu-profil-modal") }} </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="7">
              <VTextField
                density="compact"
                :disabled="
                  props.profileData?.asal_usaha?.toLowerCase() ==
                  'instansi pemerintah'
                    ? false
                    : disableEdit(props.profileData?.asal_usaha)
                "
                v-model="form.modal_dasar"
                :rules="[integerValidator, requiredValidator]"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="4"> {{ t("detail-pu.pu-profil-asal") }} </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="7">
              <!-- {{ props.profileData?.asal_usaha || "-" }} -->
              <VSelect
                v-if="props.profileData?.asal_usaha !== 'Luar Negeri'"
                density="compact"
                :disabled="disableEdit(props.profileData?.asal_usaha)"
                v-model="form.asal_usaha"
                :items="['Dalam Negeri', 'Luar Negeri']"
              ></VSelect>
              <VTextField v-else density="compact" disabled>{{
                props.profileData?.asal_usaha
              }}</VTextField>
            </VCol>
          </VRow>
        </VForm>

        <br />
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
