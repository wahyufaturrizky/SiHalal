<template>
  <VDialog max-width="60svw">
    <template #activator="{ props: openModal }">
      <VBtn
        v-bind="openModal"
        variant="outlined"
        append-icon="fa-plus"
        style="margin-right: 1svw"
        >Tambah</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center"
              ><h3>Tambah Nama Produk</h3></VCol
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
          <VItemGroup>
            <VLabel><b>Klasifikasi Produk</b></VLabel>
            <VSelect
              density="compact"
              placeholder="Pilih Klasifikasi Produk"
            ></VSelect>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel><b>Rincian Produk</b></VLabel>
            <VSelect
              density="compact"
              placeholder="Pilih Rincian Produk"
            ></VSelect>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel><b>Nama Produk</b></VLabel>
            <VTextField
              density="compact"
              placeholder="Isi Nama Produk"
            ></VTextField>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel><b>Merk</b></VLabel>
            <VTextField density="compact" placeholder="Isi Merk"></VTextField>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VRow>
              <VCol cols="6" style="display: flex; align-items: center">
                <b>Upload Produk</b>
              </VCol>
              <VCol cols="6">
                <VFileInput prepend-icon="" density="compact" hide-details>
                  <template #append>
                    <VBtn>Upload</VBtn>
                  </template>
                </VFileInput>
              </VCol>
            </VRow>
          </VItemGroup>
          <br />
        </VCardItem>
        <VCardActions>
          <VBtn variant="outlined" @click="isActive.value = false"> Batal</VBtn>
          <VBtn variant="flat">Tambah</VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
