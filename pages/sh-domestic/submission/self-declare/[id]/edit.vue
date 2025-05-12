<script setup lang="ts">
const route = useRoute<"">();
const router = useRouter();

const tabs = ref("1");
const submissionId = route.params?.id;
const store = useMyTabEditRegulerStore();
const { bahan, produk, produkAllBahan, bahanCheck } = storeToRefs(store);
const selectedProductTypes = ref([])

const getSelectedProductTypes = async () => {
  try {
    const responseStatusPermohonan: any = await $api('/reguler/list', {
      method: 'get',
      query: {
        url: LIST_MENU_STATUS,
      },
    })

    const responseSelfDeclare: any = await $api('/self-declare/submission/list', {
      method: 'get',
      params: {
        status: 'OF1,OF280,OF285',
        channel_id: 'CH003',
      },
    });

    let data = []


    if (responseStatusPermohonan?.code === 2000) {
      data = [...responseStatusPermohonan?.data ]
    }

    if (responseStatusPermohonan?.code === 2000){
      data = [...data, responseSelfDeclare?.data]
    }

    if (data?.length > 0) {
      const getUniqueProductTypes = () => {
        const jenisProdukSet = new Set()

        data.forEach(item => {
          if (item.jenis_produk) {
            jenisProdukSet.add(item.jenis_produk)
          }
        })

        return Array.from(jenisProdukSet)
      }

      const uniqueProducts = getUniqueProductTypes()

      selectedProductTypes.value = uniqueProducts
    }

  } catch (err) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error');
  }
}

onMounted(async () => {
  await store.getProduct(submissionId);
  await store.getBahan(submissionId);
  store.isAllBahanSelected();
  store.isBahan();
  tabs.value = route.query?.tab ? String(route.query.tab) : "1";
  await getSelectedProductTypes()
});
</script>

<template>
  <VContainer>
    <div
      class="d-flex align-center cursor-pointer"
      @click="
        router.push(`/sh-domestic/submission/self-declare/${submissionId}`)
      "
    >
      <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
      <div class="text-primary">Kembali</div>
    </div>
    <VRow align="center">
      <VCol>
        <div class="text-h3 font-weight-bold">Ubah Pengajuan Self Declare</div>
      </VCol>
      <!-- <VCol class="d-flex justify-end">
        <VBtn color="primary" variant="flat" text="Simpan Perubahan" />
      </VCol> -->
    </VRow>

    <VRow>
      <VCol>
        <VTabs v-model="tabs" class="mb-10">
          <VTab value="1">Pelaku Usaha</VTab>
          <VTab value="2">Pengajuan</VTab>
          <VTab value="3">Pabrik & Outlet</VTab>
          <VTab value="4">Bahan</VTab>
          <VTab value="5" :disabled="!bahanCheck">Produk</VTab>
          <VTab :disabled="!produkAllBahan || !bahanCheck" value="6"
            >Proses Produk Halal</VTab
          >
          <VTab :disabled="!produkAllBahan || !bahanCheck" value="7"
            >Pernyataan</VTab
          >
        </VTabs>

        <VTabsWindow v-model="tabs">
          <VTabsWindowItem value="1">
            <PelakuUsahaMain />
          </VTabsWindowItem>
          <VTabsWindowItem value="2">
            <PengajuanMain :id-reg="submissionId" 
              :selectedProductTypes="selectedProductTypes"
            />
          </VTabsWindowItem>
          <VTabsWindowItem value="3">
            <PabrikOutletMain />
          </VTabsWindowItem>
          <VTabsWindowItem value="4">
            <BahanMain />
          </VTabsWindowItem>
          <VTabsWindowItem value="5">
            <ProdukMain />
          </VTabsWindowItem>
          <VTabsWindowItem value="6">
            <EditProsesProdukHalalSelfDeclareSubmission />
          </VTabsWindowItem>
          <VTabsWindowItem value="7">
            <EditPernyataanSelfDeclareSubmision />
          </VTabsWindowItem>
        </VTabsWindow>
      </VCol>
    </VRow>
  </VContainer>
</template>
