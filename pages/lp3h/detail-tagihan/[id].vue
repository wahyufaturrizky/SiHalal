<script setup lang="ts">
const route = useRoute();

const id = (route.params as any).id;

const query = ref(route.query.data ? JSON.parse(route.query.data) : {});


const itemPerPage = ref(10);
const totalItems = ref(0);
const page = ref(1);
const loading = ref(true);


const detailTagihanHeader = [
  { title: "No", key: "no"},
  { title: "ID Reg", key: "idReg", nowrap: true},
  { title: "No. Daftar", key: "noDaftar", nowrap: true},
  { title: "Tgl. Daftar", key: "tglDaftar", nowrap: true},
  { title: "Nama PU", key: "namaPu", nowrap: true },
  { title: "Kab/Kota", key: "kabKota", nowrap: true},
  { title: "Provinsi", key: "provinsi", nowrap: true },
  { title: "Total", key: "total"},
  { title: "Nama Pendamping", key: "namaPendamping", nowrap: true},
  { title: "No. Rekening", key: "noRekening", nowrap: true},
  { title: "Kode Bank", key: "kodeBank", nowrap: true}
]

const detailTagihanItem = ref([])

const loadItem = async () => {
  try {
    loading.value = true;
    const response = await $api("/lp3h/detail-tagihan", {
      method: "get",
      params: {
        page: page.value,
        limit: itemPerPage.value,
        id_reg: id
      },
    });

    const data = response.data;

    detailTagihanItem.value = data.map(
      i => ({
        idReg: i.id_reg,
        noDaftar : i.no_daftar,
        tglDaftar: i.tgl_daftar,
        namaPu: i.nama_pu,
        kabKota: i.kota_pu,
        provinsi: i.prov_pu,
        total: i.total,
        namaPendamping: i.pendamping_nama,
        noRekening: i.no_rekening,
        kodeBank: i.bank
      })
    )

    totalItems.value = response.totalItems;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const debouncedFetch = debounce(loadItem, 500);
onMounted(async () => {
  // debouncedFetch(page.value, itemPerPage.value,);
})


</script>

<template>
  <VContainer>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="mb-4">
        <h3 class="text-h3">
          Detail Daftar Tagihan ke BPJPH
        </h3>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle class="text-h4 mx-0">
            Daftar Invoice
          </VCardTitle>
          <VCardItem>
            <VRow>
              <VCol cols="6">
                <VRow>
                  <VCol cols="6">
                    <span>No. Invoice</span>
                  </VCol>
                  <VCol cols="6">
                    <span>: {{query.no}}</span>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="6">
                    <span>Total Invoice</span>
                  </VCol>
                  <VCol cols="6">
                    <span>: {{query.total}}</span>
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="6">
                <VRow>
                  <VCol cols="6">
                    <span>Jumlah PU</span>
                  </VCol>
                  <VCol cols="6">
                    <span>: {{query.jumlahPu}}</span>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="6">
                    <span>Status</span>
                  </VCol>
                  <VCol cols="6">
                    <span>: <VChip :color="query.status === 'Terbayar' ? 'success' : 'error'"
                                   variant="outlined"
                                   label
                    >
                  {{ query.status }}
                </VChip></span>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VCardItem>
          <VDivider />
          <VCardItem>
            <VDataTableServer
              v-model:items-per-page="itemPerPage"
              v-model:page="page"
              :items-length="totalItems"
              :loading="loading"
              loading-text="Loading..."
              :headers="detailTagihanHeader"
              :items="detailTagihanItem"
              @update:options="loadItem(page, itemPerPage)"
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
