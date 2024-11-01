<script setup lang="ts">
import NoImage from "@images/no-image.png";
import { useDisplay } from "vuetify";
const { isSnackbarVisible, snackColor, snackMessage } = useSnackbar();
const { mdAndUp } = useDisplay();
</script>

<template>
  <VSnackbar v-model="isSnackbarVisible" location="top" :color="snackColor">
    {{ snackMessage }}
  </VSnackbar>
  <VRow no-gutters>
    <VCol
      cols="12"
      md="6"
      class="auth-card-v2 d-flex align-center justify-center bg-white"
    >
      <VCard variant="text" :max-width="500" class="mt-12 mt-sm-0 pa-5 pa-lg-7">
        <VCardText style="width: 500px">
          <slot name="pageTitle"></slot>
        </VCardText>

        <VCardText>
          <slot name="formSlot"></slot>
        </VCardText>
        <VCardText>
          <slot name="sponsorImage"></slot>
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      v-if="mdAndUp"
      cols="12"
      md="6"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VImg :src="NoImage" height="100dvh" cover />
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
