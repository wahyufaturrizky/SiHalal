<script setup lang="ts">

const headers = [
  { title: 'No', key: 'no' },
  { title: 'Nama', key: 'name' },
  { title: 'Tipe Penambahan', key: 'type' },
  { title: 'Jumlah', key: 'total' },
  { title: 'Tanggal Pembelian', key: 'date' },
  { title: 'File Dokumen', key: 'file', value: 'file', sortable: false, nowrap: true },
  { title: 'Action', value: 'action', sortable: false, nowrap: true },
]

const items = ref([
  { no: 1,
    name: 'Kopi Luak Ciater',
    type: 'Unggah Photo',
    total: 20,
    date: '20/09/2024',
    file: null
  },
  { no: 2,
    name: 'Kopi Luak Ciater',
    type: 'Unggah Photo',
    total: 20,
    date: '20/09/2024',
    file: null
  },
])


// TODO -> LOGIC DELETE BY ID
const remove = no => {
  console.log('DELETE WITH ID : ', no)
}

// TODO -> LOGIC EDIT BY ID
const update = form => {
  console.log('EDIT  : ', form)
}

// TODO -> LOGIC TAMBAH DATA
const save = form => {
  console.log("TAMBAH DATA ", form)
}

// TODO -> LOGIC TAMBAH DATA
const download = item => {
  console.log("DOWNLOAD ", item)
}

</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Catatan Pembelian Bahan</span>
      <FormTambahPabrik @confirm="save"/>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :headers="headers"
        :items="items"
      >
        <template #item.pics="{ item }">
          <v-btn
            color="primary"
            variant="plain"
          >
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <VBtn variant="text" color="primary" prepend-icon="mdi-download"
                      @click="download(item)" block >
                  File
                </VBtn>
              </VCard>
            </VMenu>
          </v-btn>
        </template>

        <template #item.action="{ item }">
          <v-btn
            color="primary"
            variant="plain"
          >
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditPabrik :initial-data="item" @confirm="update"/>
                <VBtn variant="text" color="error" prepend-icon="ri-delete-bin-6-line"
                      @click="remove(item.no)" block >
                  Hapus
                </VBtn>
              </VCard>
            </VMenu>
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss">

</style>
