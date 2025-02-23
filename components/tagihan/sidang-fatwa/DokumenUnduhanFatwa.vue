<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
  detaildata: {
    type: Object,
  },
  fileUnduh: {
    type: Object,
  },
});

const panelOpen = ref(0);
const { fileUnduh } = props || {};

const download = async (item) => {
  await downloadDocument(item);
};
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <!-- Header Panel -->
      <VExpansionPanelTitle>
        <h3>
          {{ t('task-force.proses-sidang.detail.section-dokumen-unduh.title') }}
        </h3>
      </VExpansionPanelTitle>

      <!-- Konten Panel -->
      <VExpansionPanelText>
        <VRow class="report-info">
          <VCol cols="7">
            <span class="label"> {{ t('task-force.proses-sidang.detail.section-dokumen-unduh.kh') }}</span>
          </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="2" class="download-btn">
            <VBtn
              :disabled="!fileUnduh.sttd"
              class="square-btn"
              color="primary"
              variant="flat"
              icon="mdi-download"
              @click="download(fileUnduh.sttd, 'FILES')"
            />
          </VCol>
          <VCol cols="7">
            <span class="label"> {{ t('task-force.proses-sidang.detail.section-dokumen-unduh.lph') }}</span>
          </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="2" class="download-btn">
            <VBtn
              :disabled="!fileUnduh.lph"
              class="square-btn"
              color="primary"
              variant="flat"
              icon="mdi-download"
              @click="download(fileUnduh.sttd, 'FILES')"
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
