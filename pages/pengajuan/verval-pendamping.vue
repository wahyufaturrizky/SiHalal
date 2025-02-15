<script setup lang="ts">
const loadingAll = ref(true);
const searchQuery = ref("");
const page = ref(1);
const size = ref(10);

const defaultStatus = { color: "error", desc: "Unknown Status" };

const statusItem: any = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF320: { color: "success", desc: "Code Issued" },
    OF11: { color: "success", desc: "Verification" },
    OF50: { color: "success", desc: "Dikirim ke LPH" },
    OF300: { color: "success", desc: "Halal Certified Issued" },
    OF285: { color: "success", desc: "Dikembalikan Oleh Fatwa" },
    OF74: { color: "success", desc: "Sent to Komite Fatwa" },
    OF280: { color: "success", desc: "Dikembalikan Ke PU" },
    OF100: { color: "success", desc: "Selesai Sidang Fatwa" },
    OF120: { color: "success", desc: "Certificate Issued" },
    OF900: { color: "error", desc: "Dibatalkan" },
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const headers = [
  { title: "No", value: "no" },
  { title: "No. Daftar", key: "no_daftar", nowrap: true },
  { title: "Tanggal Daftar", key: "tgl_daftar", nowrap: true },
  { title: "Nama PU", key: "nama_pu", nowrap: true },
  { title: "Alamat", key: "alamat_pu", nowrap: true },
  { title: "Jenis Usaha", key: "jenis_usaha", nowrap: true },
  { title: "Skala Usaha", key: "skala_usaha", nowrap: true },
  { title: "Merk Dagang", key: "merek_dagang", nowrap: true },
  { title: "Status", key: "status", nowrap: true },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const items = ref([]);

const loadItem = async (page: number, size: number, search: string) => {
  try {
    const response: any = await $api("self-declare/proses-verval/list", {
      method: "GET",
      params: { page, size, search, status: "OF10", channel_id: "CH003" },
    });

    if (response.code === 2000) {
      items.value = response.data;
      return response;
    } else {
      useSnackbar().sendSnackbar(response.message, "error");
    }
  } catch (e) {
    useSnackbar().sendSnackbar("Terjadi Kesalahan ", "error");
  }
};

const debouncedFetch = debounce(loadItem, 500);

const handleInput = () =>
  debouncedFetch(page.value, size.value, searchQuery.value);

onMounted(async () => {
  const res = await Promise.all([
    loadItem(page.value, size.value, searchQuery.value),
  ]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h1 style="font-size: 32px">Proses Verval</h1>
    </VCol>
  </VRow>
  <VRow v-if="!loadingAll">
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <div class="text-h4 font-weight-bold">Data Proses Verval</div>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="7">
              <VTextField
                v-model="searchQuery"
                density="compact"
                placeholder="Cari Tagihan"
                append-inner-icon="ri-search-line"
                style="max-inline-size: 100%"
                @input="handleInput"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VDataTable
                v-model:items-per-page="size"
                v-model:page="page"
                :headers="headers"
                :items="items"
                item-value="no"
                class="elevation-1"
                @update:options="loadItem(page, size, searchQuery)"
              >
                <template #[`item.no`]="{ index }">
                  <span>{{ index + 1 }}</span>
                </template>

                <template #[`item.status`]="{ item, index }">
                  <div class="d-flex">
                    <VChip
                      :key="index"
                      :color="statusItem[(item as any).status_code].color"
                      class="ma-1"
                    >
                      {{ statusItem[(item as any).status_code].desc }}
                    </VChip>
                  </div>
                </template>
                <template #item.action="{ item }">
                  <VIcon
                    color="primary"
                    style="cursor: pointer"
                    class="ic-center"
                    @click="
                      navigateTo(
                        `/pengajuan/detail-verval/${(item as any).id_reg}`
                      ) as any
                    "
                  >
                    ri-arrow-right-line
                  </VIcon>
                </template>
              </VDataTable>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>

  <VSkeletonLoader type="card" v-else />
</template>
