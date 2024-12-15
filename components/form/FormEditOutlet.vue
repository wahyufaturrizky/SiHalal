<script setup lang="ts">
import { useDisplay } from "vuetify";

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
  isEditable: { type: Boolean, default: true },
});

const form = ref(props.initialData);

const emit = defineEmits(["confirm"]);

const isVisible = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const confirm = () => {
  emit("confirm", form.value);
  closeDialog();
};

const cancel = () => {
  closeDialog();
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});
</script>

<template>
  <VBtn
    variant="text"
    prepend-icon="ri-edit-line"
    @click="openDialog"
    block
    :disabled="!props.isEditable"
  >
    Ubah
  </VBtn>
  <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
    <VCard class="pa-2">
      <VCardTitle
        class="text-h5 font-weight-bold d-flex justify-space-between align-center"
      >
        <span>Ubah Data Outlet</span>
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
        <VLabel for="name"> Nama Outlet </VLabel>
        <VTextField
          id="name"
          v-model="form.name"
          placeholder="Isi Nama Outlet"
          outlined
          dense
          required
          class="mb-2"
        />

        <VLabel for="address"> Alamat Outlet </VLabel>
        <VTextField
          id="address"
          v-model="form.address"
          placeholder="Isi Alamat Outlet"
          outlined
          dense
          required
          class="mb-2"
        />

        <VRow no-gutters class="mb-2">
          <VCol cols="5">
            <VLabel for="regency"> Provinsi </VLabel>
            <VTextField
              id="regency"
              v-model="form.province_code"
              placeholder="Isi Provinsi"
              outlined
              dense
              required
            />
          </VCol>
          <VSpacer />
          <VCol cols="5" class="me-2">
            <VLabel for="regency"> Kab/Kota </VLabel>
            <VTextField
              id="regency"
              v-model="form.city_code"
              placeholder="Isi Kabupaten/Kota"
              outlined
              dense
              required
            />
          </VCol>
        </VRow>

        <VRow no-gutters>
          <VCol cols="5" class="me-2">
            <VLabel for="country"> Negara </VLabel>
            <VTextField
              id="country"
              v-model="form.country"
              placeholder="Isi Negara"
              outlined
              dense
              required
            />
          </VCol>
          <VSpacer />
          <VCol cols="5">
            <VLabel for="zipCode"> Kode Pos </VLabel>
            <VTextField
              id="zipCode"
              v-model="form.postal_code"
              placeholder="Isi Kode Pos"
              outlined
              dense
              required
            />
          </VCol>
        </VRow>
      </VCardText>

      <div class="d-flex justify-end ga-2">
        <VBtn @click="cancel" variant="outlined"> Batal </VBtn>
        <VBtn @click="confirm"> Simpan </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<style scoped></style>
