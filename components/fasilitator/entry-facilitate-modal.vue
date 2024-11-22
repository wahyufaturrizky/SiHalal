<template>
  <VDialog max-width="60svh">
    <template #activator="{ props: openModal }">
      <VBtn append-icon="fa-plus" v-bind="openModal">Tambah Pengajuan</VBtn>
    </template>
    <template #default>
      <VCard style="padding: 1.5svw">
        <VCardTitle><h3>Fasilitasi</h3></VCardTitle>
        <VCardItem>
          <VCard variant="outlined" style="margin: 1svw">
            <VCardTitle
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 2svw;
              "
              ><h3>Baru</h3></VCardTitle
            >
            <VCardItem
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
              ><p>
                Klik “Buat Fasilitasi” untuk mengajukan Fasilitasi
              </p></VCardItem
            >
            <VCardActions
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 2svw;
              "
              ><VBtn style="width: 100svw" variant="flat"
                >Buat Fasilitasi</VBtn
              ></VCardActions
            >
          </VCard>
        </VCardItem>
      </VCard>
    </template>
  </VDialog>
</template>
