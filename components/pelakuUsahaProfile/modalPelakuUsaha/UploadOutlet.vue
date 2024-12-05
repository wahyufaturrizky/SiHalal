<script setup lang="ts">
const fileOutlet = ref();

const store = pelakuUsahaProfile();

const uploadDocument = async () => {
  try {
    const formData = new FormData();
    formData.append("file", fileOutlet.value);
    const response = await $api(
      `/pelaku-usaha-profile/${store.profileData?.id}/upload-outlet`,
      {
        method: "post",
        body: formData,
      }
    );
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};
</script>
<template>
  <VDialog max-width="60svw">
    <template #activator="{ props: openModal }">
      <VBtn v-bind="openModal" color="primary" variant="outlined"
        >Upload ↓</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <h3>Upload Data Outlet</h3>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12"
              ><p>
                Untuk template file upload, bisa unduh melalui link :
                <span style="text-decoration: underline">Download Disini</span>
              </p></VCol
            >
          </VRow>
          <VRow>
            <VCol cols="4">
              <p>Pilih dokumen:</p>
            </VCol>
            <VCol cols="8">
              <VFileInput
                v-model="fileOutlet"
                dense
                label="No File Choosen"
                hide-details
                prepend-icon=""
                style="max-inline-size: 300px"
                class="input-file-izin"
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
              </VFileInput>
            </VCol>
          </VRow>
        </VCardItem>
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn @click="isActive.value = false" variant="outlined"
              >Batal</VBtn
            >
            <VBtn @click="uploadDocument()" variant="flat">Upload</VBtn>
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
