<template>
  <div class="mb-2">
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
              ? "Tambah Data Aspek Legal"
              : "Edit Data Aspek Legal"
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
          <VForm ref="legalForm">
            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>Jenis Document</VLabel>
                <VAutocomplete
                  v-model="form.type"
                  :items="documentTypes"
                  item-title="name"
                  item-value="code"
                  placeholder="Pilih Jenis Document"
                  outlined
                  dense
                  required
                  auto-select-first
                  class="input-field"
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>

            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>Nomor Document</VLabel>
                <VTextField
                  v-model="form.doc_number"
                  placeholder="Isi Nomor Document"
                  outlined
                  dense
                  required
                  class="input-field"
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>
            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>Tanggal Document</VLabel>
                <VTextField
                  v-model="form.date"
                  placeholder="Isi Tanggal Document"
                  outlined
                  dense
                  required
                  type="date"
                  class="input-field"
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>

            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>Masa Berlaku</VLabel>
                <VTextField
                  v-model="form.expiration_date"
                  placeholder="Isi Masa Berlaku"
                  outlined
                  dense
                  required
                  type="date"
                  class="input-field"
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>

            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>Instansi Penerbit</VLabel>
                <VTextField
                  v-model="form.publishing_agency"
                  placeholder="Isi Instansi Penerbit"
                  outlined
                  dense
                  required
                  class="input-field"
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>
          </VForm>
          <!-- Jenis Document -->
        </VCardText>

        <div class="d-flex justify-end ga-2">
          <VBtn @click="cancel" variant="outlined"> Batal </VBtn>
          <VBtn @click="confirm" :color="props.confirmColor">
            {{ props.mode === "add" ? "Tambah" : "Simpan" }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import type { VForm } from "vuetify/components";

const props = defineProps({
  mode: { type: String, default: "add" },
  initialData: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["confirmAdd", "confirmEdit", "cancel"]);

const isVisible = ref(false);

const openDialog = async () => {
  documentTypes.value = await getMasterDocsTypes();
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const legalForm = ref<VForm>();

const confirm = () => {
  let whichEmit: any = null;
  if (props.mode === "add") {
    console.log("emitted add = ", form.value);
    whichEmit = "confirmAdd";
  } else {
    whichEmit = "confirmEdit";
  }

  legalForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      emit(whichEmit, form.value);
      closeDialog();
    }
  });
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
  doc_number: "",
  expiration_date: "",
  date: "",
  publishing_agency: "",
  type: "",
});

const documentTypes = ref([]);

watch(
  () => props.initialData,
  (newData) => {
    if (props.mode === "edit" && newData) {
      console.log("edited data", newData);
      form.value = { ...newData };
    }
  },
  { immediate: true }
);

const snackbar = useSnackbar();

async function getMasterDocsTypes() {
  const response = await $api(`master/common-code?type=legaldocs`, {
    method: "get",
  });

  return response;
}
</script>

<style scoped></style>
