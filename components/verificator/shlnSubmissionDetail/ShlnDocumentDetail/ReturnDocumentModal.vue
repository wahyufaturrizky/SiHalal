<template>
  <VItemGroup @click="openDialog">
    <VIcon color="primary" icon="fa-history"></VIcon>
    <p color="primary">Return</p>
  </VItemGroup>
  <VDialog v-model="isVisible">
    <template #default>
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Return Confirmation</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon size="small" icon="fa-times"></VIcon
            ></VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <p>Are you sure you want to approve this document?</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol
              ><VTextarea placeholder="Input Return Note (Opsional)"></VTextarea
            ></VCol>
          </VRow>
        </VCardText>
        <VCardAction>
          <VBtn variant="outlined" color="primary">Cancel</VBtn>
          <VBtn variant="flat" color="primary">Yes, Return</VBtn>
        </VCardAction>
      </VCard>
    </template>
  </VDialog>
</template>
<script setup lang="ts">
const isVisible = ref(false);
const openDialog = () => {
  isVisible.value = true;
};
</script>
