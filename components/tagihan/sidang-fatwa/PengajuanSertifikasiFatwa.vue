<script setup lang="ts">
import type { isAny } from '@sindresorhus/is';
import { defineProps, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
  sertifikat: {
    type: Object,
    required: true,
  },
  penanggungjawab: {
    type: Object,
    required: true,
  },
  bahan: {
    type: String,
    required: true,
  },
  produk: {
    type: String,
    required: true,
  },
  cleaning: {
    type: String,
    required: true,
  },
  kemasan: {
    type: String,
    required: true,
  },
})

// Combine props into a single reactive object
const combinedProps = ref({
  sertifikat: props.sertifikat,
  penanggungjawab: props.penanggungjawab,
  bahan: props.bahan,
  produk: props.produk,
  cleaning: props.cleaning,
  kemasan: props.kemasan,
})

const profil = ref([])

function getValueOrDash(value) {
  return value && value.trim() !== '' ? value : '-'
}

watch(
  combinedProps,
  newData => {
    // Example of using `newData` to update a derived reactive variable
    if (newData) {
      profil.value = [
        {
          id: 1,
          key: t('task-force.proses-sidang.detail.section-pengajuan-sertifikasi.nomor'),
          value: getValueOrDash(newData?.sertifikat?.no_daftar),
        },
        {
          id: 2,
          key: t('task-force.proses-sidang.detail.section-pengajuan-sertifikasi.service-type'),
          value: getValueOrDash(newData?.sertifikat?.nama_pu),
        },
        {
          id: 3,
          key: t('task-force.proses-sidang.detail.section-pengajuan-sertifikasi.product-type'),
          value: getValueOrDash(newData?.sertifikat?.alamat_pu),
        },
        {
          id: 4,
          key: t('task-force.proses-sidang.detail.section-pengajuan-sertifikasi.market-brand'),
          value: getValueOrDash(newData?.sertifikat?.kota_pu),
        },
        {
          id: 5,
          key: t('task-force.proses-sidang.detail.section-pengajuan-sertifikasi.market-area'),
          value: getValueOrDash(newData?.sertifikat?.kota_pu),
        },
      ]
    }
  },
  { immediate: true, deep: true },
)

const paneSwitcher = ref([0, 1])
</script>

<template>
  <VExpansionPanels v-model="paneSwitcher">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>
        {{ t('task-force.proses-sidang.detail.section-pengajuan-sertifikasi.title') }}
      </h2></VExpansionPanelTitle>
      <br>
      <VExpansionPanelText>
        <VRow
          v-for="item in profil"
          :key="item.id"
          gutters="0.5svh"
        >
          <VCol
            v-if="item.key !== 'divider'"
            cols="3"
          >
            {{ item.key }}
          </VCol>
          <VCol
            v-if="item.key !== 'divider'"
            cols="1"
          >
            :
          </VCol>
          <VCol
            v-if="item.key !== 'divider'"
            cols="8"
          >
            {{ item.value }}
          </VCol>
          <VCol
            v-else
            cols="12"
          >
            <VDivider />
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style type="text/css">
li {
  list-style-position: outside;
}
</style>
