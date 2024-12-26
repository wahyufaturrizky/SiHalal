<script setup lang="ts">
import TataCaraPembayaranDialog from '@/components/invoice/TataCaraPembayaranDialog.vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useDisplay } from 'vuetify'


const searchQuery = ref('');

const filter = ref({
  status : null,
  outDated : null
})

const headers = [
  { title: 'No', key: 'no' },
  { title: 'No. Pembayaran', key: 'no_payment', nowrap: true },
  { title: 'No. Tagihan', key: 'no_inv', nowrap: true },
  { title: 'Tanggal Tagihan', key: 'tgl_inv',nowrap: true },
  { title: 'No. Ref', key: 'no_ref' , nowrap: true},
  { title: 'Nama PU', key: 'nama' , nowrap: true},
  { title: 'Jenis Transaksi', key: 'jenis_transaksi', nowrap: true },
  { title: 'Jatuh Tempo', key: 'duedate', nowrap: true },
  { title: 'Jumlah Tagihan', key: 'total_inv', nowrap: true },
  { title: 'Status', key: 'status', nowrap: true },
  { title: 'Catatan', key: 'catatan', nowrap: true },
  { title: 'Action',  value: 'action', sortable: false, nowrap: true },

];

const items = [
  {
    duedate: '2024-12-15T23:12:52Z',
    file_inv: 'IN-FAS-18d679ef-bec7-41c7-8407-82e716ed364b.pdf',
    file_bukti: '',
    id_inv: '18d679ef-bec7-41c7-8407-82e716ed364b',
    nama: 'asdasdasd',
    no_daftar: '',
    no_inv: '000005',
    status: 'Menunggu Pembayaran',
    tgl_bayar: '0001-01-01T00:00:00Z',
    tgl_inv: '2024-12-10T23:12:52Z',
    total_inv: '230000.0000',
    va: '022024069930',
  }
];

// TODO -> LOGIC BUAT NGE UPDATE DATA BY FILTER
const submitKonfirmasiPembayaran = (form) => {
  // console.log('UPDATE FILTE ', form.value)
}

// TODO -> GET INVOICE INFO
const invoiceInformation = ref({
  noInvoice: '12321412',
  tanggalPembayaran: '12/11/2024',
  jumlahPembayaran: 'Rp 3.000.000'
})


const preview = (item) => {
  // console.log('PREVIEW FILE : ', item)
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
  <VContainer>
    <KembaliButton class="pl-0" />
    <h3 class="text-h3">Tagihan/Invoice</h3>
    <br />

    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">Daftar Tagihan/Invoice</span>
      </VCardTitle>
      <VCardItem>
        <VRow no-gutters class="d-flex align-center ga-2">
          <VCol cols="12" md="2">
            <VBtn
              color="primary"
              append-icon="mdi-filter"
              variant="outlined"
              min-width="160px"
            >
              Filter
              <VMenu activator="parent" :close-on-content-click="false" @update:modelValue="onUpdate">
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
              </VMenu>
            </VBtn>
          </VCol>
          <VCol>
            <VTextField
              v-model="searchQuery"
              density="compact"
              placeholder="Search Data"
              append-inner-icon="ri-search-line"
              @input="handleInput"
            />
          </VCol>
        </VRow>
      </VCardItem>
      <VCardItem>
        <VDataTable
          :headers="headers"
          :items="items"
          item-value="no"
          class="elevation-1"
        >
          <template v-slot:[`item.status`]="{ item }">
            <div class="d-flex flex-wrap">
              <VChip
                :key="index"
                :color="getChipColor(item.status)"
                label
                class="ma-1"
              >
                {{ item.status }}
              </VChip>
            </div>
          </template>
          <template #item.action="{ item }">
            <VBtn color="primary" variant="plain">
              <VIcon>mdi-dots-vertical</VIcon>
              <VMenu activator="parent" :close-on-content-click="false">
                <VCard>
                  <TataCaraPembayaranDialog />
                  <LihatInvoice />
                </VCard>
              </VMenu>
            </VBtn>
          </template>
        </VDataTable>
      </VCardItem>
    </VCard>
  </VContainer>
</template>
