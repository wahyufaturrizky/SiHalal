<script setup lang="ts">
import { ref } from 'vue';

const panelOpen = ref(0)
const businessScale = ref('Mikro')

const profilData = [
  { id: 1, field: 'Nomor ID', value: '128419697TSD' },
  { id: 2, field: 'Tanggal Buat', value: '10/12/2023' },
  { id: 3, field: 'Status', value: 'Dikirim ke Komisi Fatwa' },
  { id: 4, field: 'Jenis Pendaftaran', value: '-' },
  { id: 5, field: 'Nama Perusahaan', value: 'Kopi Susu Samsul' },
  { id: 6, field: 'Alamat', value: 'Sumbawa Banget, RT002/RW002, Sumbang, Curio' },
  { id: 7, field: 'Kota/Kab', value: 'Kab. Enrekang' },
  { id: 8, field: 'Provinsi', value: 'Sulawesi Selatan' },
  { id: 9, field: 'Kode Pos', value: '-' },
  { id: 10, field: 'Negara', value: 'Indonesia' },
  { id: 11, field: 'Telepon', value: '081234567890' },
  { id: 12, field: 'Email', value: 'kopisususamsul@gmail.com' },
]

const updateScale = () => {
  console.log(`Skala Usaha diubah menjadi: ${businessScale.value}`)
}
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h2>Profil</h2>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow
          v-for="data in profilData"
          :key="data.id"
          class="mb-2"
        >
          <VCol cols="4">
            <p class="mb-0">
              {{ data.field }}
            </p>
          </VCol>
          <VCol cols="1">
            <p class="mb-0">
              :
            </p>
          </VCol>
          <VCol cols="7">
            <p class="mb-0">
              {{ data.value }}
            </p>
          </VCol>
        </VRow>

        <VDivider class="my-4" />

        <VRow class="mb-2">
          <VCol cols="4">
            <p class="mb-0">
              Jenis Badan Usaha
            </p>
          </VCol>
          <VCol cols="1">
            <p class="mb-0">
              :
            </p>
          </VCol>
          <VCol cols="7">
            <p class="mb-0">
              Lainnya
            </p>
          </VCol>
        </VRow>

        <VRow class="mb-2">
          <VCol cols="4">
            <p class="mb-0">
              Skala Usaha
            </p>
          </VCol>
          <VCol cols="1">
            <p class="mb-0">
              :
            </p>
          </VCol>
          <VCol cols="7">
            <div class="d-flex align-center justify-end">
              <VSelect
                v-model="businessScale"
                density="compact"
                :items="['Mikro']"
              />
              <VBtn
                class="ms-4"
                variant="outlined"
                @click="updateScale"
              >
                Update
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped>
.mb-0 {
  margin-block-end: 0;
}

.ms-4 {
  margin-inline-start: 1rem;
}
</style>
