<template>
  <div>
    <!-- <VRow
      ><VCol :cols="12"><KembaliButton></KembaliButton></VCol
    ></VRow> -->
    <VRow
      ><VCol cols="12"><slot name="pageTitle"></slot></VCol
    ></VRow>
    <br />
    <VRow>
      <VCol cols="8"><slot name="leftContent"></slot></VCol>
      <VCol cols="4"><slot name="rightContent"></slot></VCol>
    </VRow>
  </div>
</template>
