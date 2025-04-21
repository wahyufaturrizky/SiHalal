<script setup lang="ts">
import { useDisplay } from "vuetify";

const props = defineProps({
  existingFile: { type: Object, default: () => ({}) },
  isEditable: { type: Boolean, default: true },
});

const emit = defineEmits(["confirm"]);

const snackbar = useSnackbar();

const tabs = ref(0);
const selectedTypeBahan = ref("1");

onMounted(() => {
  tabs.value = 0;
});

const isVisible = ref(false);
const openDialog = () => (isVisible.value = true);
const closeDialog = () => {
  isVisible.value = false;
  isAjukanDialog.value = false;
};
const searchBahanQuery = ref(null);
const typingTimer = ref(null);

const isPreviewVisible = ref(false);
const openPreviewDialog = () => (isPreviewVisible.value = true);
const closePreviewDialog = () => (isPreviewVisible.value = false);

const isCariBahanDialog = ref(false);
const openCariBahanDialog = () => (isCariBahanDialog.value = true);
const closeCariBahanDialog = () => (isCariBahanDialog.value = false);

const isAjukanDialog = ref(false);
const openAjukanDialog = () => (isCariBahanDialog.value = true);
const closeAjukanDialog = () => (isCariBahanDialog.value = false);

const uploadedFile = ref(props.existingFile);

const selectedCariBahanTidakBersertifikat = ref({
  selectedJenisBahan: "1",
  namaBahan: null,
  kelompok: null,
});

const selectedCariBahanBersertifikat = ref({
  selectedJenisBahan: "1",
  namaBahan: null,
  producen: null,
  sertificateHalalNumber: null,
});

