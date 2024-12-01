<script setup lang="ts">
import { useDisplay } from "vuetify";

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const rules = {
  required: (value) => !!value || "Wajib Diisi",
  selectRequired: (v) => v.length > 0 || "Wajib Diisi",
};

const formRef = ref(null);
const isVisible = ref(false);

const formSubmission = ref({
  businessType: "",
  phoneNumber: "",
  email: "",
});

const openDialog = () => {
  if (formRef.value.isValid) {
    console.log("valid ", formSubmission.value);
    isVisible.value = true;
  } else {
    console.log("belum valid ");
  }
};

const closeDialog = () => {
  isVisible.value = false;
};

const snackBar = useSnackbar();

// TODO -> INTEGRATE FORM SUBMIT
const submit = async () => {
  console.log("valid ", formSubmission.value);
  isVisible.value = false;
  snackBar.sendSnackbar("Sucess Save Data", "success");
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="text-h3"> Penanggung Jawab </VCardTitle>
    <VForm
      ref="formRef"
      @submit.prevent="openDialog"
      :model-value="formSubmission"
    >
      <VCardItem>
        <CustomTextField
          id="companyName"
          v-model="formSubmission.businessType"
          label="Jenis Badan Usaha"
          placeholder="Isi Jenis Badan Usaha"
          :rules="[rules.required]"
          class="mb-4"
        />

        <CustomTextField
          id="phoneNumber"
          v-model="formSubmission.phoneNumber"
          label="Nomor Kontak"
          placeholder="Isi Nomor Kontak"
          :rules="[rules.required]"
          class="mb-4"
        />

        <CustomTextField
          id="email"
          v-model="formSubmission.email"
          label="Email"
          placeholder="Isi email"
          :rules="[rules.required]"
          class="mb-4"
        />
      </VCardItem>
      <VCardActions v-if="props.isEditable" class="d-flex justify-end">
        <VBtn variant="flat" min-width="120" @click="openDialog" type="submit">
          Simpan
        </VBtn>
      </VCardActions>
    </VForm>
  </VCard>
  <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
    <VCard class="pa-2">
      <VCardTitle
        class="text-h5 font-weight-bold d-flex justify-space-between align-center"
      >
        <span>Simpan Perubahan</span>
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
      <VCardText>Apakah yakin ingin menyimpan perubahan data ini</VCardText>
      <div class="d-flex justify-end ga-2">
        <VBtn @click="cancel" variant="outlined"> Batal </VBtn>
        <VBtn @click="submit" variant="flat"> Ya, Simpan </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>
