<script setup lang="ts">
import type { MasterDistrict } from "@/server/interface/master.iface";
import { computed, defineEmits, defineProps, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import type { VForm } from "vuetify/components";

const props = defineProps({
  mode: { type: String, default: "add" },
  initialData: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["confirmAdd", "confirmEdit", "cancel"]);

const { t } = useI18n();

const errorProhibitedName = ref(false);

const showErrorProhbName = () => {
  errorProhibitedName.value = true;
};

const hideErrorProhbName = () => {
  errorProhibitedName.value = false;
};

const isVisible = ref(false);

const masterDataStore = dataMasterStore();

const convertstfas = async (code: string) => {
  // const api = await masterDataStore.getMasterData("factorystatus");
  // console.log("convert stfas = ", statusOptions.value);
  return statusOptions.value.filter((val) => val.code == code)[0]?.code;
};

const openDialog = async () => {
  errorProhibitedName.value = false;
  if (props.mode == "add") resetForm();

  form.value.lokasiPabrik = "Dalam Negeri";
  if (form.value.negara?.toLowerCase().trim() !== "indonesia")
    form.value.lokasiPabrik = "Luar Negeri";

  await getProvince();
  statusOptions.value = await getMasterStatusPabrik();
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const pabrikFormRef = ref<VForm>();

const confirm = () => {
  const whichEmit: any = null;
  if (props.mode === "add") {
    // console.log("emitted add = ", form.value);
    pabrikFormRef.value?.validate().then(({ valid: isValid }) => {
      if (isValid) emit("confirmAdd", form.value);

      // closeDialog();
    });
  } else {
    pabrikFormRef.value?.validate().then(({ valid: isValid }) => {
      if (isValid) emit("confirmEdit", form.value, selectedIdPabrik.value);

      // closeDialog();
    });
  }
};

const cancel = () => {
  emit("cancel");
  closeDialog();
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});

const form = ref({
  lokasiPabrik: "",
  namaPabrik: "",
  alamatPabrik: "",
  kabKota: "",
  provinsi: "",
  negara: "Indonesia",
  kodePos: "",
  statusPabrik: "",
});

const statusOptions = ref([]);
const lokasiPabrikOptions = ["Dalam Negeri", "Luar Negeri"];

async function getMasterStatusPabrik() {
  return await $api("master/common-code?type=factorystatus", {
    method: "get",
  });
}
const provinsiOptions = ref();
const kabKotaOptions = ref();
const kodeposOptions = ref();

const getKodePos = async () => {
  const response: Array<{ code: string }> = await $api("/master/kode-pos", {
    method: "get",
    query: {
      kabupaten: form.value.kabKota,
      provinsi: form.value.provinsi,
    },
  });

  kodeposOptions.value = response.map((kode) => kode.code);
};

const getDistrict = async (kode: string) => {
  form.value.kabKota = "";

  const response: MasterDistrict[] = await $api("/master/district", {
    method: "post",
    body: {
      province: kode,
    },
  });

  kabKotaOptions.value = response;
};

const getProvince = async () => {
  const response = await $api("/master/province", {
    method: "get",
  });

  provinsiOptions.value = response;
};

const resetForm = () => {
  form.value = {
    lokasiPabrik: "",
    namaPabrik: "",
    alamatPabrik: "",
    kabKota: "",
    provinsi: "",
    negara: "Indonesia",
    kodePos: "",
    statusPabrik: "",
  };
};

// onMounted(async () => {
//   await getKodePos();
// });

const selectedIdPabrik = ref();

watch(
  () => props.initialData,
  (newData) => {
    if (props.mode === "edit" && newData) {
      const submitApi = $api(
        `/pelaku-usaha-profile/${newData.idPerson}/${newData.id}/detail-factory`,
        {
          method: "GET",
        }
      ).then((val: any) => {
        if (val.code == 2000) {
          // form.value = { ...val.data };
          form.value.namaPabrik = val.data.name;
          form.value.alamatPabrik = val.data.address;
          form.value.provinsi = val.data.province;
          form.value.negara = val.data.country;
          form.value.kodePos = val.data.zip_code;
          convertstfas(val.data.status).then((val) => {
            form.value.statusPabrik = val;
          });

          getDistrict(form.value.provinsi).then((val2: any) => {
            form.value.kabKota = val.data.city;
            getKodePos();
          });
        } else {
          // snackbar.sendSnackbar("Gagal mendapatkan Data ", "error");
          console.error("fetching data error");
        }
      });

      selectedIdPabrik.value = newData.id;
    }
  },
  { immediate: true }
);

defineExpose({ showErrorProhbName, hideErrorProhbName, closeDialog });
</script>

<template>
  <div class="mb-2">
    <VBtn
      v-if="props.mode === 'add'"
      variant="outlined"
      append-icon="ri-add-line"
      @click="openDialog"
    >
      {{ t("detail-pu.pu-edit-add") }}
    </VBtn>
    <VBtn
      v-else-if="props.mode === 'edit'"
      variant="text"
      prepend-icon="ri-edit-line"
      @click="openDialog"
    >
      {{ t("detail-pu.pu-edit-edit") }}
    </VBtn>
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>{{
            props.mode === "add"
              ? t("detail-pu.pu-pabrik-modal-title-add")
              : t("detail-pu.pu-pabrik-modal-title-edit")
          }}</span>
          <VBtn
            icon
            color="transparent"
            style="border: none"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black"> ri-close-line </VIcon>
          </VBtn>
        </VCardTitle>

        <VCardText>
          <!-- Lokasi Pabrik -->
          <VForm ref="pabrikFormRef">
            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel> {{ t("detail-pu.pu-pabrik-modal-1") }} </VLabel>
                <VAutocomplete
                  v-model="form.lokasiPabrik"
                  :rules="[requiredValidator]"
                  :items="lokasiPabrikOptions"
                  placeholder="Pilih Lokasi Pabrik"
                  outlined
                  dense
                  required
                  class="input-field"
                />
              </VCol>
            </VRow>

            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>{{ t("detail-pu.pu-pabrik-modal-2") }} </VLabel>
                <VTextField
                  v-model="form.namaPabrik"
                  :rules="[requiredValidator]"
                  :placeholder="t('detail-pu.pu-pabrik-fill-modal-1')"
                  outlined
                  dense
                  required
                  class="input-field"
                />
                <br />
                <span v-if="errorProhibitedName" class="error-text">
                  <VIcon icon="mdi-alert-circle" color="error" size="small" />
                  {{ t("detail-pu.pu-pabrik-validasi-warn") }}
                </span>
              </VCol>
            </VRow>

            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>{{ t("detail-pu.pu-pabrik-modal-3") }}</VLabel>
                <VTextField
                  v-model="form.alamatPabrik"
                  :rules="[requiredValidator]"
                  :placeholder="t('detail-pu.pu-pabrik-fill-modal-2')"
                  outlined
                  dense
                  required
                  class="input-field"
                />
              </VCol>
            </VRow>

            <VRow v-if="form.lokasiPabrik == 'Dalam Negeri'" class="mb-1">
              <VCol cols="6">
                <VLabel>{{ t("detail-pu.pu-pabrik-modal-4") }}</VLabel>
                <VAutocomplete
                  v-model="form.provinsi"
                  :rules="[requiredValidator]"
                  :items="provinsiOptions"
                  item-title="name"
                  item-value="code"
                  placeholder="Pilih Provinsi"
                  outlined
                  dense
                  required
                  class="input-field"
                  @update:model-value="getDistrict"
                />
              </VCol>
              <VCol cols="6">
                <VLabel>{{ t("detail-pu.pu-pabrik-modal-5") }}</VLabel>
                <VAutocomplete
                  v-model="form.kabKota"
                  :rules="[requiredValidator]"
                  :items="kabKotaOptions"
                  item-title="name"
                  item-value="code"
                  placeholder="Pilih Kab/Kota"
                  outlined
                  dense
                  required
                  class="input-field"
                  @update:model-value="getKodePos"
                />
              </VCol>
            </VRow>
            <VRow v-if="form.lokasiPabrik == 'Luar Negeri'" class="mb-1">
              <VCol cols="6">
                <VLabel>{{ t("detail-pu.pu-pabrik-modal-4") }}</VLabel>
                <VTextField
                  v-model="form.provinsi"
                  :rules="[requiredValidator]"
                  placeholder="Isi Provinsi"
                  outlined
                  dense
                  required
                  class="input-field"
                />
              </VCol>
              <VCol cols="6">
                <VLabel>{{ t("detail-pu.pu-pabrik-modal-5") }}</VLabel>
                <VTextField
                  v-model="form.kabKota"
                  placeholder="Isi Kab/Kota"
                  outlined
                  dense
                  required
                  class="input-field"
                />
              </VCol>
            </VRow>

            <!-- Negara and Kode Pos -->
            <VRow class="mb-1">
              <VCol cols="6" class="pe-1">
                <VLabel>{{ t("detail-pu.pu-pabrik-modal-6") }}</VLabel>
                <VTextField
                  v-model="form.negara"
                  :rules="[requiredValidator]"
                  placeholder="Isi Negara"
                  outlined
                  dense
                  class="input-field"
                />
              </VCol>
              <VCol cols="6" class="ps-1">
                <VLabel>{{ t("detail-pu.pu-pabrik-modal-7") }}</VLabel>
                <VTextField
                  v-if="form.lokasiPabrik === 'Luar Negeri'"
                  v-model="form.kodePos"
                  :rules="[requiredValidator, integerValidator]"
                  :placeholder="t('detail-pu.pu-pabrik-fill-modal-3')"
                  outlined
                  dense
                  required
                  class="input-field"
                />
                <VSelect
                  v-if="form.lokasiPabrik == 'Dalam Negeri'"
                  v-model="form.kodePos"
                  :disabled="form.provinsi == '' || form.kabKota == ''"
                  :items="kodeposOptions"
                  item-value="code"
                  item-title="code"
                  :placeholder="t('detail-pu.pu-pabrik-fill-modal-3')"
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>

            <!-- Status Pabrik -->
            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>{{ t("detail-pu.pu-pabrik-modal-8") }}</VLabel>
                <VAutocomplete
                  v-model="form.statusPabrik"
                  :rules="[requiredValidator]"
                  :items="statusOptions"
                  item-title="name"
                  item-value="code"
                  placeholder="Pilih Status Pabrik"
                  outlined
                  dense
                  required
                  class="input-field"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>

        <div class="d-flex justify-end ga-2">
          <VBtn variant="outlined" @click="cancel">
            {{ t("detail-pu.pu-pabrik-button-cancel") }}
          </VBtn>
          <VBtn color="primary" @click="confirm">
            {{
              props.mode === "add"
                ? t("detail-pu.pu-pabrik-button-add")
                : t("detail-pu.pu-pabrik-button-save")
            }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.input-field {
  block-size: 36px;
}
</style>
