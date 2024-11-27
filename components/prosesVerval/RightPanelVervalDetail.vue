<script setup lang="ts">
const unduhan = [
  { id: 1, key: "Surat Permohonan", uri: "/#" },
  { id: 2, key: "Surat Pernyataan", uri: "/#" },
  { id: 3, key: "Ikrar", uri: "/#" },
  { id: 4, key: "STTD", uri: "/#" },
  { id: 5, key: "Cek Laporan", uri: "/#" },
  { id: 6, key: "Cek Hasil Pendampingan", uri: "/#" },
];

const pendaftaran = [
  { id: 1, key: "Nomor Daftar", value: "/#" },
  { id: 2, key: "Tanggal", value: "/#" },
  { id: 3, key: "Tempat Pendaftaran", value: "/#" },
  { id: 4, key: "Jenis Pengajuan", value: "/#" },
  { id: 5, key: "Status", value: "" },
  { id: 6, key: "Channel Pendaftaran", value: "/#" },
  { id: 7, key: "Fasilitator", value: "/#" },
];

const tracking = [
  { id: 1, key: "Draft", value: "fachrudin@panganlestari.com" },
  { id: 2, key: "Submitted", value: "fachrudin@panganlestari.com" },
  { id: 3, key: "Verification", value: "Arini HS" },
  { id: 4, key: "Returned", value: "ARINI HS" },
  { id: 5, key: "Submitted", value: "fachrudin@panganlestari.com" },
];

function onClickDownload(uri: string) {
  console.log("download file");
}

const expanded = [0, 1, 2];
</script>
<template>
  <VRow>
    <VCol cols="12">
      <VExpansionPanels v-model="expanded">
        <VExpansionPanel>
          <VExpansionPanelTitle><h3>Formulir Unduhan</h3></VExpansionPanelTitle>
          <VExpansionPanelText>
            <VRow v-for="item in unduhan" :key="item.id">
              <VCol cols="5">{{ item.key }}</VCol>
              <VCol cols="1">:</VCol>
              <VCol cols="6"
                ><VBtn variant="flat" @click="onClickDownload(item.uri)"
                  ><VIcon icon="fa-download"></VIcon></VBtn
              ></VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VExpansionPanels v-model="expanded">
        <VExpansionPanel>
          <VExpansionPanelTitle><h3>Pendaftaran</h3></VExpansionPanelTitle>
          <VExpansionPanelText>
            <VRow v-for="item in pendaftaran" :key="item.id">
              <VCol cols="5">{{ item.key }}</VCol>
              <VCol cols="1">:</VCol>
              <VCol cols="6">
                <VChip
                  v-if="item.key === 'Status' && item.value === ''"
                  color="success"
                  >{{ item.value }}</VChip
                >
                <p v-if="item.key !== 'Status'">{{ item.value }}</p>
              </VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VExpansionPanels v-model="expanded">
        <VExpansionPanel>
          <VExpansionPanelTitle><h3>Tracking</h3></VExpansionPanelTitle>
          <VExpansionPanelText style="max-height: 50svh; overflow: auto">
            <VTimeline
              side="end"
              align="start"
              density="compact"
              truncate-line="start"
            >
              <VTimelineItem
                dot-color="rgb(var(--v-theme-surface))"
                size="x-small"
                v-for="item in tracking"
                :key="item.id"
              >
                <div>
                  <div class="text-h6">{{ item.key }}</div>
                  <p>{{ item.value }}</p>
                </div>
              </VTimelineItem>
            </VTimeline>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
  </VRow>
</template>
