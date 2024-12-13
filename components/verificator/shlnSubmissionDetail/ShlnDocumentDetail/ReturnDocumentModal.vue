<script setup lang="ts">
const isVisible = ref(false);
const openDialog = () => {
  isVisible.value = true;
};
</script>

<template>
  <VItemGroup class="cursor-pointer" @click="openDialog">
    <div class="d-flex gap-1">
      <VIcon color="primary" icon="fa-history"></VIcon>
      <p class="text-primary">Return</p>
    </div>
  </VItemGroup>
  <VDialog v-model="isVisible">
    <template #default>
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Return Confirmation</h3></VCol>
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
        <VCardActions>
          <VBtn variant="outlined">Cancel</VBtn>
          <VBtn variant="elevated" color="#49A84C">Yes, Return</VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
