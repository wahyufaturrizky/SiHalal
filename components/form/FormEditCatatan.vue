<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useDisplay } from "vuetify";

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
  isEditable: { type: Boolean, default: true },
});

const emit = defineEmits(["confirm"]);

const tabs = ref(0);

onMounted(() => {
  tabs.value = 1;
});

const formTambahCatatanManual = ref(props.initialData);

const isVisible = ref(false);
const openDialog = () => (isVisible.value = true);
const closeDialog = () => (isVisible.value = false);

const uploadedFile = ref(props.existingFile);

const addFile = async () => {
  emit("confirm", uploadedFile);
  closeDialog();
};

const addData = () => {
  emit("confirm", formTambahCatatanManual);
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
    block
    :disabled="!props.isEditable"
    @click="openDialog"
  >
    Ubah
  </VBtn>
  <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
    <VCard class="pa-2">
      <VCardTitle
        class="text-h5 font-weight-bold d-flex justify-space-between align-center"
      >
        <span> Edit Catatan</span>
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
      <VCardItem>
        <div class="d-flex justify-center align-center">
          <VTabs
            v-model="tabs"
            align-tabs="center"
            bg-color="#f0dcf5"
            class="border pa-2"
            style="border-radius: 40px"
            height="auto"
          >
            <VTab
              value="1"
              base-color="#f0dcf5"
              active-color="primary"
              style="border-radius: 40px"
              hide-slider
              color="primary"
              variant="flat"
              height="40px"
            >
              <span>Unggah File </span>
            </VTab>
            <VTab
              value="2"
              active-color="primary"
              base-color="#f0dcf5"
              style="border-radius: 40px"
              hide-slider
              variant="flat"
              height="40px"
            >
              <span> Tambah Manual </span>
            </VTab>
          </VTabs>
        </div>
        <VTabsWindow v-model="tabs">
          <br />
          <VTabsWindowItem value="1">
            <VRow no-gutters>
              <VCol cols="6" class="d-flex align-center">
                <span> Unggah Catatan </span>
              </VCol>
              <VCol cols="6">
                <VFileInput v-model="uploadedFile" label="Pilih File" />
              </VCol>
            </VRow>
            <VCardActions class="d-flex justify-end ga-2 mt-4">
              <VBtn
                variant="outlined"
                color="error"
                min-width="100px"
                @click="closeDialog"
              >
                Batal
              </VBtn>
              <VBtn variant="flat" min-width="120px" @click="addFile">
                Unggah
              </VBtn>
            </VCardActions>
          </VTabsWindowItem>

          <VTabsWindowItem value="2">
            <VLabel for="nama"> Isi Nama </VLabel>
            <VTextField
              id="nama"
              v-model="formTambahCatatanManual.nama"
              density="compact"
              placeholder="Isi Nama "
              class="mb-4"
            />

            <VLabel for="jumlah"> Isi Jumlah </VLabel>
            <VTextField
              id="jumlah"
              v-model="formTambahCatatanManual.jumlah"
              density="compact"
              placeholder="Isi Jumlah "
              class="mb-4"
            />
            <VLabel for="tanggalPembelian"> Isi Tanggal Pembelian </VLabel>
            <VueDatePicker
              id="tanggalPembelian"
              v-model="formTambahCatatanManual.tanggal"
              class="mb-4"
              teleport-center
              :enable-time-picker="false"
              format="dd/MM/yyyy"
            />

            <VCardActions class="d-flex justify-end ga-2 mt-4">
              <VBtn
                variant="outlined"
                color="error"
                min-width="100px"
                @click="closeDialog"
              >
                Batal
              </VBtn>
              <VBtn variant="flat" min-width="120px" @click="addData">
                Ubah
              </VBtn>
            </VCardActions>
          </VTabsWindowItem>
        </VTabsWindow>
      </VCardItem>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss"></style>
