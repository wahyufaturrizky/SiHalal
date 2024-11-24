<template>
  <VContainer>
    <div style="max-block-size: 50svh; overflow-y: auto">
      <VRow>
        <VCol :cols="12">
          <VCard title="Data Pelaku Usaha">
            <VCardText>
              <DataPelakuUsaha />
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VCard title="Penanggung Jawab">
            <VCardText><PenanggungJawab /></VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="5">
                  <p>Aspek Legal</p>
                </VCol>
                <VCol cols="7" style="display: flex; justify-content: end">
                  <TambahAspekLegalByTable></TambahAspekLegalByTable>
                </VCol>
              </VRow>
            </VCardTitle>
            <VCardText><AspekLegalTable /></VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="5">
                  <p>Penyelia Halal</p>
                </VCol>
                <VCol cols="7" style="display: flex; justify-content: end">
                  <TambahPenyeliaByTable></TambahPenyeliaByTable>
                </VCol>
              </VRow>
            </VCardTitle>
            <VCardText><AspekLegalTable /></VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VCard>
            <VCardTitle><h3>Dokumen Persyaratan</h3></VCardTitle>
            <VCardItem>
              <VRow>
                <VCol cols="1">1.</VCol>
                <VCol cols="7"
                  ><b
                    >Izin Edar (PIRT/MD/ML/ULOT/UKOT) atau Izin Industri lainnya
                    atas produk yang dihasilkan dari dinas/ instansi terkait.</b
                  ></VCol
                >
                <VCol cols="4">
                  <VFileInput prepend-icon="" density="compact" hide-details>
                    <template #append>
                      <VBtn>Upload</VBtn>
                    </template>
                  </VFileInput>
                </VCol>
              </VRow>
            </VCardItem>
          </VCard>
        </VCol>
      </VRow>
    </div>
  </VContainer>
</template>
