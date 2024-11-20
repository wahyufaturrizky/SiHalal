<template>
  <VDialog max-width="50svw">
    <template #activator="{ props: openModal }">
      <VBtn
        density="compact"
        style="margin: 0.5svw"
        variant="outlined"
        v-bind="openModal"
        color="#E1442E"
        ><VIcon style="color: #e1442e" icon="fa-trash"></VIcon
      ></VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard style="padding: 1svw">
        <VCardTitle><h3>Hapus Pengajuan</h3></VCardTitle>
        <VCardItem
          ><p>Yakin ingin menghapus pengajuan fasilitasi?</p></VCardItem
        >
        <VCardActions>
          <VBtn
            variant="outlined"
            density="compact"
            @click="isActive.value = false"
          >
            Batal</VBtn
          >
          <VBtn color="#E1442E" variant="flat" density="compact"
            >Ya, Hapus</VBtn
          >
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
