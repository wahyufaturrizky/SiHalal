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


const exportExcel = () => {
  console.log("EXPORT EXCEL ")
}


const daftarLaporanHeader = [
  { title: "No", key: "no"},
  { title: "ID Reg", key: "idReg"},
  { title: "No.Daftar", key: "noDaftar"},
  { title: "Tanggal Daftar", key: "tanggalDaftar"},
  { title: "Kode Fasilitasi", key: "kodeFasilitasi"},
  { title: "Nama PU", key: "namaPu"},
  { title: "Alamat", key: "alamat"},
  { title: "Merk Dagang", key: "merkDagang"},
  { title: "No. HP Kontak", key: "noHp"},
  { title: "Nama Pendamping", key: "namaPendamping"},
  { title: "invoice", key: "invoice"},
  { title: "Action", key: "action"},

]

const daftarLaporanItem = [
  {
    idReg: "24110",
    noDaftar: "",
    tanggalDaftar: "",
    kodeFasilitasi: "Sehati",
    namaPu: "Kristen Zulauf",
    alamat: "JALAN RIAU GG MUTIARA NO 3",
    merkDagang: "Merk A",
    noHp: "082310101010",
    namaPendamping: "Woodrow Hagenes",
    invoice: ""
  }
]


const action = (item) => {
  console.log("action : ", item)
}


</script>

<template>
  <VContainer>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3">
          Laporan Self Declare
        </h3>
      </VCol>
    </VRow>

    <VRow >
      <VCol cols="6" class="mb-8">
        <VLabel for="status" class="mb-2">Status</VLabel>
        <v-select
          id="status"
          label=""
          :items="status"
          variant="solo"
          class="mb-8"
        ></v-select>
        <VLabel for="fasilitas" class="mb-2">Fasilitas</VLabel>
        <v-select
          id="fasilitas"
          label=""
          :items="fasilitas"
          variant="solo"
        ></v-select>
      </VCol>
      <VCol cols="6">
        <VLabel for="tahun" class="mb-2">Tahun</VLabel>
        <v-select
          id="tahun"
          label=""
          :items="years"
          variant="solo"
        ></v-select>
      </VCol>

      <VCol cols="12">
        <VCard class="pa-2">
          <VCardTitle class="text-h4 mx-0">
            Daftar Laporan
          </VCardTitle>
          <VCardItem>
            <VRow class="pa-0">
              <VCol cols="6">
                <VTextField
                  v-model="searchQuery"
                  density="compact"
                  placeholder="Cari No. Daftar / Nama PU / Nama Pendamping "
                  append-inner-icon="ri-search-line"
                  @input="handleInput"
                />
              </VCol>
              <VCol class="d-flex justify-end">
                <VBtn color="primary" class="ml-2" @click="exportExcel" append-icon="mdi-file-excel">
                  Export XLS
                </VBtn>
              </VCol>
            </VRow>
          </VCardItem>
          <VCardItem>
            <VDataTableServer
              :headers="daftarLaporanHeader"
              :items="daftarLaporanItem"
            >
              <template #item.no="{ index }">
                {{ index + 1 }}
              </template>

              <template #item.action="{ item }">
                <VBtn icon variant="text" @click="action(item)">
                  <VIcon size="24" color="primary">mdi-arrow-right</VIcon>
                </VBtn>
              </template>
            </VDataTableServer>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">

</style>
