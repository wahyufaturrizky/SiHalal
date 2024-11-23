<template>
  <v-container>
    <kembali-button class="pl-0" />
    <h3 class="text-h3">Hasil Penetapan</h3>
    <br />

    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">Daftar Hasil</span>
      </v-card-title>
      <v-card-item>
        <VRow no-gutters class="d-flex align-center">
          <VCol cols="2">
            <v-btn
              color="primary"
              append-icon="mdi-filter"
              variant="outlined"
            >
              Filter
              <v-menu activator="parent" :close-on-content-click="false" @update:modelValue="onUpdate">
                <VCard :min-width="dialogMaxWidth">
                  <VCardItem>
                    <VRow class="mb-1">
                      <VCol cols="6">
                        <VLabel for="startDate">Tanggal Sidang</VLabel>
                        <VTextField id="startDate" type="date" v-model="filter.startDate"></VTextField>
                      </VCol>
                      <VCol cols="6">
                        <VLabel for="startDate">Sampai</VLabel>
                        <VTextField id="startDate" type="date" v-model="filter.endDate"></VTextField>
                      </VCol>
                    </VRow>
                    <VSelect
                      :items="['Semua', 'Sebagian']"
                      placeholder="Pilih Ketetapan"
                      v-model="filter.decision"
                      class="mb-1"
                    />
                    <VCardText class="pa-0 mb-1">
                      <VLabel >Jumlah Hari Kerja</VLabel>
                      <VTextField type="number" placeholder="Isi Jumlah Hari Kerja"  v-model="filter.totalWorkingDays"></VTextField>
                    </VCardText>
                    <VCardText class="pa-0">
                      <VLabel >Rata-Rata</VLabel>
                      <VTextField type="number" placeholder="Isi Rata-Rata"  v-model="filter.average"></VTextField>
                    </VCardText>
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
        </v-data-table>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'


const searchQuery = ref("");

const filter = ref({
  startDate:  '',
  endDate: '',
  decision: 'Semua',
  totalWorkingDays: '',
  average: 21
})

const headers = [
  { title: 'No', key: 'no' },
  { title: 'Nomor Daftar', key: 'registrationDate', nowrap: true },
  { title: 'Nama PU', key: 'puName',nowrap: true },
  { title: 'Alamat', key: 'address' , nowrap: true},
  { title: 'Jenis Produk', key: 'productType', nowrap: true },
  { title: 'Merk Dagang', key: 'brand', nowrap: true },
  { title: 'Tanggal Sidang', key: 'hearingDate', nowrap: true },
  { title: 'Nomor KH', key: 'kHNumber', nowrap: true },
  { title: 'Status Ketetapan', key : 'status', nowrap: true },
  { title: 'Catatan',  key : 'remarks1', nowrap: true },
  { title: 'Catatan', key: 'remakrs2', nowrap: true }
];

const items = [
  {
    no: 1,
    registrationDate: '2024-11-20',
    puName: 'PT ABCD',
    address: 'Jl. Merdeka No. 10, Jakarta',
    productType: 'John Doe',
    brand: 'Kopi Enak',
    hearingDate: '22/10/2024',
    kHNumber: 'SH-20240191010',
    status: 'Ditetapkan Halal',
    remarks1: '-',
    remarks2: '-'
  },
  {
    no: 2,
    registrationDate: '2024-11-20',
    puName: 'PT ABCD',
    address: 'Jl. Merdeka No. 10, Jakarta',
    productType: 'John Doe',
    brand: 'Kopi Enak',
    hearingDate: '22/10/2024',
    kHNumber: 'SH-20240191010',
    status: 'Ditetapkan Halal',
    remarks1: '-',
    remarks2: '-'
  },
  {
    no: 3,
    registrationDate: '2024-11-20',
    puName: 'PT ABCD',
    address: 'Jl. Merdeka No. 10, Jakarta',
    productType: 'John Doe',
    brand: 'Kopi Enak',
    hearingDate: '22/10/2024',
    kHNumber: 'SH-20240191010',
    status: 'Ditetapkan Halal',
    remarks1: '-',
    remarks2: '-'
  },
];

// TODO -> LOGIC BUAT NGE UPDATE DATA BY FILTER
const onUpdate = () => {
  console.log("UPDATE FILTE ", filter.value)
}

// TODO -> BIKIN LOGIC BUAT SET CHIP COLOR
const getChipColor = (status: string) => {
  if (status === 'Ditetapkan Halal') return 'success';
  return 'primary';
};

const { mdAndUp } = useDisplay()
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 400 : '90%'
})

</script>
