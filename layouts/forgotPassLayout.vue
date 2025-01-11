<script setup lang="ts">
import NoImage from "@images/no-image.png";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const { isSnackbarVisible, snackColor, snackMessage } = useSnackbar();
const { mdAndUp } = useDisplay();

const maxWidth = computed(() => {
  return mdAndUp ? 700 : "80%";
});

const currentImage = ref("");
const handleLoadImageAuth = async () => {
  try {
    const response: any = await $api("/admin/images/random-image", {
      method: "get",
    } as any);

    if (response.code === 2000) {
      handleLoadImageFile(response.data.file_name);
    } else {
      currentImage.value = NoImage;
    }
  } catch (error) {
    currentImage.value = NoImage;
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
    currentImage.value = response.url;
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
  <VRow no-gutters>
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
      class="d-flex align-start justify-center pb-3 pt-2 pe-2 bg-white"
    >
      <img :src="currentImage" width="100%" style="border-radius: 20px" />
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
