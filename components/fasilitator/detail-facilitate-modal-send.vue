<template>
  <VDialog max-width="50svw">
    <template #activator="{ props: openModal }">
      <VBtn
        density="compact"
        style="margin: 0.5svw"
        variant="flat"
        append-icon="fa-paper-plane"
        v-bind="openModal"
        >Kirim</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle><h3>Kirim Pengajuan</h3></VCardTitle>
        <VCardItem><p>Yakin ingin mengirim pengajuan fasilitasi?</p></VCardItem>
        <VCardActions>
          <VBtn
            variant="outlined"
            density="compact"
            @click="isActive.value = false"
          >
            Batal</VBtn
          >
          <VBtn variant="flat" density="compact">Kirim</VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
