<template>
  <VContainer>
    <VRow
      ><VCol :cols="12"><KembaliButton></KembaliButton></VCol
    ></VRow>
    <VRow
      ><VCol cols="12"><slot name="pageTitle"></slot></VCol
    ></VRow>
    <br />
    <VRow>
      <VCol cols="8" style="overflow-y: auto; max-height: 65svh"
        ><slot name="leftContent"></slot
      ></VCol>
      <VCol cols="4" style="overflow-y: auto; max-height: 65svh"
        ><slot name="rightContent"></slot
      ></VCol>
    </VRow>
  </VContainer>
</template>
