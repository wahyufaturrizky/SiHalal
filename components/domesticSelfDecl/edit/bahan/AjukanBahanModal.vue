<template>
  <VDialog max-width="60svw">
    <template #activator="{ props: openModal }">
      <VBtn v-bind="openModal" style="margin: 1svw">Ajukan Bahan</VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center"
              ><h3>Ajukan Bahan</h3></VCol
            >
            <VCol cols="2" style="display: flex; justify-content: end">
              <VCol cols="2" style="display: flex; justify-content: end"
                ><VIcon
                  size="small"
                  icon="fa-times"
                  @click="isActive.value = false"
                ></VIcon
              ></VCol>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Nama Bahan</VLabel>
                <VTextField
                  placeholder="Isi Nama Bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <!-- kelompok appears when tipe bahan = tidak bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Kelompok</VLabel>
                <VSelect
                  placeholder="Pilih Kelompok Bahan"
                  density="compact"
                ></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
        </VCardItem>
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn @click="isActive.value = false" variant="outlined"
              >Batal</VBtn
            >
            <VBtn variant="flat">Ajukan</VBtn>
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
