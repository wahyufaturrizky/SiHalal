<template>
  <VDialog>
    <template #activator="{ props: openModal }">
      <VBtn
        v-bind="openModal"
        density="compact"
        variant="outlined"
        append-icon="fa-undo"
        >Return</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard max-width="50svw">
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Return Confirmation</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end">
              <VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              ></VIcon>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <p><b>Are you sure you want to Return this submission?</b></p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VTextarea
                placeholder="Input Return Notes (Optional)"
              ></VTextarea>
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <VBtn variant="outlined" @click="isActive.value = false">Cancel</VBtn>
          <VBtn variant="elevated">Yes, Return</VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
