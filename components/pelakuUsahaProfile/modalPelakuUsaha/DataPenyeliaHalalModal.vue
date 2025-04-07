<script setup lang="ts">
import { formatToDDMMYYYY } from "@/utils/formatToISOString";
import { defineEmits, defineProps, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { VForm, VTextField } from "vuetify/components";

const props = defineProps({
  mode: { type: String, default: "add" },
  initialData: { type: Object, default: () => ({}) },
  data: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(["confirmAdd", "confirmEdit", "cancel"]);
const store = pelakuUsahaProfile();

const isNoNeedValidation = () => {
  console.log("validation = ", props?.data?.skala_usaha);

  return (
    props?.data?.skala_usaha === "JU.4" || props?.data?.skala_usaha === "JU.3"
  );
};

const isVisible = ref(false);

const openDialog = () => {
  if (props.mode == "add") form.value = { ...initAddData };

  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const penyeliaFormRef = ref<VForm>();

const confirms = () => {
  if (props.mode === "add") {
    // form.value = { ...initAddData };
    penyeliaFormRef.value?.validate().then(({ valid: isValid }) => {
      if (isValid) {
        emit("confirmAdd", form.value);
        closeDialog();
      }
    });
  } else {
    penyeliaFormRef.value?.validate().then(({ valid: isValid }) => {
      if (isValid) {
        emit("confirmEdit", form.value, selectedIdPenyelia.value);
        closeDialog();
      }
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
  noKtp: "",
  noKontak: "",
  namaPenyelia: "",
  agamaPenyelia: "",
  nomorSertifikat: "",
  tanggalSertifikat: "",
  nomorSk: "",
  tanggalSk: "",
  sertifikatKompetensi: null,
  sertifikatPelatihan: null,
  ktpFile: null,
});

const initAddData = {
  noKtp: "",
  noKontak: "",
  namaPenyelia: "",
  agamaPenyelia: "",
  nomorSertifikat: "",
  tanggalSertifikat: "",
  nomorSk: "",
  tanggalSk: "",
  sertifikatKompetensi: null,
  sertifikatPelatihan: null,
  ktpFile: null,
};

const fillEditForm = async (newData) => {
  const val: any = await $api(
    `/pelaku-usaha-profile/${store.profileData?.id}/penyelia/${newData.id}/detail`,
    {
      method: "GET",
    }
  );

  if (val.code == 2000) {
    // console.log("edited data", val.data);
    // form.value = { ...val.data };
    form.value.noKtp = val.data.id_number;
    form.value.noKontak = val.data.phone_number;
    form.value.namaPenyelia = val.data.name;
    form.value.agamaPenyelia = val.data.religion;
    form.value.nomorSertifikat = val.data.certificate_number;
    form.value.tanggalSertifikat = formatToDDMMYYYY(
      new Date(val.data.certificate_date)
    );
    form.value.nomorSk = val.data.sk_number;
    form.value.tanggalSk = formatToDDMMYYYY(new Date(val.data.sk_date));
    form.value.sertifikatKompetensi = val.data.skph_file;
    form.value.sertifikatPelatihan = val.data.spph_file;
    form.value.ktpFile = val.data.ktp_file;
  }
};

const selectedIdPenyelia = ref("");

watch(
  () => props.initialData,
  (newData) => {
    if (props.mode === "edit" && newData) {
      // console.log("existing data", newData);
      // form.value = { ...newData };
      selectedIdPenyelia.value = newData.id;
      fillEditForm(newData);
    }
  },
  { immediate: true }
);

const ktpError = ref("");

const checkKtp = async (item) => {
  ktpError.value = "";
  if (isNoNeedValidation.value) {
    if (item.length == 16) {
      const val: any = await $api(`/pelaku-usaha-profile/check-nik/${item}`, {
        method: "GET",
      });

      if (val.code == 2000) form.value.namaPenyelia = val.data.nama;

      if (val.code == 4000) ktpError.value = val.message;
    }
  }
};

const { t } = useI18n();
</script>

<template>
  <div class="ma-1">
    <VBtn
      v-if="props.mode === 'add'"
      variant="outlined"
      append-icon="ri-add-line"
      @click="openDialog"
    >
      {{ t("detail-pu.pu-edit-add") }}
    </VBtn>

    <VItemGroup
      v-else-if="props.mode === 'edit'"
      style="display: inline-flex; cursor: pointer"
      @click="openDialog"
    >
      <VIcon class="mr-2"> mdi-pencil </VIcon>
      <p>{{ t("detail-pu.pu-edit-edit") }}</p>
    </VItemGroup>
    <!--
      <VBtn
      v-else-if="props.mode === 'edit'"
      @click="openDialog"
      variant="outlined"
      prepend-icon="ri-edit-line"
      >
      Edit
      </VBtn>
    -->
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle>
          <div
            class="text-h5 font-weight-bold d-flex justify-space-between align-center"
          >
            <span>{{
              props.mode === "add"
                ? t("detail-pu.pu-penyelia-halal-tambah-title")
                : t("detail-pu.pu-penyelial-halal-edit-title")
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
          </div>
          <div class="bgContent">
            <div class="d-flex mt-5">
              <VIcon
                icon="ri-error-warning-line"
                color="#652672"
                class="mt-1"
              />
              <div class="wrap-text">
                <label class="subText"
                  >Pelaku Usaha Besar, Menengah, dan Luar Negeri wajib
                  melengkapi Nomor Sertifikat, Tanggal Sertifikat, Sertifikat
                  Kompetensi dan Pelatihan Penyelia Halal.</label
                >
              </div>
            </div>
          </div>
        </VCardTitle>

        <VCardText>
          <VForm ref="penyeliaFormRef">
            <VRow>
              <VCol cols="6">
                <VTextField
                  v-model="form.noKtp"
                  :rules="
                    isNoNeedValidation
                      ? []
                      : [
                          requiredValidator,
                          integerValidator,
                          lengthValidator(form.noKtp, 16),
                        ]
                  "
                  label="No. KTP"
                  outlined
                  dense
                  required
                  maxlength="16"
                  :error-messages="ktpError"
                  @update:model-value="checkKtp"
                />
              </VCol>
              <VCol cols="6">
                <VTextField
                  v-model="form.noKontak"
                  :rules="[requiredValidator, phoneNumberIdValidator]"
                  label="No. Kontak"
                  outlined
                  dense
                  required
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="6">
                <VTextField
                  v-model="form.namaPenyelia"
                  :rules="[
                    requiredValidator,
                    regexValidator(
                      form.namaPenyelia,
                      /^(?!.*\s\s)[a-zA-Z\s']+$/,
                      'Format nama penyelia tidak sesuai'
                    ),
                  ]"
                  label="nama"
                  outlined
                  dense
                  required
                />
              </VCol>
              <VCol cols="6">
                <VSelect
                  v-model="form.agamaPenyelia"
                  :rules="[requiredValidator]"
                  :items="['Islam']"
                  label="Agama Penyelia"
                  outlined
                  dense
                  required
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="6">
                <VTextField
                  v-model="form.nomorSertifikat"
                  :rules="isNoNeedValidation ? [] : [requiredValidator]"
                  label="Nomor Sertifikat"
                  outlined
                  dense
                  required
                />
              </VCol>
              <VCol cols="6">
                <!--                <VTextField -->
                <!--                  :rules="isNoNeedValidation ? [] : [requiredValidator]" -->
                <!--                  v-model="form.tanggalSertifikat" -->
                <!--                  label="Tanggal Sertifikat" -->
                <!--                  outlined -->
                <!--                  dense -->
                <!--                  required -->
                <!--                  type="date" -->
                <!--                /> -->
                <Vuepicdatepicker
                  v-model:model-value="form.tanggalSertifikat"
                  auto-apply
                  model-type="DD/MM/YYYY"
                  :enable-time-picker="false"
                  clearable
                  position="auto"
                >
                  <template #trigger>
                    <VTextField
                      placeholder="Tanggal Sertifikat"
                      readonly
                      append-inner-icon="fa-calendar"
                      :model-value="form.tanggalSertifikat"
                      :rules="isNoNeedValidation ? [] : [requiredValidator]"
                    />
                  </template>
                </Vuepicdatepicker>
              </VCol>
            </VRow>
            <VRow class="mb-2">
              <VCol cols="6">
                <VTextField
                  v-model="form.nomorSk"
                  :rules="[requiredValidator]"
                  label="Nomor SK"
                  outlined
                  dense
                  required
                />
              </VCol>
              <VCol cols="6">
                <!--                <VTextField -->
                <!--                  :rules="[requiredValidator]" -->
                <!--                  v-model="form.tanggalSk" -->
                <!--                  label="Tanggal SK" -->
                <!--                  outlined -->
                <!--                  dense -->
                <!--                  required -->
                <!--                  type="date" -->
                <!--                /> -->

                <Vuepicdatepicker
                  v-model:model-value="form.tanggalSk"
                  auto-apply
                  model-type="DD/MM/YYYY"
                  :enable-time-picker="false"
                  clearable
                  position="auto"
                >
                  <template #trigger>
                    <VTextField
                      placeholder="Tanggal SK"
                      readonly
                      append-inner-icon="fa-calendar"
                      :model-value="form.tanggalSk"
                      :rules="[requiredValidator]"
                    />
                  </template>
                </Vuepicdatepicker>
              </VCol>
            </VRow>
            <VTooltip
              text="Upload file hanya untuk - pdf, png, jpeg, jpg dan Max file-size 2MB"
            >
              <template #activator="{ props: tooltipOpen }">
                <VFileInput
                  v-model="form.sertifikatKompetensi"
                  :rules="
                    isNoNeedValidation
                      ? []
                      : [
                          requiredValidator,
                          fileSizeValidator,
                          fileNameLengthValidator,
                          fileExtensionValidator,
                        ]
                  "
                  label="Unggah Sertifikat Kompetensi Penyelia Halal"
                  outlined
                  dense
                  accept=".pdf,.jpg,.png,.jpeg"
                  class="mb-2"
                  v-bind="tooltipOpen"
                />
              </template>
            </VTooltip>
            <VTooltip
              text="Upload file hanya untuk - pdf, png, jpeg, jpg dan Max file-size 2MB"
            >
              <template #activator="{ props: tooltipPelatihan }">
                <VFileInput
                  v-model="form.sertifikatPelatihan"
                  :rules="
                    isNoNeedValidation
                      ? []
                      : [
                          requiredValidator,
                          fileSizeValidator,
                          fileNameLengthValidator,
                          fileExtensionValidator,
                        ]
                  "
                  label="Unggah Sertifikat Pelatihan Penyelia Halal"
                  outlined
                  dense
                  accept=".pdf,.jpg,.png,.jpeg"
                  class="mb-2"
                  v-bind="tooltipPelatihan"
                />
              </template>
            </VTooltip>
            <VTooltip
              text="Upload file hanya untuk - pdf, png, jpeg, jpg dan Max file-size 2MB"
            >
              <template #activator="{ props: tooltipKtp }">
                <VFileInput
                  v-model="form.ktpFile"
                  :rules="[
                    requiredValidator,
                    fileSizeValidator,
                    fileNameLengthValidator,
                    fileExtensionValidator,
                  ]"
                  label="Unggah KTP"
                  outlined
                  dense
                  accept=".pdf,.jpg,.png,.jpeg"
                  class="mb-2"
                  v-bind="tooltipKtp"
                />
              </template>
            </VTooltip>
          </VForm>
        </VCardText>

        <div class="d-flex justify-end gap-2">
          <VBtn variant="outlined" @click="cancel"> Batal </VBtn>
          <VBtn color="primary" @click="confirms">
            {{ props.mode === "add" ? "Tambah" : "Simpan" }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.bgContent {
  border-radius: 10px;
  background-color: #f0e9f1;
  padding-inline-start: 10px;
}

.subText {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  color: #652672 !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  inline-size: auto;
  line-height: 18px !important;
  padding-inline-start: 10px;
}

.wrap-text {
  text-wrap: wrap;
}
</style>
