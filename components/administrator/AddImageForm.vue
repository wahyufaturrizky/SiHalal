<script setup lang="ts">
import imageCompression from "browser-image-compression";

const props = defineProps<{
  dialogVisible: boolean;
  closeHandler: Function;
}>();

const emit = defineEmits(["submit:add"]);

const form = ref();
const inputData = reactive<any>({
  file: null,
  status: false,
});
const uploadedFile = reactive<any>({
  name: null,
  file: null,
});
const formRules = reactive({
  image: [(v: string) => !!v || "Image is required!"],
});

const handleUploadFile = async (event: any) => {
  const fileData = event.target.files[0];
  if (fileData) {
    if (["image/jpeg", "image/png", "image/webp"].includes(fileData.type)) {
      try {
        const compressedBlob = await imageCompression(fileData, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/webp",
        });
        const newName = `${
          compressedBlob.name.split(".")[0]
        }-${Date.now()}.webp`;
        const convertFile = new File([compressedBlob], newName, {
          type: compressedBlob.type,
          lastModified: Date.now(),
        });
        uploadedFile.file = convertFile;
        uploadedFile.name = convertFile.name;
        inputData.file = convertFile;
      } catch (error) {
        useSnackbar().sendSnackbar("Upload Image Failed", "error");
        console.error(error);
      }
    } else {
      useSnackbar().sendSnackbar("Image must be WEBP/PNG/JPEG/JPG", "error");
    }
  }
};
const handleRemoveFile = () => {
  uploadedFile.name = null;
  uploadedFile.file = null;
  inputData.file = null;
};

const handleSubmitForm = async () => {
  const status = await form.value.validate();

  if (status.valid) {
    const formData = new FormData();
    formData.append("file", inputData.file);
    formData.append("status", inputData.status);
    emit("submit:add", formData);
    props.closeHandler();

    setTimeout(() => {
      handleRemoveFile();
      inputData.status = false;
    }, 1000);
  }
};
</script>

<template>
  <VDialog v-model="props.dialogVisible" max-width="640px" persistent>
    <VForm
      ref="form"
      @submit.prevent="inputData.file ? handleSubmitForm() : null"
    >
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h4 font-weight-bold">Add Image</div>
          <VIcon
            @click="[props.closeHandler(), handleRemoveFile()]"
            size="large"
          >
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
                accept="image/*"
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
                v-model="inputData.status"
                :label="inputData.status ? 'Active' : 'Inactive'"
              />
            </VCol>
          </VRow>
        </VCardItem>
        <VCardActions class="mt-7 pe-5">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="() => props.closeHandler()"
            >Cancel</VBtn
          >
          <VBtn
            type="submit"
            :color="inputData.file ? 'primary' : '#A09BA1'"
            variant="flat"
            class="px-7"
          >
            Add
          </VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </VDialog>
</template>

<style lang="scss">
.custom-file-input {
  .v-field--appended {
    padding-inline-end: 0 !important;
  }
}
</style>
