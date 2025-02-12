<script setup lang="ts">

const searchQuery = ref(null)

const status = [
  { title: "Pengajuan", value: "OF10" },
  { title: "Selesai P3H", value: "OF71" },
  { title: "Verifikasi LP3H", value: "OF72" },
  { title: "Pembayaran", value: "OF56" },
  { title: "Dikirim ke Komite Fatwa", value: "OF74" },
  { title: "Dikembalikan ke PU", value: "OF280" },
  { title: "Dikembalikan oleh Fatwa", value: "OF285" },
  { title: "Selesai Sidang Fatwa", value: "OF100" },
  { title: "Penerbitan Sertifikat", value: "OF120" },
  { title: "Sertifikat Halal Terbit", value: "OF300" },
  { title: "Semua", value: null }
]

const fasilitas = [
  { title: "Todo", value: "todo" },
  { title: "Semua", value: null }
]

const years = [
  { title: "Semua", value: null }, // Menambahkan item "Semua"
  ...Array.from({ length: new Date().getFullYear() - 2021 + 1 }, (_, i) => {
    const year = 2021 + i;
    return { title: year.toString(), value: year.toString() };
  })
];

const loadItem = () => {
  console.log("LOAD ITEM : ")
}

const debouncedFetch = debounce(loadItem, 500);
const handleInput = () => {
  debouncedFetch({
    page: 0,
    size: 10,
    keyword: searchQuery.value,
  });
};

const selected = ref([]);

const headers = [
  { title: 'No', key: 'no' },
  { title: 'No. Daftar', key: 'no_daftar' },
  { title: 'Tanggal', key: 'tanggal' },
  { title: 'Nama PU', key: 'nama_pu', nowrap: true },
  { title: 'Jenis Produk & Merek', key: 'jenis_produk' , nowrap: true},
  { title: 'Nama Fasilitasi', key: 'nama_fasilitasi' , nowrap: true},
  { title: 'Nama Pendamping', key: 'nama_pendamping' , nowrap: true},
  { title: 'Catatan', key: 'catatan' },
  { title: 'Status', key: 'status' },
];

const items = [
  { id: 1, no: 1, no_daftar: '317307981729837', tanggal: '16/01/2024', nama_pu: 'Anugrah Windy Mustikaartu', jenis_produk: 'Produk & Merk A', nama_fasilitasi: 'Sehati', nama_pendamping: 'Saul Schinner', catatan: 'Tidak Ada.', status: '...' },
  { id: 2, no: 2, no_daftar: '317307981729837', tanggal: '21/01/2024', nama_pu: 'Ronald Richards', jenis_produk: 'Produk & Merk B', nama_fasilitasi: 'Non Sehati', nama_pendamping: 'Jimmy Bode', catatan: 'Tidak Ada.', status: '...' },
  { id: 3, no: 3, no_daftar: '317307981729837', tanggal: '04/03/2024', nama_pu: 'Jacob Jones', jenis_produk: 'Produk & Merk C', nama_fasilitasi: 'Sehati', nama_pendamping: 'Janet Terry', catatan: 'Tidak Ada.', status: '...' },
  { id: 4, no: 4, no_daftar: '317307981729837', tanggal: '09/03/2024', nama_pu: 'Arlene McCoy', jenis_produk: 'Produk & Merk D', nama_fasilitasi: 'Non Sehati', nama_pendamping: 'Gina Lesch', catatan: 'Tidak Ada.', status: '...' },
  { id: 5, no: 5, no_daftar: '317307981729837', tanggal: '10/04/2024', nama_pu: 'Ralph Edwards', jenis_produk: 'Produk & Merk E', nama_fasilitasi: 'Sehati', nama_pendamping: 'Emma Hansen', catatan: 'Tidak Ada.', status: '...' },
];

const dialog = ref(false);
const buatInvoiceHandler = () => {
  console.log("BUAT INVOICE, SELECTED ITEM : ", selected)
  dialog.value = false
  selected.value = []
  useSnackbar().sendSnackbar("Berhasil membuat invoice ", "success")
}

</script>

<template>
  <VContainer>
    <v-dialog v-model="dialog" max-width="700">
      <v-card class="pa-4">
        <v-card-title>Konfirmasi Buat Invoice </v-card-title>
        <v-card-text>Yakin akan membuat tagihan untuk data data yang di contreng tersebut ?</v-card-text>
        <VRow>
          <VCol class="d-flex justify-end ga-4">
            <v-btn variant="outlined" color="primary" @click="dialog = false">Batal</v-btn>
            <v-btn variant="flat" color="primary" @click="buatInvoiceHandler">Ya, Setuju</v-btn>
          </VCol>
        </VRow>
      </v-card>
    </v-dialog>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3">
          Buat Tagihan Ke BPJPH
        </h3>
      </VCol>
    </VRow>

    <VRow >
      <VCol cols="6" class="mb-8">
        <VLabel for="tahun" class="mb-2">Fasilitas</VLabel>
        <v-select
          id="fasilitas"
          label=""
          :items="fasilitas"
          variant="solo"
        ></v-select>
      </VCol>
      <VCol cols="6">
        <VLabel for="tahun" class="mb-2">Tahun Terbit SH</VLabel>
        <v-select
          id="tahun"
          label=""
          :items="years"
          variant="solo"
        ></v-select>
      </VCol>
      <VCol>
        <Btn>
          Tampil
        </Btn>
      </VCol>

      <VCol cols="12">
        <VCard class="pa-2">
          <VCardTitle class="text-h4 mx-0">
            Daftar Dokumen
          </VCardTitle>
          <VCardItem>
            <VRow class="pa-0">
              <VCol cols="6">
                <VRow>
                  <VCol cols="6">
                    <VTextField
                      v-model="searchQuery"
                      density="compact"
                      placeholder="Cari Dokumen "
                      append-inner-icon="ri-search-line"
                      @input="handleInput"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      density="compact"
                      placeholder="Pilih No."
                      @input="handleInput"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      density="compact"
                      placeholder="Sampai"
                      @input="handleInput"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="6">
                <VRow >
                  <VCol cols="12" class="d-flex justify-space-between">
                    <VBtn disabled>
                      Pilih
                    </VBtn>
                    <VBtn append-icon="mdi-file-document" :disabled="selected.length === 0" @click="dialog = true">
                      Buat Invoice
                    </VBtn>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VCardItem>
          <VCardItem>
            <VDataTableServer
              v-model="selected"
              :headers="headers"
              :items="items"
              item-value="id"
              show-select
            >
            </VDataTableServer>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">

</style>
