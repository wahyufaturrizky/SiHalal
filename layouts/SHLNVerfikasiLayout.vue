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
      <VCol cols="8">
        <slot name="leftContent" />
      </VCol>
      <VCol cols="4">
        <slot name="rightContent" />
      </VCol>
    </VRow>
  </VContainer>
</template>
