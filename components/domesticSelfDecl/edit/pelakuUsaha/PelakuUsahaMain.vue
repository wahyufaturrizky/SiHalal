<template>
  <VContainer>
    <div style="max-block-size: 50svh; overflow-y: auto;">
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
                <VCol
                  cols="7"
                  style="display: flex; justify-content: end;"
                >
                  <VBtn
                    density="compact"
                    variant="outlined"
                    append-icon="fa-plus"
                  >
                    Tambah
                  </VBtn>
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
                <VCol
                  cols="7"
                  style="display: flex; justify-content: end;"
                >
                  <VBtn
                    density="compact"
                    variant="outlined"
                    append-icon="fa-plus"
                  >
                    Tambah
                  </VBtn>
                </VCol>
              </VRow>
            </VCardTitle>
            <VCardText><AspekLegalTable /></VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VCard title="Dokumen Persyaratan" />
        </VCol>
      </VRow>
    </div>
  </VContainer>
</template>
