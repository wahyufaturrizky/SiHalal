<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

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
  data: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()

// Combine props into a single reactive object
const combinedProps = ref({
  sertifikat: props.sertifikat,
  penanggungjawab: props.penanggungjawab,
  bahan: props.bahan,
  produk: props.produk,
  cleaning: props.cleaning,
  kemasan: props.kemasan,
  data: props.data,
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
          key: t('task-force.proses-sidang.detail.section-profile.nomor'),
          value: getValueOrDash(newData?.data?.no_daftar),
        },
        {
          id: 2,
          key: t('task-force.proses-sidang.detail.section-profile.created'),
          value: newData?.data?.tgl_daftar ? formatDateIntl(new Date(getValueOrDash(newData?.data?.tgl_daftar))) : getValueOrDash(newData?.data?.tgl_daftar),
        },
        {
          id: 3,
          key: 'divider',
        },
        {
          id: 4,
          key: t('task-force.proses-sidang.detail.section-profile.no_mohon'),
          value: getValueOrDash(newData?.data?.no_mohon),
        },
        {
          id: 5,
          key: t('task-force.proses-sidang.detail.section-profile.tgl_mohon'),
          value: newData?.data?.tgl_mohon ? formatDateIntl(new Date(getValueOrDash(newData?.data?.tgl_mohon))) : getValueOrDash(newData?.data?.tgl_mohon),
        },
        {
          id: 6,
          key: t('task-force.proses-sidang.detail.section-profile.lph'),
          value: getValueOrDash(newData?.data?.lph?.nama_lph),
        },
        {
          id: 7,
          key: t('task-force.proses-sidang.detail.section-profile.channel'),
          value: getValueOrDash(newData?.data?.MChannel?.ref_desc),
        },
        {
          id: 8,
          key: t('task-force.proses-sidang.detail.section-profile.done-lph-date'),
          value: newData?.data?.tgl_selesai_lph ? formatDateIntl(new Date(getValueOrDash(newData?.data?.tgl_selesai_lph))) : getValueOrDash(newData?.data?.tgl_selesai_lph),
        },
        {
          id: 9,
          key: t('task-force.proses-sidang.detail.section-profile.result'),
          value: getValueOrDash(newData?.data?.hasil) == 'PR001' ? 'Lulus' : 'Tidak Lulus',
        },
        {
          id: 10,
          key: t('task-force.proses-sidang.detail.section-profile.service-type'),
          value: getValueOrDash(newData?.data?.MJenisLayanan?.ref_desc),
        },
        {
          id: 11,
          key: t('task-force.proses-sidang.detail.section-profile.product-type'),
          value: getValueOrDash(newData?.data?.MJenisProduk?.ref_desc),
        },
        {
          id: 12,
          key: t('task-force.proses-sidang.detail.section-profile.brand'),
          value: getValueOrDash(newData?.data?.merek_dagang),
        },
        {
          id: 13,
          key: t('task-force.proses-sidang.detail.section-profile.area'),
          value: getValueOrDash(newData?.data?.area_pemasaran),
        },
        {
          id: 14,
          key: 'divider',
        },
        {
          id: 15,
          key: t('task-force.proses-sidang.detail.section-profile.company-name'),
          value: getValueOrDash(newData?.data?.nama_pu),
        },
        {
          id: 16,
          key: t('task-force.proses-sidang.detail.section-profile.company-name-sh'),
          value: getValueOrDash(newData?.data?.nama_pu_sh),
        },
        {
          id: 17,
          key: t('task-force.proses-sidang.detail.section-profile.kbli-name'),
          value: getValueOrDash(newData?.data?.area_pemasaran),
        },
        {
          id: 18,
          key: t('task-force.proses-sidang.detail.section-profile.address'),
          value: getValueOrDash(newData?.data?.alamat_pu),
        },
        {
          id: 19,
          key: t('task-force.proses-sidang.detail.section-profile.city'),
          value: getValueOrDash(newData?.data?.kota_pu),
        },
        {
          id: 20,
          key: t('task-force.proses-sidang.detail.section-profile.province'),
          value: getValueOrDash(newData?.data?.prov_pu),
        },
        {
          id: 21,
          key: t('task-force.proses-sidang.detail.section-profile.postal-code'),
          value: getValueOrDash(newData?.data?.kode_pos_pu),
        },
        {
          id: 22,
          key: t('task-force.proses-sidang.detail.section-profile.nationality'),
          value: getValueOrDash(newData?.data?.negara_pu),
        },
        {
          id: 23,
          key: t('task-force.proses-sidang.detail.section-profile.phone'),
          value: getValueOrDash(newData?.data?.no_telp),
        },
        {
          id: 24,
          key: t('task-force.proses-sidang.detail.section-profile.email'),
          value: getValueOrDash(newData?.data?.email),
        },
        {
          id: 25,
          key: t('task-force.proses-sidang.detail.section-profile.bu-type'),
          value: getValueOrDash(newData?.data?.MJenisUsaha.ref_desc),
        },
        {
          id: 26,
          key: t('task-force.proses-sidang.detail.section-profile.scale'),
          value: getValueOrDash(newData?.data?.MSkalaUsaha.ref_desc),
        },
        {
          id: 27,
          key: t('task-force.proses-sidang.detail.section-profile.base-modal'),
          value: newData?.data?.modal_usaha,
        },
      ]
    }
  },
  { immediate: true, deep: true },
)

const getChipColor = (status: string) => {
  if (status === 'LULUS')
    return 'success'

  return 'primary'
}

const paneSwitcher = ref([0, 1])
</script>

<template>
  <VExpansionPanels v-model="paneSwitcher">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h2>
          {{ t('task-force.proses-sidang.detail.section-profile.title') }}
        </h2>
      </VExpansionPanelTitle>
      <br>
      <VExpansionPanelText>
        <VRow
          v-for="(item, index) in profil"
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
            <div v-if="item.key === t('task-force.proses-sidang.detail.section-profile.result')">
              <VChip
                :key="item.id"
                :color="getChipColor(item.value)"
                label
                class=""
              >
                {{ item.value }}
              </VChip>
            </div>
            <div v-else>
              {{ item.value }}
            </div>
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
