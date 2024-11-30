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
            <VRow>
              <VCol cols="6" class="font-weight-bold">No. ID</VCol>
              <VCol cols="6">: 39886986</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Status</VCol>
              <VCol cols="6">: Pembayaran</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Tanggal Buat</VCol>
              <VCol cols="6">: 10/10/2024</VCol>
            </VRow>
            <VDivider class="my-5" />
            <VRow>
              <VCol cols="6" class="font-weight-bold">Nama Perusahaan</VCol>
              <VCol cols="6">: Kopi Susu Samsul</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Alamat</VCol>
              <VCol cols="6"
                >: Sumbawa Banget, RT002/RW002, Sumbang, Curio</VCol
              >
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Kota/Kab</VCol>
              <VCol cols="6">: Kab. Enrekang</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Provinsi</VCol>
              <VCol cols="6">: Sulawesi Selatan</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Kode Pos</VCol>
              <VCol cols="6">: -</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Negara</VCol>
              <VCol cols="6">: Indonesia</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Telepon</VCol>
              <VCol cols="6">: 081234567890</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Email</VCol>
              <VCol cols="6">: kopisususamsul@gmail.com</VCol>
            </VRow>
            <VDivider class="my-5" />
            <VRow>
              <VCol cols="6" class="font-weight-bold">Jenis Badan Usaha</VCol>
              <VCol cols="6">: Lainnya</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Skala Usaha</VCol>
              <VCol cols="6">: Mikro</VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel :value="1" class="pt-3">
          <VExpansionPanelTitle class="font-weight-bold text-h4">
            Pengajuan Sertifikasi
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VRow>
              <VCol cols="6" class="font-weight-bold"
                >No / Tanggal Permohonan</VCol
              >
              <VCol cols="6">: 1213 / 10/11/2023</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Jenis Layanan</VCol>
              <VCol cols="6">: Minuman</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Jenis Pengajuan</VCol>
              <VCol cols="6">: Baru</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Jenis Produk</VCol>
              <VCol cols="6">: Minuman Bahagia</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Merek Dagang</VCol>
              <VCol cols="6">: PT. Sukarasa</VCol>
            </VRow>
            <VRow>
              <VCol cols="6" class="font-weight-bold">Area Pemasaran</VCol>
              <VCol cols="6">: Provinsi</VCol>
            </VRow>
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
              <VCol cols="6">: -</VCol>
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
            No. Pendaftaran
          </VExpansionPanelTitle>
          <VExpansionPanelText class="mt-5">
            <VRow>
              <VCol>SH2023-1-582897</VCol>
            </VRow>
            <VRow>
              <VCol>13/10/2024</VCol>
            </VRow>
            <VRow>
              <VCol>Jawa Tengah</VCol>
            </VRow>
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
</template>

<style scoped lang="scss">
:deep(
    .v-expansion-panel--active:not(:first-child),
    .v-expansion-panel--active + .v-expansion-panel
  ) {
  margin-top: 40px !important;
}

:deep(.v-timeline.v-timeline--vertical) {
  // .v-timeline-item:first-child .v-timeline-divider {
  //   padding-block-start: 0px;
  // }
  .v-timeline-divider__dot .v-timeline-divider__inner-dot {
    box-shadow: 0 0 0 2px #652672;
  }
}
</style>
