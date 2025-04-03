<script setup lang="ts">
const router = useRouter();
const { t } = useI18n()
</script>

<template>
  <div>
    <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
      <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
      <div class="text-primary">{{t('common.back')}}</div>
    </div>
    <VRow>
      <VCol cols="12">
        <slot name="page-title" />
      </VCol>
    </VRow>
    <br />
    <VRow>
      <VCol cols="8" class="content-col">
        <slot name="left-content" />
      </VCol>
      <VCol cols="4" class="content-col">
        <slot name="right-content" />
      </VCol>
    </VRow>
  </div>
</template>

<style scoped lang="scss">
.content-col {
  overflow-y: auto;
  z-index: 0 !important;
}
</style>
