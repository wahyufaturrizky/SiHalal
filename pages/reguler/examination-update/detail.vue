<script setup lang="ts">
import LPHDetailLayout from "@/layouts/LPHDetailLayout.vue";

const openedLeftPanels = ref([0, 1, 2, 3, 4, 5]);
const openedRightPanels = ref([0, 1, 2]);

const productNameHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Layanan Produk", key: "service", nowrap: true },
  { title: "Jenis Produk", key: "type", nowrap: true },
  { title: "Kelas Produk", key: "class", nowrap: true },
  { title: "Rincian Produk", key: "detail", nowrap: true },
  { title: "Nama Produk", key: "name", nowrap: true },
  { title: "Publikasi", key: "isPublished" },
];
const productNameData = ref([
  {
    service: "Makanan",
    type: "Penyedia minuman dan makanan dengan pengolahan",
    class: "Resto",
    detail: "Makanan Mie",
    name: "Ramen Double Spicy lvl 2",
    isPublished: true,
  },
  {
    service: "Makanan",
    type: "Penyedia minuman dan makanan dengan pengolahan",
    class: "Resto",
    detail: "Makanan Mie",
    name: "Ramen Double Spicy lvl 2",
    isPublished: false,
  },
  {
    service: "Makanan",
    type: "Penyedia minuman dan makanan dengan pengolahan",
    class: "Resto",
    detail: "Makanan Mie",
    name: "Ramen Double Spicy lvl 2",
    isPublished: true,
  },
]);

const auditorHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Nama", key: "name", nowrap: true },
  { title: "Tanggal Lahir", key: "birthDate", nowrap: true },
  { title: "JK", key: "jk" },
  { title: "No. Pendaftaran", key: "regisNumber", nowrap: true },
];
const auditorData = ref([
  {
    name: "Bambang",
    birthDate: "20/10/2000",
    jk: "-",
    regisNumber: "REG RI AHA 10102134",
  },
]);

