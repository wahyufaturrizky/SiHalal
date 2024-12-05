<template>
  <VRow>
    <VCol :cols="12">
      <KembaliButton />
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <slot name="pageTitle" />
    </VCol>
  </VRow>
  <br>
  <VRow>
    <VCol cols="12">
      <slot name="centerContent" />
    </VCol>
  </VRow>
</template>
