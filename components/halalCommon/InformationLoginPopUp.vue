<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const props = defineProps<{
  data: any[];
}>();

const dialog = ref(true)

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 1100 : '90%'
})
</script>

<template>
  <VDialog
    v-model="dialog"
    :max-width="dialogMaxWidth"
  >
    <VCard class="pa-8">
      <VBtn
        icon
        class="ml-auto close-btn"
        style="position: absolute; top: 16px; right: 16px; z-index: 10;"
        @click="closeDialog"
      >
        <VIcon>mdi-close</VIcon>
      </VBtn>

      <VCardTitle>
        <div class="auth-logo app-logo d-flex justify-center align-center">
          <VNodeRenderer :nodes="themeConfig.app.logo" />
        </div>
      </VCardTitle>
      <VCardText class="">
        <div
          v-for="(item, index) in props.data"
          :key="index"
        >
          <div v-html="item.announcement.replace(/<ul>/g, `<ul class='ml-10' style='margin-top: -12px;'>`).replace(/<ol>/g, `<ol class='ml-10' style='margin-top: -12px;'>`)" />
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style>
.ql-align-center {
    text-align: center !important;
}
.ql-align-right {
    text-align: right !important;
}
</style>
