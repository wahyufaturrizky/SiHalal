<script setup lang="ts">
const props = defineProps<{
  detail?: any;
}>();

const emit = defineEmits(["submit:update"]);
const isModalOpen = ref(false);

const handleLoadImageDetail = () => {
  // load image detail here for update
};

const form = ref();
const formData = reactive({
  image: props?.detail?.image || null,
  status: props?.detail?.status || false,
});
const uploadedFile = reactive({
  name: props?.detail?.image || null,
  file: props?.detail?.image || null,
});
const formRules = reactive({
  image: [(v: string) => !!v || "Image is required!"],
});
const uploadImageFile = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    // put API for upload image here
    return;
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};
const handleUploadFile = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0];
    uploadedFile.name = fileData.name;
    uploadedFile.file = fileData;
    formData.image = fileData;
    // try {
    //   const response: any = await uploadImageFile(fileData);
    //   if (response.code === 2000) {
    //     formData.image = response.data.file_url;
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
};
const handleRemoveFile = () => {
  uploadedFile.name = null;
  uploadedFile.file = null;
  formData.image = null;
};

const handleSubmitForm = async () => {
  const status = await form.value.validate();

  if (status.valid) {
    emit("submit:update", formData);
    isModalOpen.value = false;
  }
};
</script>

<template>
  <VDialog v-model="isModalOpen" max-width="640px">
    <template #activator="{ props }">
      <VListItem
        v-bind="props"
        class="cursor-pointer"
        @click="handleLoadImageDetail"
      >
        <template #prepend>
          <VIcon icon="mdi-pencil" />
        </template>
        <VListItemTitle>Edit</VListItemTitle>
      </VListItem>
    </template>
    <template #default="{ isActive }">
      <VForm
        ref="form"
        @submit.prevent="formData.image ? handleSubmitForm() : null"
      >
        <VCard class="pa-4">
          <VCardTitle class="d-flex justify-space-between align-center">
            <div class="text-h4 font-weight-bold">Edit Image</div>
            <VIcon @click="isActive.value = false" size="large">
              mdi-close-thick
            </VIcon>
          </VCardTitle>
          <VCardItem>
            <VRow align="center" justify="space-between">
              <VCol cols="5">
                <div class="font-weight-bold">Upload Image</div>
              </VCol>
              <VCol cols="7">
                <VTextField
                  v-if="uploadedFile.file"
                  :model-value="uploadedFile.name"
                  density="compact"
                  placeholder="No file choosen"
                  rounded="xl"
                >
                  <template #append-inner>
                    <VIcon
                      icon="fa-trash"
                      color="error"
                      class="cursor-pointer"
                      @click="handleRemoveFile"
                    />
                  </template>
                </VTextField>
                <VFileInput
                  v-else
                  :model-value="uploadedFile.file"
                  class="custom-file-input"
                  density="compact"
                  rounded="xl"
                  label="No file choosen"
                  prepend-icon=""
                  @change="handleUploadFile"
                  :rules="formRules.image"
                >
                  <template #append-inner>
                    <VBtn rounded="s-0 e-xl" text="Choose File" />
                  </template>
                </VFileInput>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <div class="font-weight-bold">Status</div>
                <VCheckbox
                  v-model="formData.status"
                  :label="formData.status ? 'Active' : 'Inactive'"
                />
              </VCol>
            </VRow>
          </VCardItem>
          <VCardActions class="mt-7 pe-5">
            <VBtn
              variant="outlined"
              class="px-4 me-3"
              @click="isActive.value = false"
              >Cancel</VBtn
            >
            <VBtn
              type="submit"
              :color="formData.image ? 'primary' : '#A09BA1'"
              variant="flat"
              class="px-7"
            >
              Edit
            </VBtn>
          </VCardActions>
        </VCard>
      </VForm>
    </template>
  </VDialog>
</template>

<style lang="scss">
.custom-file-input {
  .v-field--appended {
    padding-inline-end: 0 !important;
  }
}
</style>
