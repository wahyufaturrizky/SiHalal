<script setup lang="ts">
const panelOpen = ref(0)

const profilData = [
  { id: 1, field: 'Nama Perusahaan', value: 'Kopi Susu Samsul' },
  {
    id: 2,
    field: 'Alamat',
    value: 'Sumbawa Banget, RT002/RW002, Sumbang, Curio',
  },
  { id: 3, field: 'Kota/Kab', value: 'Kab. Enrekang' },
  { id: 4, field: 'Provinsi', value: 'Sulawesi Selatan' },
  { id: 5, field: 'Kodepos', value: '-' },
  { id: 6, field: 'Negara', value: 'Indonesia' },
  { id: 7, field: 'Telepon', value: '08123467890' },
  { id: 8, field: 'Email', value: 'kopisususamsul@gmail.com' },
]
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>Profil</h2></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow
          v-for="data in profilData"
          :key="data.id"
        >
          <VCol cols="4">
            <p>{{ data.field }}</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="7">
            <p>{{ data.value }}</p>
          </VCol>
        </VRow>
        <VDivider />
        <br>
        <VRow>
          <VCol cols="4">
            Jenis Badan Usaha
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol cols="7">
            Lainnya
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4">
            Tingkat Usaha
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol cols="7">
            UMK
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="4"
            style="display: flex; align-items: center;"
          >
            Skala Usaha
          </VCol>
          <VCol
            cols="1"
            style="display: flex; align-items: center;"
          >
            :
          </VCol>
          <VCol cols="7">
            <div style="display: flex; align-items: center; justify-content: end;">
              <VSelect
                density="compact"
                :items="['Mikro']"
              />
              <VBtn
                style="margin-inline-start: 1svw;"
                variant="outlined"
              >
                Update
              </VBtn>
            </div>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4">
            Modal Dasar
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol cols="7">
            Rp 0
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4">
            Asal Usaha
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol cols="7">
            Domestik
          </VCol>
        </VRow>
        <br>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
