<script setup lang="ts">
</script>

<script setup lang="ts">
const panelOpen = ref(0) // Menentukan panel yang terbuka

const downloadReport = () => {
  console.log('Mengunduh laporan...')
}
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <!-- Header Panel -->
      <VExpansionPanelTitle>
        <h3>Hasil Audit</h3>
      </VExpansionPanelTitle>

      <!-- Konten Panel -->
      <VExpansionPanelText>
        <VRow class="report-info">
          <VCol cols="4">
            <span class="label">Laporan</span>
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol
            cols="7"
            class="download-btn"
          >
            <VBtn
              class="square-btn"
              color="primary"
              variant="flat"
              icon="mdi-download"
              @click="downloadReport"
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
