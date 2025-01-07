<script setup lang="ts">
const props = defineProps({
  detaildata: {
    type: Object,
  },
});

const { detaildata } = props || {};
const { dokumen } = detaildata || {};
const { file_kh, file_laporan_lph } = dokumen || {};

const panelOpen = ref(0); // Menentukan panel yang terbuka
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <!-- Header Panel -->
      <VExpansionPanelTitle>
        <h3>Dokumen Unduhan</h3>
      </VExpansionPanelTitle>

      <!-- Konten Panel -->
      <VExpansionPanelText>
        <VRow class="report-info">
          <VCol cols="7">
            <span class="label">File KH</span>
          </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="2" class="download-btn">
            <VBtn
              class="square-btn"
              color="primary"
              variant="flat"
              icon="mdi-download"
              @click="downloadDocument(file_laporan_lph)"
              :disabled="!file_kh"
            />
          </VCol>
        </VRow>

        <VRow class="report-info">
          <VCol cols="7">
            <span class="label">File Laporan LPH</span>
          </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="2" class="download-btn">
            <VBtn
              class="square-btn"
              color="primary"
              variant="flat"
              icon="mdi-download"
              @click="downloadDocument(file_kh)"
              :disabled="!file_laporan_lph"
            />
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped>
.report-info {
  display: flex;
  align-items: center;
  margin-block-start: 16px;
}

.label {
  font-size: 16px;
  font-weight: 500;
}

.download-btn {
  display: flex;
  justify-content: flex-end;
}

h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

/* Tombol berbentuk kotak */
.square-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 8px; /* Membuat ujungnya kotak dengan sudut sedikit melengkung */
  block-size: 40px; /* Tinggi tombol */
  inline-size: 40px; /* Lebar tombol */
}

.square-btn > .mdi {
  font-size: 20px; /* Ukuran ikon */
}

.square-btn:hover {
  background-color: rgba(98, 0, 238, 10%); /* Efek hover */
}
</style>
