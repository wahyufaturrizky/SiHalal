<style scoped lang="scss">

</style>


<script setup lang="ts">

import { computed, ref } from 'vue'

const items = ref([
  { no: '1', registration_number: '123456', importers_name: 'PT ABCD', nib_business_id_no: '987654321', npwp_taxpayer_id_no: '01.234.567.8-901.000', date: '2024-11-01', status: 'Pending', hcb: 'Yes', registration_date: '2024-01-01', submit_date: '2024-01-01', verifikator: '2132131', check: false },
  { no: '2', registration_number: '654321', importers_name: 'PT EFGH', nib_business_id_no: '123456789', npwp_taxpayer_id_no: '02.345.678.9-123.000', date: '2024-11-05', status: 'Approved', hcb: 'No', registration_date: '2024-01-01', submit_date: '2024-01-01', verifikator: '2132131', check: false },
  { no: '3', registration_number: '789123', importers_name: 'PT IJKL', nib_business_id_no: '192837465', npwp_taxpayer_id_no: '03.456.789.0-234.000', date: '2024-11-10', status: 'Pending', hcb: 'Yes', registration_date: '2024-01-01', submit_date: '2024-01-01', verifikator: '2132131', check: false },
  { no: '4', registration_number: '321654', importers_name: 'PT MNOP', nib_business_id_no: '564738291', npwp_taxpayer_id_no: '04.567.890.1-345.000', date: '2024-11-12', status: 'Rejected', hcb: 'No', registration_date: '2024-01-01', submit_date: '2024-01-01', verifikator: '2132131', check: false },
  { no: '5', registration_number: '654987', importers_name: 'PT QRST', nib_business_id_no: '203948576', npwp_taxpayer_id_no: '05.678.901.2-456.000', date: '2024-11-15', status: 'Approved', hcb: 'Yes', registration_date: '2024-01-01', submit_date: '2024-01-01', verifikator: '2132131', check: false },
])

const verifikatorTableHeader = [
  { title: 'No', key: 'no' },
  { title: 'Registration Number', key: 'registration_number' },
  { title: 'Importer\'s Name', key: 'importers_name' },
  { title: 'NIB / Business ID No', key: 'nib_business_id_no' },
  { title: 'NPWP / Taxpayer ID No', key: 'npwp_taxpayer_id_no' },
  { title: 'Date', key: 'date' },
]

const verifikatorTablePopUpHeader = [
  { title: 'No', key: 'no' },
  { title: 'Registration Number', key: 'registration_number' },
  { title: 'NIB / Business ID No', key: 'nib_business_id_no' },
  { title: 'HCB', key: 'hcb' },
  { title: 'Registration Date', key: 'registration_date'},
  { title: 'Submit Date', key: 'submit_date'},
  { title: 'Verifikator', key: 'verifikator'},
  { title: 'Status', key: 'status'},
  { title: 'Action', key: 'check'}
]


const searchQuery = ref('')

const filteredItems = computed(() => {
  if (!searchQuery.value)
    return items.value

  return items.value.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase()),
    ),
  )
})

const handleAdd = (selectedItems: any[]) => {
  console.log('Selected items:', selectedItems);
};

const handleCancel = (message: string) => {
  console.log('Cancel message:', message);
};

const showPopup = ref(false); // Control dialog visibility


</script>

<template>
  <div>
    <p class="text-h4">
      Foreign Halal Certificate Registration Verification
    </p>
    <VCard class="pa-4">
      <VRow>
        <VCol>
          <p class="text-h5">
            Submission List
          </p>
        </VCol>
        <VCol
          class="d-flex justify-end align-center"
          cols="6"
          md="2"
        >    <VerificationDataTableSelector
                :headers="verifikatorTablePopUpHeader"
                :items="items"
                @add="handleAdd"
                @cancel="handleCancel"
              />
        </VCol>
      </VRow>
      <VRow>
        <VCol
          class="d-flex justify-sm-space-between align-center"
          cols="5"
        >
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            style="max-width: 100%;"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VDataTable
            :headers="verifikatorTableHeader"
            :items="filteredItems"
          />
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

