<script setup lang="ts">
const props = defineProps<{
  dialogVisible: boolean;
  dialogTitle: string;
  dialogUse?: string;
}>();

const emit = defineEmits(["update:dialogVisible"]);

const localDialogVisible = ref(props.dialogVisible);

const uploadType = ref("UPLOAD");
const ingredientType = ref(null);
const ingredientTypeOption = ref([
  { title: "Bahan Bersertifikat", value: "Certified" },
  { title: "Bahan Tidak Bersertifikat", value: "Uncertified" },
]);
const ingredientFieldName = computed(() => {
  return ingredientType.value === "Certified"
    ? "Bahan Bersertifikat"
    : "Bahan Tidak Bersertifikat";
});

const fileName = ref("");
const fileInput = ref();
const triggerFileInput = () => {
  fileInput.value.click();
};
const onFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    return (fileName.value = file.name);
  }
};

const selectedIngredient = ref<any>({
  name: null,
  producer: null,
  certificateNumber: null,
  type: null,
  category: null,
});
const isNotFound = ref(false);
const isPropose = ref(false);

const searchDialogVisible = ref(false);
const handleOpenSearchDialog = () => {
  searchDialogVisible.value = !searchDialogVisible.value;
};

const previewDialog = ref(false);
const openPreviewDialog = () => {
  previewDialog.value = !previewDialog.value;
};

const closeDialog = () => {
  localDialogVisible.value = false;
};

watch(
  () => props.dialogVisible,
  (newVal) => {
    localDialogVisible.value = newVal;
  }
);
watch(localDialogVisible, (newVal) => {
  emit("update:dialogVisible", newVal);
});

const uploadablePreviews = computed(() => {
  let count = 0;
  previewData.value.forEach((item) => {
    if (item.canUpload) count++;
  });
  return count;
});

const previewHeader: any = [
  { title: "No", value: "index" },
  { title: "Nama Bahan", value: "name", nowrap: true },
  {
    title: "No. Sertifikat",
    value: "certificateNumber",
    nowrap: true,
  },
  { title: "Jenis Bahan", value: "type", nowrap: true },
  {
    title: "Status",
    value: "status",
  },
  {
    title: "Action",
    value: "actions",
    align: "center",
  },
];
const previewData = ref([
  {
    name: "Dada Ayam 500 gr",
    certificateNumber: "198364189634",
    type: "Makanan",
    status: "Dapat Diajukan",
    canUpload: true,
  },
  {
    name: "Becefort Sirop",
    certificateNumber: "198364189634",
    type: "Minuman",
    status: "Dapat Diajukan",
    canUpload: true,
  },
  {
    name: "Pineapple",
    certificateNumber: "198364189634",
    type: "Makanan",
    status: "Tidak Dapat Diajukan",
    canUpload: false,
  },
]);

const ingredientHeader: any = [
  { title: "No", value: "index" },
  { title: "Nama Bahan", value: "name", nowrap: true },
  { title: "Produsen", value: "producer", nowrap: true },
  {
    title: "No. Sertifikat",
    value: "certificateNumber",
  },
  {
    title: "Action",
    value: "actions",
    align: "center",
  },
];
const ingredientData = [
  {
    name: "Dada Ayam 500 gr",
    producer: "PT JAPFA",
    certificateNumber: "ID019812873412198273",
    type: "Bahan",
    category: "Bahan Hewani",
  },
  {
    name: "Becefort Sirop",
    producer: "PT Pharos TBK",
    certificateNumber: "ID019812873412198273",
    type: "Bahan",
    category: "Bahan Nabati",
  },
  {
    name: "Pinnaple",
    producer: "PT Sama Indah",
    certificateNumber: "ID019812873412198273",
    type: "Buah-buahan",
    category: "Bahan Nabati",
  },
  {
    name: "Biskuit Marie Regal 100 gr",
    producer: "PT Marie Marie Sinie",
    certificateNumber: "ID019812873412198273",
    type: "Makanan Ringan",
    category: "Makanan Ringan",
  },
];
</script>

