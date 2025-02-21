<script setup lang="ts">

const searchQuery = ref(null)

const itemPerPage = ref(10);
const totalItems = ref(0);
const page = ref(1);
const loading = ref(true);

const menu = ref(false);
const selectedYear = ref(null)
const selectedFasilitas = ref(null)

const fasilitas = ref([])

const years = [
  { title: "Semua", value: null }, // Menambahkan item "Semua"
  ...Array.from({ length: new Date().getFullYear() - 2021 + 1 }, (_, i) => {
    const year = 2021 + i;
    return { title: year.toString(), value: year.toString() };
  })
];

const selected = ref([]);

const headers = [
  { title: 'No', key: 'no' },
  { title: 'No. Daftar', key: 'no_daftar', nowrap: true },
  { title: 'Tanggal', key: 'tanggal' , nowrap: true },
  { title: 'Nama PU', key: 'nama_pu', nowrap: true , nowrap: true },
  { title: 'Jenis Produk & Merek', key: 'jenis_produk' , nowrap: true},
  { title: 'Nama Fasilitasi', key: 'nama_fasilitasi' , nowrap: true},
  { title: 'Nama Pendamping', key: 'nama_pendamping' , nowrap: true},
  { title: 'Catatan', key: 'catatan' },
  { title: 'Status', key: 'status' },
];

const items = ref([]);

const dialog = ref(false);
const buatInvoiceHandler = () => {
  //console.log("BUAT INVOICE, SELECTED ITEM : ", selected)
  dialog.value = false
  selected.value = []
  useSnackbar().sendSnackbar("Berhasil membuat invoice ", "success")
}


const loadFasilitasi = async () => {
  try {
    loading.value = true;
    const response = await $api("/lp3h/list-fasilitasi", {
      method: "get",
    });

    const data = response.data;
    //console.log("RESPONSE : ", response)

    fasilitas.value = [
      { title: "Semua", value: null },
      ...data.map(i => ({
        title: i.fac_name,
        value: i.fac_id
      }))
    ];
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadListDokumen = async (page: number, limit: number, fac_id: string, tahun: number, search: string  ) => {
  try {
    loading.value = true;
    const response = await $api("/lp3h/list-dokumen", {
      method: "get",
      params: {
        page,
        limit,
        fac_id,
        tahun,
        search
      }
    })

    totalItems.value = response.totalItems
    const data = response.data;
    //console.log("RESPONSE : ", response)

    items.value = data.map(
        i => ({
          id : i.id_reg,
          no_daftar: i.no_daftar,
          tanggal: i.tgl_daftar,
          nama_pu: i.nama_pu,
          jenis_produk: i.jenis_produk,
          nama_fasilitasi: i.Facilitated.fac_name,
          nama_pendamping: i.Pendamping.nama,
          catatan: i.SidangFatwa.catatan,
        })
    )
    loading.value = false
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const debouncedFetch = debounce(loadListDokumen, 500);
const changeFilterBy = () => {
  debouncedFetch(page.value, itemPerPage.value , selectedFasilitas.value , selectedYear.value, searchQuery.value)
};


onMounted(async () => {
  await loadFasilitasi()
})


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
      <VCol cols="12">
        <VCard class="pa-2">
          <VCardTitle class="text-h4 mx-0">
            Daftar Dokumen
          </VCardTitle>
          <VCardItem>
            <VRow class="pa-0">
              <VCol cols="9">
                <VRow>
                  <VCol cols="2">
                    <v-menu v-model="menu" :close-on-content-click="false">
                      <template v-slot:activator="{ props }">
                        <v-btn   class="d-flex justify-space-between"
                                 v-bind="props" variant="outlined" append-icon="mdi-filter" min-width="130px">
                          Filter
                        </v-btn>
                      </template>
                      <VCard class="pa-4 text-xs" min-width="400px">
                        <VLabel for="fasilitas" class="mb-2">Fasilitas</VLabel>
                        <v-select
                          id="fasilitas"
                          label=""
                          :items="fasilitas"
                          v-model="selectedFasilitas"
                          @update:model-value="changeFilterBy"
                          variant="solo"
                        ></v-select>
                        <VLabel for="tahun" class="mb-2">Tahun Terbit SH</VLabel>
                        <v-select
                          id="tahun"
                          label=""
                          :items="years"
                          v-model="selectedYear"
                          @update:model-value="changeFilterBy"
                          variant="solo"
                        ></v-select>
                      </VCard>
                    </v-menu>
                  </VCol>
                  <VCol cols="4">
                    <VTextField
                      v-model="searchQuery"
                      density="compact"
                      placeholder="Cari Dokumen "
                      append-inner-icon="ri-search-line"
                      @input="changeFilterBy"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      density="compact"
                      placeholder="Pilih No."
                      @input="changeFilterBy"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      density="compact"
                      placeholder="Sampai"
                      @input="changeFilterBy"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="3">
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
              v-model:items-per-page="itemPerPage"
              v-model:page="page"
              :loading="loading"
              loading-text="Loading..."
              :items-length="totalItems"
              @update:options="loadListDokumen(page, itemPerPage, selectedFasilitas, selectedYear, searchQuery)"
            >
              <template #item.no="{ index }">
                {{ index + 1 }}
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
