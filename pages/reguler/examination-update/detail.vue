<script setup lang="ts">
import LPHDetailLayout from "@/layouts/LPHDetailLayout.vue";

const openedLeftPanels = ref([0, 1, 2, 3, 4, 5]);
const openedRightPanels = ref([0, 1, 2]);

const assignAuditorHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Nama", key: "name" },
  { title: "Tanggal Lahir", key: "birthDate" },
  { title: "No Reg", key: "regisNumber" },
  { title: "Action", key: "actions", align: "center", sortable: false },
];
const assignAuditorData = ref([
  { name: "Idris", birthDate: "02/10/2000", regisNumber: "SK-896376-3028" },
]);
const newAuditorData = {
  name: "Aliando Syakir",
  birthDate: "02/10/2000",
  regisNumber: "SK-896376-3028",
};

const assignedAuditor = ref(null);
const isAssignModalOpen = ref(false);
const isUpdateModalOpen = ref(false);

const handleOpenAssignModal = () => {
  isAssignModalOpen.value = !isAssignModalOpen.value;
};
const handleOpenUpdateModal = () => {
  isUpdateModalOpen.value = !isUpdateModalOpen.value;
};

const handleAddAuditor = () => {
  assignAuditorData.value.push(newAuditorData);
};
const handleDeleteAuditor = (index: number) => {
  assignAuditorData.value.splice(index, 1);
};
const handleSaveAuditor = () => {
  useSnackbar().sendSnackbar("Berhasil mengirim pengajuan data", "success");
};

const handleUpdateStatus = () => {
  const snackbarMessage = assignedAuditor.value
    ? "Berhasil mengupdate status data"
    : "Gagal mengupdate status, silahkan assign auditor";
  const snackbarType = assignedAuditor.value ? "success" : "error";
  useSnackbar().sendSnackbar(snackbarMessage, snackbarType);
};
</script>

<template>
  <LPHDetailLayout>
    <template #page-title>
      <VRow no-gutters>
        <VCol>
          <h1>Detail Pemeriksaan</h1>
        </VCol>
        <VCol class="d-flex justify-end">
          <VBtn
            text="Assign Auditor"
            variant="outlined"
            class="me-4"
            @click="handleOpenAssignModal"
          />
          <VBtn text="Update Status" @click="handleOpenUpdateModal" />
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
            <PanelDaftarPengajuan type="EDIT" business-type="Lainnya" />
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
            <PanelHasilPemeriksaan type="EDIT" />
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
            Dokumen Unduhan
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VRow align="center">
              <VCol cols="5" class="text-h6"> Hasil Audit </VCol>
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
        <VExpansionPanel :value="1" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            No. Pendaftaran
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <PanelNoPendaftaran />
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="2" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Biaya Pemeriksaan
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VRow>
              <VCol>Rp7.000.000</VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
      <div class="mt-10">
        <PanelTracking />
      </div>
    </template>
  </LPHDetailLayout>
  <VDialog v-model="isAssignModalOpen" max-width="840px" persistent>
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">Update Status</div>
        <VIcon @click="handleOpenAssignModal"> fa-times </VIcon>
      </VCardTitle>
      <VCardText>
        <VRow class="mb-1">
          <VCol>
            <div class="text-h6 mb-1">Auditor</div>
            <VSelect
              placeholder="Masukkan Auditor"
              density="compact"
              class="mb-3"
              :items="[{ title: 'Aliando Syakir', value: 'Aliando Syakir' }]"
              @update:model-value="(v) => (assignedAuditor = v)"
              menu-icon="fa-chevron-down"
            />
            <div class="d-flex justify-end">
              <VBtn
                :disabled="!assignedAuditor"
                text="Tambah"
                @click="handleAddAuditor"
              />
            </div>
          </VCol>
        </VRow>
        <VRow class="mb-5">
          <VCol>
            <VDataTable
              class="auditor-table"
              :headers="assignAuditorHeader"
              :items="assignAuditorData"
              hide-default-footer
            >
              <template #item.index="{ index }">
                {{ index + 1 }}
              </template>
              <template #item.actions>
                <VIcon
                  icon="mdi-delete"
                  color="error"
                  @click="handleDeleteAuditor"
                />
              </template>
            </VDataTable>
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions class="px-4">
        <VBtn
          variant="outlined"
          class="px-4 me-3"
          @click="handleOpenAssignModal"
          >Batal</VBtn
        >
        <VBtn
          variant="flat"
          class="px-4"
          color="primary"
          @click="[handleSaveAuditor(), handleOpenAssignModal()]"
        >
          Simpan
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
  <VDialog v-model="isUpdateModalOpen" max-width="840px" persistent>
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">Update Status</div>
        <VIcon @click="handleOpenUpdateModal"> fa-times </VIcon>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol> Pastikan sudah memilih auditor untuk pengajuan ini. </VCol>
        </VRow>
      </VCardText>
      <VCardActions class="px-4">
        <VBtn
          variant="outlined"
          class="px-4 me-3"
          @click="handleOpenUpdateModal"
          >Batal</VBtn
        >
        <VBtn
          variant="flat"
          class="px-4"
          color="primary"
          @click="[handleUpdateStatus(), handleOpenUpdateModal()]"
        >
          Ya, Update
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
