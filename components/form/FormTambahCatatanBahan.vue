<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useDisplay } from "vuetify";

const props = defineProps({
  initialData: { type: Object, default: null },
  isEditable: { type: Boolean, default: true },
});

const emit = defineEmits(["confirm", "upload"]);

const snackbar = useSnackbar();

const tabs = ref(0);
const file = ref(null);

onMounted(() => {
  tabs.value = 0;
});

const isVisible = ref(false);
const openDialog = () => (isVisible.value = true);
const closeDialog = () => (isVisible.value = false);

const catatan = ref({
  name: null,
  type: null,
  total: null,
  inDate: null,
  outDate: null,
  file: null,
});

const reset = () => {
  catatan.value = {
    name: null,
    type: null,
    total: null,
    inDate: null,
    outDate: null,
    file: null,
  };
};

const unggahData = () => {
  console.log("FILE CATATAN {}", file.value);
  emit("upload", file.value);
  closeDialog();
  file.value = null;
  snackbar.sendSnackbar("Berhasil menambahkan data", "success");
};

const confirm = () => {
  console.log("MANUAL CATATAN ", catatan.value);
  emit("confirm", catatan.value);
  reset();
  closeDialog();
  snackbar.sendSnackbar("Berhasil menambahkan data", "success");
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});
</script>

<template>
  <div class="mb-2" color="primary">
    <VBtn
      v-if="props.isEditable"
      variant="outlined"
      append-icon="ri-add-line"
      @click="openDialog"
    >
      Tambah
    </VBtn>
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span> Tambah Catatan Bahan</span>
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
                <span>Unggah Foto </span>
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
                  <span> Unggah Bahan </span>
                </VCol>
                <VCol cols="6">
                  <HalalFileInput v-model="file" label="Pilih File" />
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
                <VBtn variant="flat" min-width="120px" @click="unggahData">
                  Unggah
                </VBtn>
              </VCardActions>
            </VTabsWindowItem>

            <VTabsWindowItem value="2">
              <VLabel for="namaBahan"> Nama Bahan </VLabel>
              <VTextField
                id="namaBahan"
                v-model="catatan.name"
                placeholder="Isi Nama Bahan"
                class="mb-2"
              />
              <VLabel for="total"> Jumlah </VLabel>
              <VTextField
                id="total"
                v-model="catatan.total"
                placeholder="Isi Jumlah"
                class="mb-2"
              />
              <VRow>
                <VCol cols="6">
                  <VLabel for="inDate"> Tanggal Masuk </VLabel>
                  <VueDatePicker
                    id="inDate"
                    v-model="catatan.inDate"
                    class="mb-4"
                    teleport-center
                    :enable-time-picker="false"
                    format="dd/MM/yyyy"
                  />
                </VCol>
                <VCol cols="6">
                  <VLabel for="outDate"> Tanggal Keluar </VLabel>
                  <VueDatePicker
                    id="outDate"
                    v-model="catatan.outDate"
                    class="mb-4"
                    teleport-center
                    :enable-time-picker="false"
                    format="dd/MM/yyyy"
                  />
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
                <VBtn variant="flat" min-width="120px" @click="confirm">
                  Tambah
                </VBtn>
              </VCardActions>
            </VTabsWindowItem>
          </VTabsWindow>
        </VCardItem>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss"></style>