const bahanTidakBersertifikatHeader = [
  { title: "No", key: "no" },
  { title: "Nama Bahan", key: "namaBahan" },
  { title: "Kelompok", key: "kelompok" },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const bahanTidakBersertifikatItem = ref([]);

const bahanBersertifikatHeader = [
  { title: "No", key: "no" },
  { title: "Nama Bahan", key: "namaBahan" },
  { title: "Produsen", key: "producen" },
  { title: "No. Sertifikat", key: "certificateNumber" },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const bahanBersertifikatItem = ref([]);

const uploadFileHeader = [
  { title: "No", key: "no", nowrap: true },
  { title: "Nama Bahan", key: "name", nowrap: true },
  { title: "No. Sertifikat", key: "certificateNumber", nowrap: true },
  { title: "Jenis Bahan", key: "type", nowrap: true },
  { title: "Status", key: "status", nowrap: true },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const previewData = ref([]);
const selectedItems = ref([]);

// 01. TODO -> UTIL UNTUK PARSING FILE JADI ARRAY OF OBJECT
const parseFileToArray = async () => {
  console.log("FILE NYA : ", uploadedFile);

  // DUMMY
  return [
    {
      no: 1,
      name: "bahan 1",
      certificateNumber: "123123123",
      type: "1",
      status: "halal",
    },
    {
      no: 2,
      name: "bahan 2",
      certificateNumber: "123123123",
      type: "3",
      status: "halal",
    },
  ];
};

const addFile = async () => {
  previewData.value = await parseFileToArray();
  console.log("PREVIEW DATA : {} ", previewData);
  openPreviewDialog();
};

const unggahData = () => {
  emit("confirm", selectedItems);
  closePreviewDialog();
  closeDialog();
  snackbar.sendSnackbar("Berhasil menambahkan data", "success");
};

const confirm = () => {
  emit("confirm", selectedItems);
  snackbar.sendSnackbar("Berhasil menambahkan data", "success");
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});

const typeBahan = [
  { title: "Bahan Tidak Bersertifikat", value: "1" },
  { title: "Bahan Bersertifikat", value: "2" },
];

const jenisBahan = [
  { title: "Bahan", value: "1" },
  { title: "Cleaning Agent", value: "2" },
  { title: "Kemasan", value: "3" },
  { title: "Lain-lain", value: "4" },
];

const kelompokBahan = [
  { title: "Kelompok Bahan 1", value: "1" },
  { title: "Kelompok Bahan 2", value: "2" },
];

const ajukanBahanRef = ref({
  namaBahan: null,
  kelompokBahan: null,
});

// TODO -> INI MASIH DUMMY -> pakai quwery untuk ambil data bahan
const onInput = () => {
  clearTimeout(typingTimer.value);

  bahanTidakBersertifikatItem.value = [];
  bahanBersertifikatItem.value = [];

  if (searchBahanQuery.value === "kosong") {
    return;
  }

  typingTimer.value = setTimeout(() => {
    if (searchBahanQuery.value.trim()) {
      openCariBahanDialog();
    }
  }, 1500);

  if (selectedTypeBahan.value === "1") {
    bahanTidakBersertifikatItem.value = [
      { no: 1, namaBahan: "Bahan 1", kelompok: "Kelompok 1" },
      { no: 2, namaBahan: "Bahan 2", kelompok: "Kelompok 2" },
      { no: 3, namaBahan: "Bahan 3", kelompok: "Kelompok 3" },
    ];
  } else if (selectedTypeBahan.value === "2") {
    bahanBersertifikatItem.value = [
      {
        no: 1,
        namaBahan: "Bahan 1",
        producen: "Producen 1",
        certificateNumber: "123141",
      },
      {
        no: 2,
        namaBahan: "Bahan 2",
        producen: "Kelompok 2",
        certificateNumber: "1231412",
      },
      {
        no: 3,
        namaBahan: "Bahan 3",
        producen: "Kelompok 3",
        certificateNumber: "234124121",
      },
    ];
  }
};

const selectCariBahan = (item) => {
  console.log("ITEM : ", item);
  console.log("SELECTED TYPE BAHAN : ", selectedTypeBahan.value);

  if (selectedTypeBahan.value === "1") {
    selectedCariBahanTidakBersertifikat.value.namaBahan = item.namaBahan;
    selectedCariBahanTidakBersertifikat.value.kelompok = item.kelompok;
  } else if (selectedTypeBahan.value === "2") {
    selectedCariBahanBersertifikat.value.namaBahan = item.namaBahan;
    selectedCariBahanBersertifikat.value.producen = item.producen;
    selectedCariBahanBersertifikat.value.sertificateHalalNumber =
      item.certificateNumber;
    console.log(
      "selectedCariBahanBersertifikat : ",
      selectedCariBahanBersertifikat
    );
  }
  closeCariBahanDialog();
};

const addBahanTidakBersertifikat = () => {
  console.log(
    "SEND BAHAN TIDAK BERSERTIFIKAT TO PARENT : ",
    selectedCariBahanTidakBersertifikat
  );
  emit("confirm", selectedCariBahanTidakBersertifikat);
  closeDialog();
  snackbar.sendSnackbar("Berhasil menambahkan data", "success");
};

const addBahanBersertifikat = () => {
  console.log(
    "SEND BAHAN BERSERTIFIKAT TO PARENT : ",
    selectedCariBahanBersertifikat
  );
  emit("confirm", selectedCariBahanBersertifikat);
  closeDialog();
  snackbar.sendSnackbar("Berhasil menambahkan data", "success");
};

const ajukanBahan = () => {
  if (isAjukanDialog.value === false) {
    isAjukanDialog.value = true;
    return;
  } else {
    console.log("AJUKAN BAHAN : ", ajukanBahanRef);
    emit("confirm", ajukanBahanRef);
    closeDialog();
    snackbar.sendSnackbar("Berhasil menambahkan data", "success");
  }
};
</script>

<template>
  <div class="mb-2" color="primary">
    <VBtn
      variant="outlined"
      append-icon="ri-add-line"
      @click="openDialog"
      v-if="props.isEditable"
    >
      Tambah
    </VBtn>
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span> Tambah Data Bahan</span>
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
              <VRow no-gutters class="mb-4">
                <VCol cols="6" class="d-flex align-center">
                  <span> Unduh template acuan "unggah bahan" </span>
                </VCol>
                <VCol cols="6">
                  <VBtn append-icon="mdi-download"> Unduh </VBtn>
                </VCol>
              </VRow>
              <VRow no-gutters>
                <VCol cols="6" class="d-flex align-center">
                  <span> Unggah Bahan </span>
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
              <VLabel for="typeBahan"> Type Bahan </VLabel>
              <VSelect
                id="typeBahan"
                :items="typeBahan"
                v-model="selectedTypeBahan"
                class="mb-2"
              >
              </VSelect>
              <div v-if="!isAjukanDialog">
                <VLabel for="cariBahan">
                  {{
                    typeBahan.filter((i) => i.value == selectedTypeBahan)[0]
                      .title
                  }}
                </VLabel>
                <VTextField
                  id="cariBahan"
                  v-model="searchBahanQuery"
                  density="compact"
                  :placeholder="
                    'Cari ' +
                    typeBahan.filter((i) => i.value == selectedTypeBahan)[0]
                      .title
                  "
                  append-inner-icon="ri-search-line"
                  style="max-width: 100%"
                  @input="onInput"
                  class="mb-8"
                />
                <VDivider class="mb-8" />
              </div>
              <VCard
                v-if="isAjukanDialog"
                elevation="0"
                class="pa-2 border rounded"
              >
                <p class="text-h6">Ajukan Bahan</p>
                <VLabel class="ajukanNamaBahan"> Nama Bahan </VLabel>
                <VTextField
                  id="ajukanNamaBahan"
                  density="compact"
                  placeholder="Isi nama Bahan "
                  class="mb-4"
                  v-model="ajukanBahanRef.namaBahan"
                />
                <VLabel class="ajukanKelompokBahan"> Kelompok Bahan </VLabel>
                <VSelect
                  id="ajukanKelompokBahan"
                  density="compact"
                  placeholder="Pilih Kelompok Bahan"
                  :items="kelompokBahan"
                  v-model="ajukanBahanRef.kelompokBahan"
                  class="mb-4"
                />
              </VCard>
              <div v-if="selectedTypeBahan === '1'">
                <div v-if="bahanTidakBersertifikatItem.length > 0">
                  <VLabel for="jenisBahan"> Jenis Bahan </VLabel>
                  <VSelect
                    id="jenisBahan"
                    :items="jenisBahan"
                    v-model="
                      selectedCariBahanTidakBersertifikat.selectedJenisBahan
                    "
                    class="mb-2"
                  >
                  </VSelect>
                  <VLabel for="namaBahan"> Nama Bahan </VLabel>
                  <VTextField
                    id="namaBahan"
                    placeholder="Nama Bahan otomatis terisi setelah memilih bahan"
                    v-model="selectedCariBahanTidakBersertifikat.namaBahan"
                    class="mb-2"
                    disabled
                  >
                  </VTextField>

                  <VLabel for="kelompok"> Kelompok </VLabel>
                  <VTextField
                    id="kelompok"
                    placeholder="Kelompok otomatis terisi setelah memilih bahan"
                    v-model="selectedCariBahanTidakBersertifikat.kelompok"
                    class="mb-2"
                    disabled
                  >
                  </VTextField>
                </div>

                <VCardActions class="d-flex justify-end ga-2 mt-4">
                  <VBtn
                    v-if="bahanTidakBersertifikatItem.length > 0"
                    variant="outlined"
                    color="error"
                    min-width="100px"
                    @click="closeDialog"
                  >
                    Batal
                  </VBtn>
                  <span v-if="bahanTidakBersertifikatItem.length == 0">
                    Bahan yang dicari tidak ditemukan ? Ajukan bahan disini
                  </span>
                  <VBtn
                    v-if="bahanTidakBersertifikatItem.length > 0"
                    variant="flat"
                    min-width="120px"
                    @click="addBahanTidakBersertifikat"
                  >
                    Tambah
                  </VBtn>
                  <VBtn
                    v-if="bahanTidakBersertifikatItem.length === 0"
                    variant="flat"
                    min-width="120px"
                    @click="ajukanBahan"
                  >
                    Ajukan
                  </VBtn>
                </VCardActions>
              </div>

              <div v-if="selectedTypeBahan === '2'">
                <div v-if="bahanBersertifikatItem.length > 0">
                  <VLabel for="jenisBahanBersertifikat"> Jenis Bahan </VLabel>
                  <VSelect
                    id="jenisBahanBersertifikat"
                    :items="jenisBahan"
                    v-model="selectedCariBahanBersertifikat.selectedJenisBahan"
                    class="mb-2"
                  >
                  </VSelect>
                  <VLabel for="namaBahanBersertifikat"> Nama Bahan </VLabel>
                  <VTextField
                    id="namaBahanBersertifikat"
                    placeholder="Nama Bahan otomatis terisi setelah memilih bahan"
                    v-model="selectedCariBahanBersertifikat.namaBahan"
                    class="mb-2"
                    disabled
                  >
                  </VTextField>
                  <VLabel for="prducen"> Produsen </VLabel>
                  <VTextField
                    id="prducen"
                    placeholder="Producen otomatis terisi setelah memilih bahan"
                    v-model="selectedCariBahanBersertifikat.producen"
                    class="mb-2"
                    disabled
                  >
                  </VTextField>
                  <VLabel for="certificateHalalNumber">
                    Nomor Sertifikat Halal
                  </VLabel>
                  <VTextField
                    id="certificateHalalNumber"
                    placeholder="Nomor Sertifikat Halal otomatis terisi setelah memilih bahan"
                    v-model="
                      selectedCariBahanBersertifikat.sertificateHalalNumber
                    "
                    class="mb-2"
                    disabled
                  >
                  </VTextField>
                </div>
                <VCardActions class="d-flex justify-end ga-2 mt-4">
                  <VBtn
                    v-if="bahanBersertifikatItem.length > 0"
                    variant="outlined"
                    color="error"
                    min-width="100px"
                    @click="closeDialog"
                  >
                    Batal
                  </VBtn>
                  <span v-if="bahanBersertifikatItem.length == 0">
                    Bahan yang dicari tidak ditemukan ? Ajukan bahan disini
                  </span>

                  <VBtn
                    v-if="bahanBersertifikatItem.length > 0"
                    variant="flat"
                    min-width="120px"
                    @click="addBahanBersertifikat"
                  >
                    Tambah
                  </VBtn>
                  <VBtn
                    v-if="bahanBersertifikatItem.length === 0"
                    variant="flat"
                    min-width="120px"
                    @click="ajukanBahan"
                  >
                    Ajukan
                  </VBtn>
                </VCardActions>
              </div>
            </VTabsWindowItem>
          </VTabsWindow>
        </VCardItem>
      </VCard>
    </VDialog>
    <VDialog v-model="isPreviewVisible" :max-width="dialogMaxWidth + 200">
      <VCard class="pa-2">
        <VCardTitle>
          <span class="text-h3">Preview Bahan</span>
          <VDataTable
            disable-sort
            :items-per-page-options="[10, 25, 50, 100]"
            :headers="uploadFileHeader"
            :items="previewData"
          >
            <template #[`item.action`]="{ item }">
              <VCheckbox
                v-model="selectedItems"
                :value="item.name"
                color="primary"
                hide-details
              />
            </template>
          </VDataTable>
        </VCardTitle>
        <VCardActions class="d-flex justify-end ga-2 mt-4">
          <VBtn
            variant="outlined"
            color="error"
            min-width="100px"
            @click="closePreviewDialog"
          >
            Batal
          </VBtn>
          <VBtn variant="flat" min-width="120px" @click="unggahData">
            Unggah ({{ selectedItems.length }} Bahan)
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="isCariBahanDialog" :max-width="dialogMaxWidth + 200">
      <VCard class="pa-2">
        <VCardTitle>
          <span class="text-h3">Cari Bahan </span>
          <VDataTable
            disable-sort
            :headers="
              selectedTypeBahan == '1'
                ? bahanTidakBersertifikatHeader
                : bahanBersertifikatHeader
            "
            :items="
              selectedTypeBahan == '1'
                ? bahanTidakBersertifikatItem
                : bahanBersertifikatItem
            "
            class="elevation-1"
            fixed-header
          >
            <template #item.action="{ item }">
              <VIcon
                color="success"
                style="cursor: pointer"
                @click="selectCariBahan(item)"
              >
                ri-arrow-right-line
              </VIcon>
            </template>
          </VDataTable>
        </VCardTitle>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss"></style>
