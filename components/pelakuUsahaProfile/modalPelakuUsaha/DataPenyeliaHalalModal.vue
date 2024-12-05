<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
  mode: { type: String, default: "add" },
  initialData: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["confirmAdd", "confirmEdit", "cancel"]);

const isVisible = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const confirms = () => {
  console.log("executed");
  if (props.mode === "add") {
    console.log("executed 2nd");
    emit("confirmAdd", form.value);
  } else {
    console.log("executed 3rd");
    emit("confirmEdit", form.value);
  }
  closeDialog();
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

watch(
  () => props.initialData,
  (newData) => {
    if (props.mode === "edit" && newData) {
      form.value = { ...newData };
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
    <VBtn
      v-else-if="props.mode === 'edit'"
      @click="openDialog"
      variant="outlined"
      prepend-icon="ri-edit-line"
    >
      Edit
    </VBtn>
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
          <VRow>
            <VCol cols="6">
              <VTextField
                v-model="form.noKtp"
                label="No. KTP"
                outlined
                dense
                required
              />
            </VCol>
            <VCol cols="6">
              <VTextField
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
                v-model="form.namaPenyelia"
                label="Nama Penyelia"
                outlined
                dense
                required
              />
            </VCol>
            <VCol cols="6">
              <VSelect
                v-model="form.agamaPenyelia"
                :items="['Islam', 'Kristen', 'Hindu', 'Buddha', 'Konghucu']"
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
                label="Nomor Sertifikat"
                outlined
                dense
                required
              />
            </VCol>
            <VCol cols="6">
              <VTextField
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
                v-model="form.nomorSk"
                label="Nomor SK"
                outlined
                dense
                required
              />
            </VCol>
            <VCol cols="6">
              <VTextField
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
            v-model="form.sertifikatKompetensi"
            label="Unggah Sertifikat Kompetensi Penyelia Halal"
            outlined
            dense
            accept=".pdf,.jpg,.png"
            class="mb-2"
          />
          <VFileInput
            v-model="form.sertifikatPelatihan"
            label="Unggah Sertifikat Pelatihan Penyelia Halal"
            outlined
            dense
            accept=".pdf,.jpg,.png"
            class="mb-2"
          />
          <VFileInput
            v-model="form.ktpFile"
            label="Unggah KTP"
            outlined
            dense
            accept=".pdf,.jpg,.png"
            class="mb-2"
          />
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
