<script setup lang="ts">
import NoImage from "@images/no-image.png";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const { isSnackbarVisible, snackColor, snackMessage } = useSnackbar();
const { mdAndUp } = useDisplay();

const maxWidth = computed(() => {
  return mdAndUp ? 700 : "80%";
});

const fileType = ref("IMG");
const videOrientation = ref("PORTRAIT");
const currentDisplayFile = ref("");
const handleLoadImageAuth = async () => {
  try {
    const response: any = await $api("/admin/images/random-image", {
      method: "get",
    } as any);

    if (response.code === 2000) {
      // if (response.data?.type) fileType.value = response.data?.type
      const fileExt = response.data.file_name.split(".").pop();
      fileType.value = !["webp"].includes(fileExt) ? "VID" : "IMG";
      if (fileType.value === "VID") {
        const orientationStr = response.data.file_name.split("-").pop();
        videOrientation.value = orientationStr.split(".")[0];
      }

      handleLoadImageFile(response.data.file_name);
    } else {
      currentDisplayFile.value = NoImage;
    }
  } catch (error) {
    currentDisplayFile.value = NoImage;
    console.error(error);
  }
};
const handleLoadImageFile = async (filename: string) => {
  try {
    const response: any = await $api("/admin/images/download", {
      method: "post",
      query: {
        filename,
      },
    } as any);
    currentDisplayFile.value = response.url;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(() => {
  handleLoadImageAuth();
});
</script>

<template>
  <VSnackbar
    v-model="isSnackbarVisible"
    location="top"
    :color="snackColor"
    :timeout="5000"
  >
    <v-icon left>fa-circle-info</v-icon> {{ snackMessage }}
  </VSnackbar>
  <VRow
    no-gutters
    class="position-relative"
    style="min-height: calc(100vh - 48px)"
  >
    <VCol
      cols="12"
      md="6"
      class="auth-card-v2 d-flex align-center justify-center bg-white"
    >
      <VCard
        variant="text"
        :max-width="maxWidth"
        class="mt-12 mt-sm-0 pa-5 pa-lg-7"
      >
        <VCardText>
          <slot name="pageTitle" />
        </VCardText>

        <VCardText>
          <slot name="formSlot" />
        </VCardText>
        <VCardText>
          <slot name="sponsorImage" />
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      v-if="mdAndUp"
      md="6"
      class="py-1 pe-2 bg-white position-sticky"
      style="max-height: calc(100vh - 48px)"
    >
      <div
        v-if="fileType === 'IMG'"
        class="h-100 d-flex align-center justify-start"
      >
        <img
          :src="currentDisplayFile"
          height="100%"
          style="border-radius: 20px"
        />
      </div>
      <div v-else class="h-100">
        <div
          v-if="videOrientation === 'POTRAIT'"
          class="h-100 d-flex align-center justify-start"
        >
          <video
            v-if="currentDisplayFile"
            height="100%"
            autoplay
            muted
            loop
            style="border-radius: 20px"
          >
            <source :src="currentDisplayFile" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div v-else class="h-100 d-flex align-center justify-center">
          <video
            v-if="currentDisplayFile"
            width="100%"
            autoplay
            muted
            loop
            style="border-radius: 20px"
          >
            <source :src="currentDisplayFile" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
.auth-logo {
  div {
    svg {
      height: 60px;
      width: 33px;
    }
  }
}
.bg-white {
  background-color: white;
}
</style>
