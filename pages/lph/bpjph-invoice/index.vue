<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
const isLoading = ref<boolean>(false);
const tableItems = ref<any[]>([]);
const totalItems = ref<number>(0);
const currentPage = ref<number>(1);
const itemPerPage = ref<number>(10);

const tableHeaders: any[] = [
  { title: "No", value: "index" },
  { title: "No. Tagihan", value: "no_tagihan", nowrap: true },
  { title: "Tanggal", value: "tanggal", nowrap: true },
  { title: "Total", value: "total", nowrap: true },
  { title: "Status", value: "status", nowrap: true },
  { title: "Bukti Bayar", value: "bukti_url", nowrap: true },
  { title: "Invoice", value: "invoice_url", nowrap: true },
];

const loadItem = async () => {
  isLoading.value = true;
  try {
    const response: any = await $api("/reguler/lph/bpjph-bill/list", {
      method: "get",
      params: {
        page: currentPage.value,
        size: itemPerPage.value,
      },
    } as any);

    if (response?.code === 2000) {
      tableItems.value = response?.data;
      currentPage.value = response?.current_page;
      totalItems.value = response.total_item;
    } else {
      tableItems.value = [];
      currentPage.value = 1;
      totalItems.value = 0;
    }
    isLoading.value = false;

    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    isLoading.value = false;
  }
};

useAsyncData("bpjph-bill-list", async () => await loadItem(), {
  server: false,
  watch: [currentPage, itemPerPage],
});

const setChipColor = (status: string) => {
  switch (status) {
    case "Pengajuan":
      return "primary-chip";
    default:
      return "success-chip";
  }
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace(/^Rp\s?/gi, "");
};

const handleDownload = async (filename: string, param: string) => {
  return await downloadDocument(filename, param);
};
</script>

<template>
  <VRow no-gutters>
    <VCol>
      <h1 style="font-size: 32px">Daftar Tagihan ke BPJPH</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="text-h4 font-weight-bold">Daftar Tagihan</div>
        </VCardTitle>
        <VCardText>
          <VDataTableServer
            v-model:items-per-page="itemPerPage"
            v-model:page="currentPage"
            :items-per-page-options="[10, 25, 50, 100]"
            class="bill-table border rounded mt-5"
            :headers="tableHeaders"
            :items="tableItems"
            :items-length="totalItems"
            :loading="isLoading"
            :hide-default-footer="tableItems.length === 0"
          >
            <template #no-data>
              <div class="w-full mt-2">
                <div class="pt-2" style="justify-items: center">
                  <img src="~/assets/images/empty-data.png" alt="empty_data" />
                  <div class="pt-2 pb-2 font-weight-bold">Data Kosong</div>
                </div>
              </div>
            </template>
            <template #item.index="{ index }">
              {{ index + 1 + (currentPage - 1) * itemPerPage }}
            </template>
            <template #item.tanggal="{ item }">
              {{ formatDateId(item.tanggal) }}
            </template>
            <template #item.total="{ item }">
              {{ item.total ? formatNumber(item.total) : 0 }}
            </template>
            <template #item.status="{ item }">
              <VChip variant="outlined" :class="setChipColor(item.status)">
                <span>
                  {{ item.status }}
                </span>
              </VChip>
            </template>
            <template #item.bukti_url="{ item }">
              <VBtn
                class="px-3 ms-2 d-flex align-center"
                :color="item.bukti_url ? 'primary' : '#A09BA1'"
                variant="flat"
              >
                <VIcon
                  icon="fa-download"
                  @click="
                    item.bukti_url
                      ? handleDownload(item.bukti_url, 'FILES')
                      : null
                  "
                />
              </VBtn>
            </template>
            <template #item.invoice_url="{ item }">
              <VBtn
                class="px-3 ms-2 d-flex align-center"
                :color="item.invoice_url ? 'primary' : '#A09BA1'"
                variant="flat"
              >
                <VIcon
                  icon="fa-eye"
                  @click="
                    item.invoice_url
                      ? handleDownload(item.invoice_url, 'INVOICE')
                      : null
                  "
                />
              </VBtn>
            </template>
          </VDataTableServer>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
.primary-chip {
  border: 1px solid #652672 !important;
  border-radius: 8px;
  background-color: #f0e9f1;

  span {
    color: #652672;
  }
}

.success-chip {
  border: 1px solid #49a84c !important;
  border-radius: 8px;
  background-color: #edf6ed;

  span {
    color: #49a84c;
  }
}
</style>
