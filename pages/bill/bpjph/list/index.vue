<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const tableHeaders: any[] = [
  { title: "No", key: "no", sortable: false },
  {
    title: t("task-force.tagihan-bpjph-table-key-tagihan"),
    key: "nomor",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-table-key-tanggal"),
    key: "tanggal",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-table-key-total"),
    key: "total_harga",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-table-key-status"),
    key: "status_payment",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-table-key-invoice"),
    key: "invoice",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-table-key-bukti-bayar"),
    key: "file_bukti_transfer",
    nowrap: true,
  },
];

const tableItems = ref<Array[]>([]);
const currentPage = ref(1);
const itemPerPage = ref(10);
const totalItems = ref(0);
const selectedItem = ref([]);
const isLoading = ref(false);
const tableType = ref("");

const handleLoadList = async () => {
  try {
    isLoading.value = true;
    const response: any = await $api("/bill/bpjph/list", {
      method: "get",
      query: {
        page: currentPage.value,
        size: itemPerPage.value,
      },
    } as any);

    if (response.code === 2000) {
      if (response.data !== null) {
        tableItems.value = response.data;
        currentPage.value = response.current_page;
        totalItems.value = response.total_item;
      } else {
        tableItems.value = [];
        currentPage.value = 1;
        totalItems.value = 0;
      }
      isLoading.value = false;

      return response;
    } else {
      tableItems.value = [];
      currentPage.value = 1;
      totalItems.value = 0;
    }
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.error(error);
  }
};

// const refresh = async () => {
//   await handleLoadList();
// };

onMounted(async () => {
  // await Promise.allSetled([
  //   handleLoadList(),
  // ])
});

const getChipColor = (status: string) => {
  if (status === "Terbayar") return "success";

  return "primary";
};

const unduhFile = async (link: string, type: string) => {
  await downloadDocument(link, type);
};
</script>

<template>
  <VRow>
    <VCol>
      <h2 style="font-size: 32px">
        {{ t("task-force.tagihan-bpjph-title") }}
      </h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard class="w-100 py-3">
        <VCardTitle
          class="d-flex justify-space-between align-center font-weight-bold text-h4"
        >
          <div>{{ t("task-force.tagihan-bpjph-subtitle") }}</div>
        </VCardTitle>
        <VCardItem>
          <VCard variant="outlined">
            <VDataTableServer
              disable-sort
              :items-per-page-options="[10, 25, 50, 100]"
              v-model:items-per-page="itemPerPage"
              v-model:page="currentPage"
              :items-length="totalItems"
              class="custom-table"
              :headers="tableHeaders"
              :items="tableItems"
              :loading="isLoading"
              :hide-default-footer="tableItems.length === 0"
              @update:options="handleLoadList(currentPage, itemPerPage)"
            >
              <template #no-data>
                <VCard variant="" class="w-full mt-7 mb-5">
                  <div class="pt-2" style="justify-items: center">
                    <img
                      src="~/assets/images/empty-data.png"
                      alt="empty_data"
                    />
                    <div class="pt-2 pb-2 font-weight-bold">Data Kosong</div>
                  </div>
                </VCard>
              </template>
              <template #item.no="{ index }">
                {{ index + 1 + (currentPage - 1) * itemPerPage }}
              </template>
              <template #item.tanggal="{ item }">
                <label v-if="item.tanggal">
                  {{ formatDateIntl(new Date(item.tanggal)) }}
                </label>
              </template>
              <template #item.total_harga="{ item }">
                {{ formatCurrency(item.total_harga) }}
              </template>
              <template #item.invoice="{ item }">
                <div
                  style="
                    background-color: #652672;
                    width: 30px;
                    height: 30px;
                    border-radius: 8px;
                    place-content: center;
                    display: flex;
                    align-items: center;
                  "
                >
                  <VIcon
                    icon="fa-eye"
                    color="white"
                    @click="() => unduhFile(item.invoice, 'INVOICE')"
                  />
                </div>
              </template>
              <template #item.file_bukti_transfer="{ item }">
                <div
                  style="
                    background-color: #652672;
                    width: 30px;
                    height: 30px;
                    border-radius: 8px;
                    place-content: center;
                    display: flex;
                    align-items: center;
                  "
                >
                  <VIcon
                    icon="fa-eye"
                    color="white"
                    :disabled="!item.file_bukti_transfer"
                    @click="() => unduhFile(item.file_bukti_transfer, 'FILES')"
                  />
                </div>
              </template>
              <template #item.status_payment="{ item }">
                <div class="d-flex flex-wrap">
                  <VChip
                    :key="item.id"
                    :color="getChipColor(item.status_payment)"
                    label
                    class="ma-1"
                  >
                    {{ item.status_payment }}
                  </VChip>
                </div>
              </template>
              <template #item.actions="{ item }">
                <div class="d-flex gap-1">
                  <DeleteBill />
                </div>
              </template>
            </VDataTableServer>
          </VCard>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
:deep(.v-data-table.custom-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      position: sticky;
      inset-inline-end: 0;
    }

    tbody > tr > td:last-of-type {
      position: sticky;
      background: white;
      inset-inline-end: 0;
      justify-items: center;
    }
  }
}
</style>
