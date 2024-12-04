<script setup lang="ts">
import LPHDetailLayout from "@/layouts/LPHDetailLayout.vue";

const openedLeftPanels = ref([0, 1, 2, 3, 4, 5]);
const openedRightPanels = ref([0, 1, 2]);

const checkingCostHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Keterangan Biaya", key: "costName", nowrap: true },
  { title: "Jumlah", key: "quantity" },
  { title: "Harga", key: "price", nowrap: true },
  { title: "Sub Total", key: "subTotal", nowrap: true },
];
const checkingCostData = ref([
  {
    costName: "Biaya Pemeriksaan",
    quantity: "1",
    price: "Rp 6.000.000",
    subTotal: "Rp 6.000.000",
  },
  {
    costName: "Biaya Audit",
    quantity: "1",
    price: "Rp 1.000.000",
    subTotal: "Rp 1.000.000",
  },
  {
    costName: "",
    quantity: "",
    price: "Total",
    subTotal: "Rp 7.000.000",
  },
]);
</script>

<template>
  <LPHDetailLayout>
    <template #page-title>
      <VRow no-gutters>
        <VCol>
          <h1>Informasi Pembayaran Detail</h1>
        </VCol>
        <VCol class="d-flex justify-end">
          <VBtn text="Proses di LPH" append-icon="fa-paper-plane" />
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
            <PanelDaftarPengajuan business-type="Lainnya" />
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
            Biaya Pemeriksaan
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VDataTable
              :headers="checkingCostHeader"
              :items="checkingCostData"
              hide-default-footer
            >
              <template #item.index="{ index }">
                {{ index !== checkingCostData.length - 1 ? index + 1 : "" }}
              </template>
              <template #item.price="{ index, item }">
                <div
                  :class="
                    index !== checkingCostData.length - 1
                      ? ''
                      : 'font-weight-bold'
                  "
                >
                  {{ item.price }}
                </div>
              </template>
              <template #item.subTotal="{ index, item }">
                <div
                  :class="
                    index !== checkingCostData.length - 1
                      ? ''
                      : 'font-weight-bold'
                  "
                >
                  {{ item.subTotal }}
                </div>
              </template>
            </VDataTable>
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
            Informasi Lainnya
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VBtn color="primary"> Dokumen Lengkap </VBtn>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
      <div class="mt-10">
        <PanelTracking />
      </div>
    </template>
  </LPHDetailLayout>
</template>

<style scoped lang="scss">
:deep(
    .v-expansion-panel--active:not(:first-child),
    .v-expansion-panel--active + .v-expansion-panel
  ) {
  margin-top: 40px !important;
}
</style>
