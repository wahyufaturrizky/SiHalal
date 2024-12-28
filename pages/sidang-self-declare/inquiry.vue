<script setup lang="ts">
import { ref } from 'vue';
import { VDataTableServer } from 'vuetify/components';

const items = ref<
  {
    id: string
    nama_pu: string
    alamat: string
    kota_pu: string
    jenis_produk: string
    merek_dagang: string
    no_daftar: string
    tgl_daftar: string
  }[]
>([])

const tableHeader = [
  { title: 'No', key: 'no' },
  { title: 'Jenis Produk', key: 'jenis_produk' },
  { title: 'Nama PU', key: 'nama_pu' },
  { title: 'Alamat', key: 'alamat' },
  { title: 'Merk Dagang', key: 'merek_dagang' },
  { title: 'No. Daftar', key: 'no_daftar' },
  { title: 'Tanggal Daftar', key: 'tgl_daftar' },
  { title: 'Action', key: 'action' },
]

const itemPerPage = ref(10)
const totalItems = ref(0)
const loading = ref(false)
const loadingAll = ref(true)
const page = ref(1)
const selectedFilterProduk = ref([])
const selectedFilterFasilitas = ref([])
const selectedFilterLembaga = ref([])
const selectedFilterPendamping = ref([])

const loadItem = async (
  page: number,
  size: number,

) => {
  try {
    loading.value = true

    const response: any = await $api('/self-declare/komite-fatwa/inquiry-1', {
      method: 'get',
      params: {
        page,
        size,
      },
    })

    if (response.code === 2000) {
      console.log(response.data, 'ini response data')
      items.value = response.data || []
      totalItems.value = response.total_item || 0
      loading.value = false
      console.log('Total Items:', totalItems.value)

      return response
    }
    else {
      loading.value = false
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    loading.value = false
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton />
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <h2>Inquiry / Pengajuan</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
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
                      <VLabel><b>Jenis Produk</b></VLabel>
                      <VSelect
                        v-model="selectedFilterProduk"
                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Fasilitas</b></VLabel>
                      <VSelect
                        v-model="selectedFilterFasilitas"
                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Lembaga</b></VLabel>
                      <VSelect
                        v-model="selectedFilterLembaga"
                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Pendamping</b></VLabel>
                      <VSelect
                        v-model="selectedFilterPendamping"
                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VBtn
                      style="inline-size: 100%;"
                      ariant="flat"
                      density="compact"
                    >
                      Apply
                    </VBtn>
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
              <VDataTableServer
                v-model:items-per-page="itemPerPage"
                v-model:page="page"
                :headers="tableHeader"
                :items="items"
                :loading="loading"
                :items-length="totalItems"
                loading-text="Loading..."
                @update:options="loadItem(page, itemPerPage)"
              >
                <template #item.no="{ index }">
                  {{ index + 1 + (page - 1) * itemPerPage }}
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
