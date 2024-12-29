<script setup lang="ts">
import KomiteFatwaLayout from "@/layouts/komiteFatwaLayout.vue";
import { VDataTableServer } from "vuetify/components";

const items = ref<
  {
    id: string;
    nama_pu: string;
    alamat: string;
    jenis_produk: string;
    merek_dagang: string;
    no_daftar: string;
    tgl_daftar: string;
  }[]
>([]);

const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nomor Daftar", value: "no_daftar" },
  { title: "Tanggal Daftar", value: "tgl_daftar" },
  { title: "Nama PU", value: "nama_pu" },
  { title: "Alamat", value: "alamat" },
  { title: "Jenis Produk", value: "jenis_produk" },
  { title: "Merek Dagang", value: "merek_dagang" },
];

const selectedFilterPermohonan = ref([]);
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const loadingAll = ref(true);
const page = ref(1);

const loadItem = async (page: number, size: number) => {
  try {
    loading.value = true;

    const response: any = await $api("/self-declare/komite-fatwa/inquiry-1", {
      method: "get",
      params: {
        page,
        size,
      },
    });

    if (response.code === 2000) {
      console.log(response.data, "ini response data");
      items.value = response.data || [];
      totalItems.value = response.total_item || 0;
      loading.value = false;
      console.log("Total Items:", totalItems.value);

      return response;
    } else {
      loading.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const permohonanItems = [
  { name: "X", value: 1 },
  { name: "Y", value: 2 },
  { name: "Z", value: 3 },
];

const selectedFilterStatusPermhonan = ref([]);

const statusPermhonanItems = [
  { name: "X", value: 1 },
  { name: "Y", value: 2 },
  { name: "Z", value: 3 },
];

const selectedFilterWilayah = ref([]);

const wilayahItems = [
  { name: "X", value: 1 },
  { name: "Y", value: 2 },
  { name: "Z", value: 3 },
];

const selectedFilterKabupaten = ref([]);

const kabupatenItems = [
  { name: "X", value: 1 },
  { name: "Y", value: 2 },
  { name: "Z", value: 3 },
];

const selectedFilterFasilitaas = ref([]);

const fasilitasItems = [
  { name: "X", value: 1 },
  { name: "Y", value: 2 },
  { name: "Z", value: 3 },
];

const selectedFilterNameFasilitator = ref([]);

const nameFasilitatorItems = [
  { name: "X", value: 1 },
  { name: "Y", value: 2 },
  { name: "Z", value: 3 },
];

const selectedFilterLayer = ref([]);

const layerItems = [
  { name: "X", value: 1 },
  { name: "Y", value: 2 },
  { name: "Z", value: 3 },
];
const findProdukByCode = (code) => {
  const produk = filterProduk.value.find((item) => item.code == code);
  if (produk) {
    return produk.name;
  }
  return code;
};
const filterProduk = ref([]);
onMounted(async () => {
  const response4: any = await $api(
    "/self-declare/komite-fatwa/proses-sidang/filter-produk",
    {
      method: "get",
    }
  );
  filterProduk.value = response4.data || [];
});
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
                    style="inline-size: 100%"
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
                <template #item.jenis_produk="{ item }">
                  {{ findProdukByCode(item.jenis_produk) }}
                </template>
                <template #item.tgl_daftar="{ item }">
                  {{ formatToISOString(item.tgl_daftar) }}
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </template>
  </KomiteFatwaLayout>
</template>

<style scoped></style>