<template>
  <VDialog v-model="localDialogVisible" max-width="840px" persistent>
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">
          {{ props.dialogTitle }}
        </div>
        <VIcon @click="closeDialog"> fa-times </VIcon>
      </VCardTitle>
      <VCardText>
        <div class="d-flex justify-center">
          <VSheet
            rounded="pill"
            color="#6526721A"
            class="pa-2 d-flex justify-space-between"
            style="width: max-content"
          >
            <VBtn
              @click="uploadType = 'UPLOAD'"
              :variant="uploadType === 'UPLOAD' ? 'flat' : 'text'"
              rounded="pill"
              size="large"
              class="me-5"
              >Unggah File</VBtn
            >
            <VBtn
              @click="uploadType = 'MANUAL'"
              :variant="uploadType === 'MANUAL' ? 'flat' : 'text'"
              rounded="pill"
              size="large"
              >Tambah Manual</VBtn
            >
          </VSheet>
        </div>
      </VCardText>
      <VExpandTransition mode="in-out">
        <div v-if="uploadType === 'UPLOAD'" key="UPLOAD">
          <VCardText>
            <VItemGroup>
              <VRow align="center">
                <VCol cols="5">Unduh template acuan “unggah bahan”</VCol>
                <VCol cols="7">
                  :
                  <VBtn append-icon="fa-download">Unduh</VBtn>
                </VCol>
              </VRow>
              <br />
            </VItemGroup>
            <VItemGroup>
              <VRow align="center">
                <VCol cols="7">Unggah Bahan</VCol>
                <VCol cols="5">
                  <VTextField
                    v-if="fileName"
                    density="compact"
                    :model-value="fileName"
                    placeholder="No file choosen"
                    rounded="xl"
                    max-width="400"
                  >
                    <template #append-inner>
                      <VIcon
                        icon="fa-trash"
                        color="error"
                        class="cursor-pointer"
                        @click="fileName = ''"
                      />
                    </template>
                  </VTextField>
                  <VTextField
                    v-else
                    class="custom-file-input"
                    density="compact"
                    rounded="xl"
                    placeholder="No file choosen"
                    max-width="400"
                  >
                    <template #append-inner>
                      <VBtn
                        rounded="s-0 e-xl"
                        @click.prevent="triggerFileInput"
                        text="Choose"
                      />
                    </template>
                  </VTextField>
                  <input
                    type="file"
                    ref="fileInput"
                    @change="onFileChange"
                    accept="application/vnd.ms-excel, application/pdf, image/png"
                    style="display: none"
                  />
                </VCol>
              </VRow>
              <br />
            </VItemGroup>
          </VCardText>
          <VCardActions class="px-4">
            <VSpacer />
            <div>
              <VBtn
                variant="outlined"
                class="px-4 me-3"
                @click="closeDialog"
                text="Batal"
              />
              <VBtn
                variant="flat"
                class="px-4"
                color="primary"
                @click="openPreviewDialog"
                text="Unggah"
              />
            </div>
          </VCardActions>
        </div>
        <div v-if="uploadType === 'MANUAL'" key="MANUAL">
          <VCardText>
            <VItemGroup>
              <VLabel>Type Bahan</VLabel>
              <VSelect
                placeholder="Pilih Tipe Bahan"
                density="compact"
                v-model="ingredientType"
                :items="ingredientTypeOption"
                @update:model-value="(v) => (ingredientType = v)"
                clearable
              />
            </VItemGroup>
            <VExpandTransition>
              <VItemGroup v-if="ingredientType && !isPropose">
                <br />
                <VLabel>{{ ingredientFieldName }}</VLabel>
                <VTextField
                  :placeholder="`Cari ${ingredientFieldName}`"
                  density="compact"
                  append-inner-icon="fa-search"
                  @click="[(isNotFound = false), handleOpenSearchDialog()]"
                />
              </VItemGroup>
            </VExpandTransition>
            <div v-if="!isNotFound">
              <VDivider class="my-7" />
              <VItemGroup>
                <VLabel>Jenis Bahan</VLabel>
                <VSelect
                  :model-value="selectedIngredient.type"
                  placeholder="Pilih Jenis Bahan"
                  density="compact"
                />
                <br />
              </VItemGroup>
              <VItemGroup>
                <VLabel>Nama Bahan</VLabel>
                <VTextField
                  :model-value="selectedIngredient.name"
                  placeholder="Nama Bahan otomatis teisi setelah memilih bahan"
                  density="compact"
                  disabled
                />
              </VItemGroup>
              <VExpandTransition>
                <VItemGroup
                  v-if="ingredientType && ingredientType === 'Uncertified'"
                >
                  <br />
                  <VLabel>Kelompok</VLabel>
                  <VTextField
                    :model-value="selectedIngredient.category"
                    placeholder="Kelompok otomatis terisi setelah memilih bahan"
                    density="compact"
                    disabled
                  />
                </VItemGroup>
              </VExpandTransition>
              <VExpandTransition>
                <div v-if="ingredientType && ingredientType === 'Certified'">
                  <VItemGroup>
                    <br />
                    <VLabel>Produsen</VLabel>
                    <VTextField
                      :model-value="selectedIngredient.producer"
                      placeholder="Kelompok otomatis terisi setelah memilih bahan"
                      density="compact"
                      readonly
                    />
                    <br />
                  </VItemGroup>
                  <VItemGroup>
                    <VLabel>Nomor Setifikat Halal</VLabel>
                    <VTextField
                      :model-value="selectedIngredient.certificateNumber"
                      placeholder="Kelompok otomatis terisi setelah memilih bahan"
                      density="compact"
                      readonly
                    />
                  </VItemGroup>
                </div>
              </VExpandTransition>
            </div>
            <VExpandTransition>
              <div v-if="isNotFound && isPropose">
                <br />
                <VCard>
                  <VCardTitle class="text-h5 font-weight-bold my-2">
                    Ajukan Bahan
                  </VCardTitle>
                  <VCardText>
                    <VItemGroup>
                      <VLabel>Nama Bahan</VLabel>
                      <VTextField
                        placeholder="Isi Nama Bahan"
                        density="compact"
                      />
                      <br />
                    </VItemGroup>
                    <VItemGroup>
                      <VLabel>Kelompok Bahan</VLabel>
                      <VSelect
                        placeholder="Pilih Kelompok Bahan"
                        density="compact"
                      />
                    </VItemGroup>
                  </VCardText>
                  <VCardActions class="px-4 pb-6">
                    <VSpacer />
                    <VBtn
                      variant="outlined"
                      class="px-4 me-3"
                      text="Batal"
                      @click="isPropose = false"
                    />
                    <VBtn
                      variant="flat"
                      class="px-4"
                      color="primary"
                      text="Ajukan"
                      @click="closeDialog"
                    />
                  </VCardActions>
                </VCard>
              </div>
            </VExpandTransition>
          </VCardText>
          <VCardActions class="px-5" v-if="isNotFound && !isPropose">
            <VSpacer />
            <div class="d-flex align-center justify-end">
              <div class="me-5">
                Bahan yang dicari tidak ditemukan? Ajukan bahan disini
              </div>
              <VBtn
                text="Ajukan"
                variant="flat"
                color="primary"
                @click="isPropose = true"
              />
            </div>
          </VCardActions>
          <VCardActions class="px-5" v-if="!isNotFound && !isPropose">
            <VSpacer />
            <div>
              <VBtn
                variant="outlined"
                class="px-4 me-3"
                @click="closeDialog"
                text="Batal"
              />
              <VBtn
                variant="flat"
                class="px-4"
                color="primary"
                @click="closeDialog"
                text="Unggah"
              />
            </div>
          </VCardActions>
        </div>
      </VExpandTransition>
    </VCard>
  </VDialog>
  <ShSubmissionDetailFormModal
    dialog-title="Cari Bahan"
    :dialog-visible="previewDialog"
    :hide-button="true"
    @update:dialog-visible="previewDialog = $event"
  >
    <VCardText>
      <VDataTable
        disable-sort
        :headers="previewHeader"
        :items="previewData"
        hide-default-footer
      >
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.status="{ item }">
          <VBtn
            :text="item.status"
            :color="item.canUpload ? '#49A84C' : '#E1442E'"
            variant="tonal"
          />
        </template>
        <template #item.actions="{ item }">
          <VCheckbox v-model="item.canUpload" />
        </template>
      </VDataTable>
    </VCardText>
    <VCardActions>
      <VBtn variant="outlined" class="px-4 me-3" @click="openPreviewDialog"
        >Batal</VBtn
      >
      <VBtn
        variant="flat"
        class="px-4"
        color="primary"
        @click="[openPreviewDialog(), closeDialog()]"
      >
        {{
          uploadablePreviews
            ? `Simpan Verif (${uploadablePreviews})`
            : "Simpan Verif"
        }}
      </VBtn>
    </VCardActions>
  </ShSubmissionDetailFormModal>
  <VDialog v-model="searchDialogVisible" max-width="840px" persistent>
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">Cari Bahan</div>
        <VIcon @click="(searchDialogVisible = false), (isNotFound = true)">
          fa-times
        </VIcon>
      </VCardTitle>
      <VCardText>
        <VDataTable
          disable-sort
          :headers="ingredientHeader"
          :items="ingredientData"
          hide-default-footer
        >
          <template #item.index="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.actions="{ item }">
            <VIcon
              @click="[handleOpenSearchDialog(), (selectedIngredient = item)]"
              icon="mdi-arrow-right-thick"
              color="primary"
              class="cursor-pointer"
            />
          </template>
        </VDataTable>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped></style>
