<script setup lang="ts">
import TataCaraPembayaranDialog from "@/components/invoice/TataCaraPembayaranDialog.vue"
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useDisplay } from 'vuetify'


const searchQuery = ref("");

const filter = ref({
  status : null,
  outDated : null
})

const headers = [
  { title: 'No', key: 'no' },
  { title: 'No. Pembayaran', key: 'noPembayaran', nowrap: true },
  { title: 'No. Tagihan', key: 'noTagihan', nowrap: true },
  { title: 'Tanggal Tagihan', key: 'tanggalTagihan',nowrap: true },
  { title: 'No. Ref', key: 'noref' , nowrap: true},
  { title: 'Nama PU', key: 'namapu' , nowrap: true},
  { title: 'Jenis Transaksi', key: 'jenisTransaksi', nowrap: true },
  { title: 'Jatuh Tempo', key: 'jatuhtempo', nowrap: true },
  { title: 'Jumlah Tagihan', key: 'jumlahTagihan', nowrap: true },
  { title: 'Status', key: 'status', nowrap: true },
  { title: 'Catatan', key: 'catatan', nowrap: true },
  { title: "Action",  value: "action", sortable: false, nowrap: true },

];

const items = [
  {
    no: 1,
    noPembayaran: '12321412',
    noTagihan: '20289090',
    tanggalTagihan: '21/11/2024',
    noref: '1232193021',
    namapu: 'PT ABCD',
    jenisTransaksi: 'Sertifikasi Halal',
    jatuhtempo: '21/11/2024',
    jumlahTagihan: 'Rp 1.300.000',
    status: 'Lunas',
    catatan: '-'
  },
  {
    no: 2,
    noPembayaran: '12321412',
    noTagihan: '20289090',
    tanggalTagihan: '21/11/2024',
    noref: '1232193021',
    namapu: 'PT ABCD',
    jenisTransaksi: 'Sertifikasi Halal',
    jatuhtempo: '21/11/2024',
    jumlahTagihan: 'Rp 1.300.000',
    status: 'Lunas',
    catatan: '-'
  },
  {
    no: 3,
    noPembayaran: '12321412',
    noTagihan: '20289090',
    tanggalTagihan: '21/11/2024',
    noref: '1232193021',
    namapu: 'PT ABCD',
    jenisTransaksi: 'Sertifikasi Halal',
    jatuhtempo: '21/11/2024',
    jumlahTagihan: 'Rp 1.300.000',
    status: 'Lunas',
    catatan: '-'
  },
];

// TODO -> LOGIC BUAT NGE UPDATE DATA BY FILTER
const onUpdate = () => {
  console.log("UPDATE FILTE ", filter.value)
}


const preview = (item) => {
  console.log("PREVIEW FILE : ", item)
}

const { mdAndUp } = useDisplay()
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 400 : '90%'
})

// TODO -> BIKIN LOGIC BUAT SET CHIP COLOR
const getChipColor = (status: string) => {
  if (status === 'Lunas') return 'success';
  return 'primary';
};

</script>


<template>
  <v-container>
    <kembali-button class="pl-0" />
    <h3 class="text-h3">Tagihan/Invoice</h3>
    <br />

    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">Daftar Tagihan/Invoice</span>
      </v-card-title>
      <v-card-item>
        <VRow no-gutters class="d-flex align-center ga-2">
          <VCol cols="12" md="2">
            <v-btn
              color="primary"
              append-icon="mdi-filter"
              variant="outlined"
              min-width="160px"
            >
              Filter
              <v-menu activator="parent" :close-on-content-click="false" @update:modelValue="onUpdate">
                <VCard :min-width="dialogMaxWidth">
                  <VCardItem>
                    <VLabel for="status">Status</VLabel>
                    <VSelect
                      id="status"
                      :items="['Semua', 'Sebagian']"
                      placeholder="Pilih Status"
                      v-model="filter.status"
                      class="mb-1"
                    />
                    <VLabel for="outDated">Tanggal Jatuh Tempo</VLabel>
                    <VueDatePicker
                      teleport-center
                      id="outDated"
                      v-model="filter.outDated"
                      :enable-time-picker="false"
                    />
                  </VCardItem>
                </VCard>
              </v-menu>
            </v-btn>
          </VCol>
          <VCol >
            <v-text-field
              v-model="searchQuery"
              density="compact"
              placeholder="Search Data"
              append-inner-icon="ri-search-line"
              @input="handleInput"
            />
          </VCol>
        </VRow>
      </v-card-item>
      <v-card-item>
        <v-data-table
          :headers="headers"
          :items="items"
          item-value="no"
          class="elevation-1"
        >
          <template v-slot:[`item.status`]="{ item }">
            <div class="d-flex flex-wrap">
              <v-chip
                :key="index"
                :color="getChipColor(item.status)"
                label
                class="ma-1"
              >
                {{ item.status }}
              </v-chip>
            </div>
          </template>
          <template #item.action="{ item }">
            <v-btn color="primary" variant="plain">
              <VIcon>mdi-dots-vertical</VIcon>
              <VMenu activator="parent" :close-on-content-click="false">
                <VCard>
                  <TataCaraPembayaranDialog />
                  <KonfirmasiPembayaran />
                  <LihatInvoice />
                </VCard>
              </VMenu>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-item>
    </v-card>
  </v-container>
</template>
