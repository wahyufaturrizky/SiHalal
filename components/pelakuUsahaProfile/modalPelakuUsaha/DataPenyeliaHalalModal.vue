<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import { VForm } from "vuetify/components";

const props = defineProps({
  mode: { type: String, default: "add" },
  initialData: { type: Object, default: () => ({}) },
});

const store = pelakuUsahaProfile();

const emit = defineEmits(["confirmAdd", "confirmEdit", "cancel"]);

const isVisible = ref(false);

const openDialog = () => {
  if (props.mode == "add") {
    form.value = { ...initAddData };
  }
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
    console.log("edited data", val.data);
    // form.value = { ...val.data };
    form.value.noKtp = val.data.id_number;
    form.value.noKontak = val.data.phone_number;
    form.value.namaPenyelia = val.data.name;
    form.value.agamaPenyelia = val.data.religion;
    form.value.nomorSertifikat = val.data.certificate_number;
    form.value.tanggalSertifikat = new Date(val.data.certificate_date)
      .toISOString()
      .substring(0, 10);
    form.value.nomorSk = val.data.sk_number;
    form.value.tanggalSk = new Date(val.data.sk_date)
      .toISOString()
      .substring(0, 10);
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
      console.log("existing data", newData);
      // form.value = { ...newData };
      selectedIdPenyelia.value = newData.id;
      fillEditForm(newData);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="ma-1">
    <VBtn
      v-if="props.mode === 'add'"
      @click="openDialog"
      variant="outlined"
      append-icon="ri-add-line"
    >
      Tambah
    </VBtn>

    <VItemGroup
      v-else-if="props.mode === 'edit'"
      @click="openDialog"
      style="cursor: pointer; display: inline-flex"
    >
      <VIcon class="mr-2"> mdi-pencil </VIcon>
      <p>Edit</p>
    </VItemGroup>
    <!-- <VBtn
      v-else-if="props.mode === 'edit'"
      @click="openDialog"
      variant="outlined"
      prepend-icon="ri-edit-line"
    >
      Edit
    </VBtn> -->
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>{{
            props.mode === "add"
              ? "Tambah Data Penyelia Halal"
              : "Edit Data Penyelia Halal"
          }}</span>
          <VBtn
            icon
            color="transparent"
            style="border: none"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black">ri-close-line</VIcon>
          </VBtn>
        </VCardTitle>
        <VCardText>
          <VForm ref="penyeliaFormRef">
            <VRow>
              <VCol cols="6">
                <VTextField
                  :rules="[requiredValidator]"
                  v-model="form.noKtp"
                  label="No. KTP"
                  outlined
                  dense
                  required
                />
              </VCol>
              <VCol cols="6">
                <VTextField
                  :rules="[requiredValidator]"
                  v-model="form.noKontak"
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
                  :rules="[requiredValidator]"
                  v-model="form.namaPenyelia"
                  label="Nama Penyelia"
                  outlined
                  dense
                  required
                />
              </VCol>
              <VCol cols="6">
                <VSelect
                  :rules="[requiredValidator]"
                  v-model="form.agamaPenyelia"
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
                  :rules="[requiredValidator]"
                  v-model="form.nomorSertifikat"
                  label="Nomor Sertifikat"
                  outlined
                  dense
                  required
                />
              </VCol>
              <VCol cols="6">
                <VTextField
                  :rules="[requiredValidator]"
                  v-model="form.tanggalSertifikat"
                  label="Tanggal Sertifikat"
                  outlined
                  dense
                  required
                  type="date"
                />
              </VCol>
            </VRow>
            <VRow class="mb-2">
              <VCol cols="6">
                <VTextField
                  :rules="[requiredValidator]"
                  v-model="form.nomorSk"
                  label="Nomor SK"
                  outlined
                  dense
                  required
                />
              </VCol>
              <VCol cols="6">
                <VTextField
                  :rules="[requiredValidator]"
                  v-model="form.tanggalSk"
                  label="Tanggal SK"
                  outlined
                  dense
                  required
                  type="date"
                />
              </VCol>
            </VRow>
            <VFileInput
              :rules="[requiredValidator]"
              v-model="form.sertifikatKompetensi"
              label="Unggah Sertifikat Kompetensi Penyelia Halal"
              outlined
              dense
              accept=".pdf,.jpg,.png"
              class="mb-2"
            />
            <VFileInput
              :rules="[requiredValidator]"
              v-model="form.sertifikatPelatihan"
              label="Unggah Sertifikat Pelatihan Penyelia Halal"
              outlined
              dense
              accept=".pdf,.jpg,.png"
              class="mb-2"
            />
            <VFileInput
              :rules="[requiredValidator]"
              v-model="form.ktpFile"
              label="Unggah KTP"
              outlined
              dense
              accept=".pdf,.jpg,.png"
              class="mb-2"
            />
          </VForm>
        </VCardText>

        <div class="d-flex justify-end gap-2">
          <VBtn @click="cancel" variant="outlined"> Batal </VBtn>
          <VBtn @click="confirms" color="primary">
            {{ props.mode === "add" ? "Tambah" : "Simpan" }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped></style>
