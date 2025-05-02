<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'
import { useI18n } from 'vue-i18n'
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import pages404 from '@images/pages/404.png'

import miscMaskDark from '@images/misc/misc-mask-dark.png'
import miscMaskLight from '@images/misc/misc-mask-light.png'
import miscObj from '@images/pages/misc-404-object.png'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  error: NuxtError
}>()

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)

const isDev = process.dev

const { t } = useI18n()

const errToShow = computed(() => {
  const message = props.error?.message || ''
  const statusCode = props.error?.statusCode
  const statusMessage = props.error?.statusMessage || 'Error'

  // 1. Halaman tidak ditemukan (404)
  const is404 = statusCode === 404 || message.includes('404')
  if (is404) {
    return {
      title: t('error.title-not-found'),
      description: t('error.description-not-found'),
    }
  }

  // 2. Kesalahan dari server (500+)
  const isServerError = statusCode >= 500 && statusCode < 600
  if (isServerError) {
    return {
      title: t('error.title-server-error'),
      description: t('error.description-server-error'),
    }
  }

  // 3. Gagal mounting app di browser
  const isClientMountingError = message.includes('mount') || message.includes('hydration')
  if (isClientMountingError) {
    return {
      title: t('error.title-mounting-error'),
      description: t('error.description-mounting-error'),
    }
  }

  // 4. Kesalahan konfigurasi plugin/hook Nuxt
  const isPluginError = message.includes('plugin') || message.includes('hook') || message.includes('Nuxt error')
  if (isPluginError) {
    return {
      title: t('error.title-plugin-error'),
      description: t('error.description-plugin-error'),
    }
  }

  // 5. Mode development (khusus dev)
  if (isDev) {
    return {
      title: statusMessage,
      description: message,
    }
  }

  // 6. Default fallback
  return {
    title: t('error.title-default-error'),
    description: t('error.description-default-error'),
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout name="blank">
    <div class="misc-wrapper">
      <ErrorHeader
        :status-code="props.error.statusCode"
        :title="errToShow.title"
        :description="errToShow.description"
        class="mb-10"
      />

      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="isDev"
        style="max-inline-size: 80dvw; overflow-x: scroll;"
        v-html="error.stack"
      />
      <!-- eslint-enable -->

      <!-- 👉 Image -->
      <div class="misc-avatar w-100 text-center">
        <VImg
          :src="pages404"
          alt="Coming Soon"
          :height="$vuetify.display.xs ? 400 : 500"
          class="my-sm-5"
        />

        <VBtn
          class="mt-10"
          @click="handleError"
        >
          Back to Home
        </VBtn>

        <VImg
          :src="authThemeMask"
          class="d-none d-md-block footer-coming-soon flip-in-rtl"
          cover
        />

        <VImg
          :src="miscObj"
          class="d-none d-md-block footer-coming-soon-obj"
          :max-width="177"
          height="160"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
