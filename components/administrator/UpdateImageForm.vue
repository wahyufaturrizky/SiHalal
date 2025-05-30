<script setup lang="ts">
import imageCompression from "browser-image-compression";

const props = defineProps<{
  imageId?: string;
}>();

const emit = defineEmits(["submit:update"]);
const isModalOpen = ref(false);

const handleLoadImageDetail = async () => {
  try {
    const response: any = await $api("/admin/images/detail", {
      method: "get",
      query: {
        image_id: props.imageId,
      },
    } as any);

    if (response.code === 2000) {
      Object.assign(inputData, response.data);
      uploadedFile.name = response.data.file_name;
    }
  } catch (error) {
    console.error(error);
  }
};

const form = ref();
const inputData = reactive<any>({
  file: null,
  file_name: null,
  status: false,
  type: "",
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
  if (!fileData) return;

  const fileType = fileData.type.split("/")[0];
  inputData.type = fileType === "video" ? "VID" : "IMG";
  if (fileType === "image") {
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"].includes(
      fileData.type
    );
    if (validImageTypes) {
      useSnackbar().sendSnackbar("Image must be WEBP/PNG/JPEG/JPG", "error");
    }

    try {
      const compressedBlob = await imageCompression(fileData, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/webp",
      });
      const newName = `${compressedBlob.name.split(".")[0]}-${Date.now()}.webp`;
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
  } else if (fileType === "video") {
    const validVideoTypes = ["video/mp4"].includes(fileData.type);
    if (!validVideoTypes) {
      useSnackbar().sendSnackbar("Video must be MP4", "error");
    }

    try {
      const videoDisplay = await getVideoOrientation(fileData);
      const newName = `${
        fileData.name.split(".")[0]
      }-${Date.now()}-${videoDisplay}.mp4`;
      const renameFile = new File([fileData], newName, {
        type: "video/mp4",
        lastModified: Date.now(),
      });
      inputData.file = renameFile;
      uploadedFile.file = renameFile;
      uploadedFile.name = newName;
    } catch (error) {
      useSnackbar().sendSnackbar("Upload Video Failed", "error");
      console.error(error);
    }
  } else {
    useSnackbar().sendSnackbar("File must be Image/Video", "error");
  }
};
const getVideoOrientation = async (file: any) => {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement("video");
    const videoReader = new FileReader();

    videoReader.readAsDataURL(file);
    videoReader.onload = (e: any) => {
      if (!e.target?.result) {
        return reject(new Error("Failed to load the file."));
      }
      videoElement.src = e.target?.result;
    };
    videoReader.onerror = () => reject(new Error("Failed to read the file."));

    videoElement.onloadedmetadata = () => {
      const width = videoElement.videoWidth;
      const height = videoElement.videoHeight;
      const result = width > height ? "LANDSCAPE" : "POTRAIT";
      resolve(result);
    };

    videoElement.onerror = () =>
      reject(new Error("Failed to load video metadata."));
  });
};
const handleRemoveFile = () => {
  uploadedFile.name = null;
  uploadedFile.file = null;
  inputData.file = null;
  inputData.file_name = null;
};

const handleSubmitForm = async () => {
  const status = await form.value.validate();

  if (status.valid) {
    const formData = new FormData();
    if (inputData.file) formData.append("file", inputData.file);
    formData.append("status", inputData.status);
    formData.append("type", inputData.type);
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
        @submit.prevent="
          inputData.file || inputData.file_name ? handleSubmitForm() : null
        "
      >
        <VCard class="pa-4">
          <VCardTitle class="d-flex justify-space-between align-center">
            <div class="text-h4 font-weight-bold">Edit Image/Video</div>
            <VIcon
              @click="[(isActive.value = false), handleRemoveFile()]"
              size="large"
            >
              mdi-close-thick
            </VIcon>
          </VCardTitle>
          <VCardItem>
            <VRow align="center" justify="space-between">
              <VCol cols="5">
                <div class="font-weight-bold">Upload Image/Video</div>
              </VCol>
              <VCol cols="7">
                <VTextField
                  v-if="uploadedFile.file || uploadedFile.name"
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
              @click="isActive.value = false"
              >Cancel</VBtn
            >
            <VBtn
              type="submit"
              :color="
                inputData.file || inputData.file_name ? 'primary' : '#A09BA1'
              "
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
