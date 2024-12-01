<template>
  <VDialog max-width="60svw">
    <template #activator="{ props: openModal }">
      <VBtn
        v-bind="openModal"
        variant="outlined"
        append-icon="fa-plus"
        density="compact"
        >Tambah</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center"
              ><h3>Tambah Dokumen</h3></VCol
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
            <VCol cols="12">
              <VItemGroup>
                <VLabel><b>Nama Dokumen</b></VLabel>
                <VSelect placeholder="Isi Nama Dokumen"></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="6"><b>Unggah Dokumen</b></VCol>
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
