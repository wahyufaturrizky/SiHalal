<script setup lang="ts">
import LPHDetailLayout from "@/layouts/LPHDetailLayout.vue";

const router = useRouter();
const openedLeftPanels = ref([0, 1, 2, 3, 4, 5]);
const openedRightPanels = ref([0, 1, 2]);

const isSendModalOpen = ref(false);

const handleOpenSendModal = () => {
  isSendModalOpen.value = !isSendModalOpen.value;
};

const handleUpdateStatus = () => {
  useSnackbar().sendSnackbar("Berhasil mengirim pengajuan data", "success");
};
</script>

<template>
  <LPHDetailLayout>
    <template #page-title>
      <VRow no-gutters>
        <VCol>
          <h1>Detail Ajuan Diterima</h1>
        </VCol>
        <VCol class="d-flex justify-end">
          <VBtn text="STTD" variant="outlined" class="me-4" disabled />
          <VBtn
            text="Update Biaya"
            variant="outlined"
            class="me-4"
            @click="router.push('/lph/list-accepted/list-price')"
          />
          <VBtn text="Kirim" @click="handleOpenSendModal" />
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
            Data Pengajuan
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <PanelDaftarPengajuan type="EDIT" business-type="PT" />
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="1" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Pengajuan Sertifikasi
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <PanelPengajuanSertifikasi />
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="2" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Daftar Nama Produk
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <PanelDaftarProduk />
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="3" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Jadwal Audit
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <PanelJadwalAudit />
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="4" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Auditor
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <PanelAuditorTable />
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="5" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Hasil Pemeriksaan
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <PanelHasilPemeriksaan />
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
            <PanelNoPendaftaran />
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="1" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Biaya Pemeriksaan
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VRow>
              <VCol>Rp7.000.000</VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="2" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Dokumen
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VRow align="center">
              <VCol cols="5" class="text-h6"> File KH </VCol>
              <VCol class="d-flex align-center">
                <div class="me-1">:</div>
                <VBtn rounded="xl" density="compact" class="px-2">
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </VCol>
            </VRow>
            <VRow align="center">
              <VCol cols="5" class="text-h6"> File Laporan LPH </VCol>
              <VCol class="d-flex align-center">
                <div class="me-1">:</div>
                <VBtn rounded="xl" density="compact" class="px-2">
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
      <div class="mt-10">
        <PanelTracking />
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
</template>

<style scoped lang="scss">
:deep(
    .v-expansion-panel--active:not(:first-child),
    .v-expansion-panel--active + .v-expansion-panel
  ) {
  margin-top: 40px !important;
}

:deep(.v-data-table.auditor-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
    }
    tbody > tr > td:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
      background: white;
    }
  }
}
</style>
