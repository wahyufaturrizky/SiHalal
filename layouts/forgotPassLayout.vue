<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import NoImage from '@images/no-image.png'

const { isSnackbarVisible, snackColor, snackMessage } = useSnackbar()
const { mdAndUp } = useDisplay()

const maxWidth = computed(() => {
  return mdAndUp ? 700 : '80%'
})
</script>

<template>
  <VSnackbar
    v-model="isSnackbarVisible"
    location="top"
    :color="snackColor"
    :timeout="500"
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
      cols="12"
      md="6"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VImg
        :src="NoImage"
        height="100dvh"
        cover
      />
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
