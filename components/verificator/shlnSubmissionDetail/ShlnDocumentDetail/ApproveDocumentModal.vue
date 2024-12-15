<script setup lang="ts">
const isVisible = ref(false);
const openDialog = () => {
  isVisible.value = true;
};
</script>

<template>
  <VItemGroup class="cursor-pointer" @click="openDialog">
    <div class="d-flex gap-1">
      <VIcon color="success" icon="fa-check"></VIcon>
      <p class="text-success">Approve</p>
    </div>
  </VItemGroup>
  <VDialog v-model="isVisible">
    <template #default>
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Approve Confirmation</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon
                class="cursor-pointer"
                @click="isVisible = false"
                size="small"
                icon="fa-times"
              ></VIcon
            ></VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <p>Are you sure you want to approve this document?</p>
        </VCardText>
        <VCardActions>
          <VBtn variant="outlined">Cancel</VBtn>
          <VBtn variant="elevated" color="#49A84C">Approve</VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
