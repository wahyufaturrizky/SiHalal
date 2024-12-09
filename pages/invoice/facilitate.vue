<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "index" },
  { title: "No Tagihan", value: "code_fasilitasi" },
  { title: "Tanggal Tagihan", value: "tanggal_tagihan" },
  { title: "Nama Fasilitasi", value: "code_fasilitasi" },
  { title: "Jatuh Tempo", value: "tanggal_jatuh_tempo" },
  { title: "Jumlah Tagihan", value: "jumlah_tagihan" },
  { title: "Status", value: "code_fasilitasi" },
  { title: "File Invoice", value: "file" },
];

const defaultStatus = { color: "error", desc: "Unknown Status" };
const statusItem = new Proxy(
  {
    SB001: { color: "warning", desc: "Menunggu Pembayaran" },
    SB002: { color: "warning", desc: "Kurang Bayar" },
    SB003: { color: "warning", desc: "Lebih Bayar" },
    SB004: { color: "success", desc: "Lunas" },
    SB005: { color: "warning", desc: "Konfirmasi Pembayaran" },
    default: { color: "error", desc: "No Status" },
  },
  {
    get(target, prop) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const items = ref([]);
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);
const loadItem = async (page: number, size: number) => {
  try {
    loading.value = true;

    const response = await $api("/facilitate/invoice", {
      method: "get",
      params: {
        page,
        size,
      },
    });

    if (response.code != 2000) items.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};
const navigateAction = (id: string) => {
  navigateTo(`/facilitator/verifikasi/${id}`);
};
</script>
<template>
  <VRow
    ><VCol cols="12"><h2>Invoice Fasilitasi</h2></VCol></VRow
  >
  <VRow>
    <VCol>
      <VCard style="padding: 1.5svw">
        <VCardTitle>
          <VRow>
            <VCol cols="6" style="display: flex; align-items: center"
              >Daftar Invoice Fasilitasi</VCol
            >
            <VCol cols="6" style="display: flex; justify-content: end"
              ><VBtn variant="flat" append-icon="fa-download"
                >Download Cara Pembayaran</VBtn
              ></VCol
            >
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VDataTable
            v-model:items-per-page="itemPerPage"
            v-model:page="page"
            :headers="tableHeader"
            :items-length="totalItems"
            :loading="loading"
            loading-text="Loading..."
            :items="items"
            @update:options="loadItem(page, itemPerPage)"
          >
            <template #item.index="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.status="{ item }">
              <VChip
                :color="statusItem[item.status].color"
                text-color="white"
                small
              >
                {{ statusItem[item.status].desc }}
              </VChip>
            </template>
            <template #item.action="{ item }">
              <VBtn variant="text" icon @click="navigateAction(item.id)">
                <VIcon>mdi-chevron-right</VIcon>
              </VBtn>
            </template>
          </VDataTable>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
