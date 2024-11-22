<template>
  <VContainer>
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
    <br />
    <VRow>
      <VCol
        cols="8"
        style="z-index: 0 !important; max-block-size: 65svh; overflow-y: auto"
      >
        <slot name="leftContent" />
      </VCol>
      <VCol
        cols="4"
        style="z-index: 0 !important; max-block-size: 65svh; overflow-y: auto"
      >
        <slot name="rightContent" />
      </VCol>
    </VRow>
  </VContainer>
</template>
