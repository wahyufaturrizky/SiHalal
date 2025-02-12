<script setup lang="ts">
const route = useRoute<"">();
const router = useRouter();

const tabs = ref("1");
const submissionId = route.params?.id;
const store = useMyTabEditRegulerStore();
const { bahan, produk, produkAllBahan, bahanCheck } = storeToRefs(store);

onMounted(async () => {
  await store.getProduct(submissionId);
  await store.getBahan(submissionId);
  store.isAllBahanSelected();
  store.isBahan();
  tabs.value = route.query?.tab ? String(route.query.tab) : "1";
});
</script>

<template>
  <VContainer>
    <div
      class="d-flex align-center cursor-pointer"
      @click="
        router.push(
          `/sh-domestic/submission/self-declare-mandiri/${submissionId}`
        )
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
            <PengajuanMain
              :hide-kode-fasilitasi="true"
              :hide-alert-kode-unik="true"
              :hide-on-search-fasilitator-function="true"
            />
          </VTabsWindowItem>
          <VTabsWindowItem value="3">
            <PabrikOutletMain />
          </VTabsWindowItem>
          <VTabsWindowItem value="4">
            <BahanMain :hide-verifikasi-pendamping="true" />
          </VTabsWindowItem>
          <VTabsWindowItem value="5">
            <ProdukMain />
          </VTabsWindowItem>
          <VTabsWindowItem value="6">
            <EditProsesProdukHalalSelfDeclareSubmission
              :hide-chip-status="true"
            />
          </VTabsWindowItem>
          <VTabsWindowItem value="7">
            <EditPernyataanSelfDeclareSubmision />
          </VTabsWindowItem>
        </VTabsWindow>
      </VCol>
    </VRow>
  </VContainer>
</template>
