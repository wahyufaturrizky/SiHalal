<script setup lang="ts">
const route = useRoute();

const loadingAll = ref(true);
const sidangFatwaId = (route.params as any).id;

const panelOpen = ref(0); // Menentukan panel yang terbuka
const fileLaporanLPH = ref<any>(null);
const fileKH = ref<any>(null);

const getDownloadForm = async (docName: string) => {
  const result: any = await $api(
    `/self-declare/submission/${sidangFatwaId}/file`,
    {
      method: "get",
      query: {
        document: docName,
      },
    }
  );

  if (result.code === 2000 && result.message !== "Not Found") {
    switch (docName) {
      case "laporan":
        fileLaporanLPH.value = result.data.file;
        return result;
      case "setifikasi-halal":
        fileKH.value = result.data.file;
        return result;
      default:
        break;
    }
  }
};

onMounted(async () => {
  const res = await Promise.all([
    getDownloadForm("setifikasi-halal"),
    getDownloadForm("laporan"),
  ]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});
</script>

<template>
  <VExpansionPanels v-if="!loadingAll" v-model="panelOpen">
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
              @click="downloadDocument(fileKH)"
              :disabled="!fileKH"
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
              @click="downloadDocument(fileLaporanLPH)"
              :disabled="!fileLaporanLPH"
            />
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>

  <VSkeletonLoader
    type="table-heading, list-item-two-line, image, table-tfoot"
    v-else
  />
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
