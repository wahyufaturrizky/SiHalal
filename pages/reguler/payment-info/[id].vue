<script setup lang="ts">
import LPHDetailLayout from '@/layouts/LPHDetailLayout.vue'

const route = useRoute()
const id = route?.params?.id

const loading = ref(false)
const isSendModalOpen = ref(false)
const dataPengajuan = ref<any>({})
const dataProduk = ref<any>([])
const dataPemeriksaanProduk = ref<any>({})

const openedLeftPanels = ref([0, 1, 2, 3, 4, 5]);
const openedRightPanels = ref([0, 1, 2]);

const checkingCostHeader: any[] = [
  { title: 'No', key: 'index' },
  { title: 'Keterangan Biaya', key: 'keterangan', nowrap: true },
  { title: 'Jumlah', key: 'qty' },
  { title: 'Harga', key: 'harga', nowrap: true },
  { title: 'Sub Total', key: 'total', nowrap: true },
]

const getDetailData = async (type: string) => {
  try {
    const response: any = await $api('/reguler/lph/detail-payment', {
      method: 'get',
      params: { url: `${LIST_INFORMASI_PEMBAYARAN}/${id}/${type}` },
    })

    if (response?.code === 2000)
      return response?.data
    else
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const handleOpenSendModal = () => {
  isSendModalOpen.value = false
}

const handleUpdateStatus = async () => {
  try {
    const response: any = await $api('/reguler/update-status-payment', {
      method: 'put',
      body: {
        id_reg: id,
        keterangan: 'update',
      },
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses kirim ke LPH', 'success')
      return response?.data
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

onMounted(async () => {
  loading.value = true

  const responseData = await Promise.allSettled([
    getDetailData('pengajuan'),
    getDetailData('produk'),
    getDetailData('pemeriksaanproduk'),
  ])

  dataPengajuan.value = responseData?.[0]?.value || {}
  dataProduk.value = responseData?.[1]?.value || []
  dataPemeriksaanProduk.value = responseData?.[2]?.value || {}
  loading.value = false
})
</script>

<template>
  <div v-if="!loading">
    <LPHDetailLayout>
      <template #page-title>
        <VRow no-gutters>
          <VCol>
            <h1>Informasi Pembayaran Detail</h1>
          </VCol>
          <VCol class="d-flex justify-end">
            <VBtn text="Proses di LPH" append-icon="fa-paper-plane" @click="() => isSendModalOpen = true" />
          </VCol>
        </VRow>
      </template>
      <template #left-content>
        <VExpansionPanels
          v-model="openedLeftPanels"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
          multiple
        >
          <VExpansionPanel :value="0" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Daftar Pengajuan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelDaftarPengajuan
                type="READ"
                :data-pengajuan="dataPengajuan"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="1" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Pengajuan Sertifikasi
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelPengajuanSertifikasi :data-pengajuan="dataPengajuan" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="2" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Biaya Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <VDataTable
                :headers="checkingCostHeader"
                :items="dataPemeriksaanProduk?.biaya"
                hide-default-footer
              >
                <template #body>
                  <tr
                    v-for="(item, idx) in dataPemeriksaanProduk?.biaya"
                    :key="idx"
                  >
                    <td>{{ idx + 1 }}</td>
                    <td>{{ item.keterangan }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.harga }}</td>
                    <td class="d-flex justify-center align-center" width="150px">
                      {{ item.total }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" />
                    <td colspan="1" class="font-weight-bold">
                      Total
                    </td>
                    <td
                      colspan="1"
                      class="d-flex justify-center align-center font-weight-bold"
                      width="150px"
                    >
                      {{ dataPemeriksaanProduk?.total_biaya }}
                    </td>
                  </tr>
                </template>
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="3" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Jadwal Audit
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelJadwalAudit :data="dataPemeriksaanProduk?.jadwal_audit" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="4" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Auditor
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelAuditorTable :data="dataPemeriksaanProduk?.auditor" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="5" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Hasil Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelHasilPemeriksaan :data="dataPemeriksaanProduk?.hasil_pemeriksaan" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </template>
      <template #right-content>
        <VExpansionPanels
          v-model="openedRightPanels"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
          multiple
        >
          <VExpansionPanel :value="0" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              No. Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelNoPendaftaran :data="dataPemeriksaanProduk?.no_pendaftaran" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="1" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Biaya Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <VRow>
                <VCol>
                  {{ dataPemeriksaanProduk?.total_biaya }}
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <div class="mt-10">
          <PanelTracking :data="dataPemeriksaanProduk?.tracking" />
        </div>
      </template>
    </LPHDetailLayout>
    <VDialog v-model="isSendModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Kirim Pengajuan</div>
          <VIcon @click="handleOpenSendModal"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              Pastikan dokumen persyaratan lengkap dan semua biaya pemeriksaan
              sudah dimasukkan. Invoice akan diterbitkan saat Anda klik tombol
              ”kirim” dan invoice tidak dapat diedit kembali
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="px-4">
          <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenSendModal"
            >Batal</VBtn
          >
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="[handleUpdateStatus(), handleOpenSendModal()]"
          >
            Ya, Kirim
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss">
:deep(
    .v-expansion-panel--active:not(:first-child),
    .v-expansion-panel--active + .v-expansion-panel
  ) {
  margin-top: 40px !important;
}
</style>
