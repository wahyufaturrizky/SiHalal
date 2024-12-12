<template>
  <VItemGroup @click="openDialog">
    <VIcon color="success" icon="fa-history"></VIcon>
    <p color="success">Approve</p>
  </VItemGroup>
  <VDialog v-model="isVisible">
    <template #default>
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Approve Confirmation</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon size="small" icon="fa-times"></VIcon
            ></VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <p>Are you sure you want to approve this document?</p>
        </VCardText>
        <VCardAction>
          <VBtn variant="outlined" color="primary">Cancel</VBtn>
          <VBtn variant="flat" color="success">Approve</VBtn>
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
