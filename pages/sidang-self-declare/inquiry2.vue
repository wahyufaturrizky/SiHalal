<script setup lang="ts">
const tableHeader = [
  { title: 'No', value: 'no' },
  { title: 'Jenis Bahan', value: 'ingr_kind' },
  { title: 'Nama Bahan', value: 'ingr_name' },
  { title: 'Kelompok', value: 'group' },
  { title: 'Merk', value: 'brand' },
  { title: 'Produsen', value: 'manufacturer' },
  { title: 'No. Sertifikat Halal', value: 'sh_number' },
  { title: 'Tanggal Berlaku', value: 'effective_date' },
  { title: 'Verifikasi Pendamping', value: 'verification_comp' },
  { title: 'Action', value: 'action' },
]

const selectedFilterPermohonan = ref([])

const permohonanItems = [
  { name: 'X', value: 1 },
  { name: 'Y', value: 2 },
  { name: 'Z', value: 3 },
]

const selectedFilterStatusPermhonan = ref([])

const statusPermhonanItems = [
  { name: 'X', value: 1 },
  { name: 'Y', value: 2 },
  { name: 'Z', value: 3 },
]

const selectedFilterWilayah = ref([])

const wilayahItems = [
  { name: 'X', value: 1 },
  { name: 'Y', value: 2 },
  { name: 'Z', value: 3 },
]

const selectedFilterKabupaten = ref([])

const kabupatenItems = [
  { name: 'X', value: 1 },
  { name: 'Y', value: 2 },
  { name: 'Z', value: 3 },
]

const selectedFilterFasilitaas = ref([])

const fasilitasItems = [
  { name: 'X', value: 1 },
  { name: 'Y', value: 2 },
  { name: 'Z', value: 3 },
]

const selectedFilterNameFasilitator = ref([])

const nameFasilitatorItems = [
  { name: 'X', value: 1 },
  { name: 'Y', value: 2 },
  { name: 'Z', value: 3 },
]

const selectedFilterLayer = ref([])

const layerItems = [
  { name: 'X', value: 1 },
  { name: 'Y', value: 2 },
  { name: 'Z', value: 3 },
]
</script>

<template>
  <KomiteFatwaLayout>
    <template #pageTitle>
      <VRow>
        <VCol cols="12">
          <h2>Inquiry / Pengajuan</h2>
        </VCol>
      </VRow>
    </template>

    <!-- centerContent content -->
    <template #centerContent>
      <VCard>
        <VCardTitle><h3>Data Pengajuan</h3></VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3">
              <VMenu :close-on-content-click="false">
                <template #activator="{ props: openMenu }">
                  <VBtn
                    append-icon="fa-filter"
                    v-bind="openMenu"
                    variant="outlined"
                    style="inline-size: 100%;"
                  >
                    Filter
                  </VBtn>
                </template>
                <VList>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Jenis Permohonan</b></VLabel>
                      <VSelect
                        v-model="selectedFilterPermohonan"
                        :items="permohonanItems"
                        item-value="value"
                        item-title="name"
                        placeholder="Semua"
                        density="compact"
                      />
                    </VItemGroup>
                  </VListItem>

                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Status Permohonan</b></VLabel>
                      <VSelect
                        v-model="selectedFilterStatusPermhonan"
                        :items="statusPermhonanItems"
                        item-value="value"
                        item-title="name"

                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>

                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Wilayah</b></VLabel>
                      <VSelect
                        v-model="selectedFilterWilayah"
                        :items="wilayahItems"
                        item-value="value"
                        item-title="name"

                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>

                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Kabupaten</b></VLabel>
                      <VSelect
                        v-model="selectedFilterKabupaten"
                        :items="kabupatenItems"
                        item-value="value"
                        item-title="name"

                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>

                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Fasilitas</b></VLabel>
                      <VSelect
                        v-model="selectedFilterFasilitaas"
                        :items="fasilitasItems"
                        item-value="value"
                        item-title="name"

                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>

                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Nama Fasilitator </b></VLabel>
                      <VSelect
                        v-model="selectedFilterNameFasilitator"
                        :items="layerItems"
                        item-value="value"
                        item-title="name"
                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>

                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Layer </b></VLabel>
                      <VSelect
                        v-model="selectedFilterLayer"
                        :items="nameFasilitatorItems"
                        item-value="value"
                        item-title="name"
                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>
                </VList>
              </VMenu>
            </VCol>
            <VCol cols="1" />
            <VCol cols="8">
              <VTextField
                density="compact"
                placeholder="Cari Nama Pengajuan"
                append-inner-icon="mdi-magnify"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VDataTable :headers="tableHeader" />
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </template>
  </KomiteFatwaLayout>
</template>

<style scoped></style>