const trackingData = ref([
  {
    title: "Draft PU",
    desc: "Ramen Gril Indonesia",
    date: "09/09/2024",
  },
  {
    title: "Submmited PU",
    desc: "Ramen Gril Indonesia",
    date: "09/09/2024",
  },
  {
    title: "Verifikasi",
    desc: "Oleh Yuan",
    date: "09/09/2024",
  },
  {
    title: "Dikirim ke LPH",
    desc: "Yuan (selesai verif)",
    date: "09/09/2024",
  },
  {
    title: "Penetapan Biaya",
    desc: "Global halal",
    date: "09/09/2024",
  },
]);

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
            <VRow>
              <VCol cols="5" class="font-weight-bold">No. ID</VCol>
              <VCol cols="7">: 39886986</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Status</VCol>
              <VCol cols="7">: Pembayaran</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Tanggal Buat</VCol>
              <VCol cols="7">: 10/10/2024</VCol>
            </VRow>
            <VDivider class="my-5" />
            <VRow>
              <VCol cols="5" class="font-weight-bold">Nama Perusahaan</VCol>
              <VCol cols="7">: Kopi Susu Samsul</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Alamat</VCol>
              <VCol cols="7"
                >: Sumbawa Banget, RT002/RW002, Sumbang, Curio</VCol
              >
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Kota/Kab</VCol>
              <VCol cols="7">: Kab. Enrekang</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Provinsi</VCol>
              <VCol cols="7">: Sulawesi Selatan</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Kode Pos</VCol>
              <VCol cols="7">: -</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Negara</VCol>
              <VCol cols="7">: Indonesia</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Telepon</VCol>
              <VCol cols="7">: 081234567890</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Email</VCol>
              <VCol cols="7">: kopisususamsul@gmail.com</VCol>
            </VRow>
            <VDivider class="my-5" />
            <VRow>
              <VCol cols="5" class="font-weight-bold">Jenis Badan Usaha</VCol>
              <VCol cols="7">: Lainnya</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold d-flex align-center"
                >Skala Usaha</VCol
              >
              <VCol cols="7" class="d-flex align-center">
                <div class="pe-1">:</div>
                <VSelect density="compact" model-value="Mikro" rounded="xl">
                  <template #append>
                    <VBtn text="Update" variant="outlined" disabled />
                  </template>
                </VSelect>
              </VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="1" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Pengajuan Sertifikasi
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VRow>
              <VCol cols="5" class="font-weight-bold"
                >No / Tanggal Permohonan</VCol
              >
              <VCol cols="7">: 1213 / 10/11/2023</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Jenis Layanan</VCol>
              <VCol cols="7">: Minuman</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Jenis Pengajuan</VCol>
              <VCol cols="7">: Baru</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Jenis Produk</VCol>
              <VCol cols="7">: Minuman Bahagia</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Merek Dagang</VCol>
              <VCol cols="7">: PT. Sukarasa</VCol>
            </VRow>
            <VRow>
              <VCol cols="5" class="font-weight-bold">Area Pemasaran</VCol>
              <VCol cols="7">: Provinsi</VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="2" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Daftar Nama Produk
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VDataTable
              :headers="productNameHeader"
              :items="productNameData"
              hide-default-footer
            >
              <template #item.index="{ index }">
                {{ index + 1 }}
              </template>
              <template #item.isPublished="{ item }">
                <VCheckbox :model-value="item.isPublished" />
              </template>
              <template #bottom>
                <VDataTableFooter
                  v-if="productNameData.length > 5"
                  class="custom-table"
                  first-icon="mdi-chevron-double-left"
                  last-icon="mdi-chevron-double-right"
                  show-current-page
                />
              </template>
            </VDataTable>
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="3" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Jadwal Audit
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VRow>
              <VCol cols="6" class="font-weight-bold">Tanggal Mulai</VCol>
              <VCol cols="6">: 10/12/2023</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Tanggal Selesai</VCol>
              <VCol cols="6">: 10/12/2023</VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="4" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Auditor
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VDataTable
              :headers="auditorHeader"
              :items="auditorData"
              hide-default-footer
            >
              <template #item.index="{ index }">
                {{ index + 1 }}
              </template>
            </VDataTable>
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="5" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Hasil Pemeriksaan
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VRow>
              <VCol cols="6" class="font-weight-bold">Tanggal Selesai LPH</VCol>
              <VCol cols="6">: 10/12/2023</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Hasil</VCol>
              <VCol cols="6">: Lulus</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Dokumen </VCol>
              <VCol cols="6">: -</VCol>
            </VRow>
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
            <div class="d-flex flex-column ga-2">
              <div class="text-h5">SH2023-1-582897</div>
              <div class="text-h6">13/10/2024</div>
              <div class="text-h6">Jawa Tengah</div>
            </div>
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
      <VCard class="mt-10 pa-5">
        <VCardlTitle class="font-weight-bold text-h4"> Melacak </VCardlTitle>
        <VCardText class="px-0">
          <VTimeline side="end" align="start" hide-opposite>
            <VTimelineItem dot-color="#FFFFFF" v-for="item in trackingData">
              <VRow>
                <VCol cols="7">
                  <div class="text-h6">{{ item.title }}</div>
                  <div>{{ item.desc }}</div>
                </VCol>
                <VCol cols="5">
                  <div>{{ item.date }}</div>
                </VCol>
              </VRow>
            </VTimelineItem>
          </VTimeline>
        </VCardText>
      </VCard>
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
    .v-expansion-panel--active:not(:last-child),
    .v-expansion-panel--active + .v-expansion-panel
  ) {
  margin-bottom: 40px !important;
}

:deep(.v-data-table.custom-table > .v-data-table-footer) {
  .v-data-table-footer__info {
    display: none;
  }
}

:deep(.v-timeline.v-timeline--vertical) {
  // .v-timeline-item:first-child .v-timeline-divider {
  //   padding-block-start: 0px;
  // }
  .v-timeline-divider__dot .v-timeline-divider__inner-dot {
    box-shadow: 0 0 0 2px #652672;
  }
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
