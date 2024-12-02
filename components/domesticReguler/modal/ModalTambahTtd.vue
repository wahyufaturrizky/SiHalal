<script setup lang="ts">
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const uploadFile = (event: Event, index: string | number) => {
  const fileUpload = event.target.files[0];
  if (fileUpload) {
    documentList.value[0].fileName = fileUpload.name;
    documentList.value[0].file = fileUpload;
  }
};

const filePenanggungJawab = ref<File | null>(null);
const filePenyelia = ref<File | null>(null);
const documentList = ref([
  { nama: "Izin Edar", fileName: "Surat Izin Usaha.pdf", file: null },
  { nama: "Izin Masuk", fileName: "", file: null },
]);
</script>
<template>
  <VDialog max-width="60svw">
    <template #activator="{ props: openModal }">
      <VBtn
        v-bind="openModal"
        variant="outlined"
        append-icon="fa-plus"
        density="compact"
        v-if="props.isEditable"
        >Tambah</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center"
              ><h3>Tambah Tanda Tangan</h3></VCol
            >
            <VCol cols="2" style="display: flex; justify-content: end">
              <VCol cols="2" style="display: flex; justify-content: end"
                ><VIcon
                  size="small"
                  icon="fa-times"
                  @click="isActive.value = false"
                ></VIcon
              ></VCol>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="6"><b>Upload Tanda Tangan Penanggung Jawab</b></VCol>
            <VCol cols="6" style="display: flex; justify-content: end"
              ><VFileInput
                v-model="filePenanggungJawab"
                dense
                label="No File Choosen"
                hide-details
                prepend-icon=""
                style="max-inline-size: 300px"
                class="input-file-izin"
                @change="uploadFile"
                density="compact"
              >
                <!-- Button upload input -->
                <template #append-inner>
                  <VBtn
                    color="primary"
                    variant="flat"
                    class="choose-file"
                    style="
                      block-size: 100%;
                      inline-size: 150px;
                      clip-path: polygon(10% 0, 100% 0, 100% 100%, 10% 100%);
                    "
                  >
                    Choose File
                  </VBtn>
                </template>
              </VFileInput></VCol
            >
          </VRow>
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel><b>Nama Penyelia Halal</b></VLabel>
                <VSelect placeholder="Pilih Nama Penyelia Halal"></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="6"><b>Unggah Tanda Tangan Penyelia Halal</b></VCol>
            <VCol cols="6" style="display: flex; justify-content: end"
              ><VFileInput
                v-model="filePenyelia"
                dense
                label="No File Choosen"
                hide-details
                prepend-icon=""
                style="max-inline-size: 300px"
                class="input-file-izin"
                @change="uploadFile"
                density="compact"
              >
                <!-- Button upload input -->
                <template #append-inner>
                  <VBtn
                    color="primary"
                    variant="flat"
                    class="choose-file"
                    style="
                      block-size: 100%;
                      inline-size: 150px;
                      clip-path: polygon(10% 0, 100% 0, 100% 100%, 10% 100%);
                    "
                  >
                    Choose File
                  </VBtn>
                </template>
              </VFileInput></VCol
            >
          </VRow>
        </VCardItem>
        <br />
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn @click="isActive.value = false" variant="outlined"
              >Batal</VBtn
            >
            <VBtn variant="flat">Tambah</VBtn>
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
<style>
.v-field--appended {
  padding-inline-end: 0;
}
</style>
