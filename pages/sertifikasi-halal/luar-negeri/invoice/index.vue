<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);
const tableHeader = [
  { title: "No", value: "index" },
  { title: `${t("shln-invoice.invoice-list-title")}`, value: "no" },
  { title: `${t("shln-invoice.invoice-list-tglinv")}`, value: "date" },
  { title: `${t("shln-invoice.invoice-list-noreg")}`, value: "no_daftar" },
  { title: `${t("shln-invoice.invoice-list-nova")}`, value: "va" },
  {
    title: `${t("shln-invoice.invoice-list-importir")}`,
    value: "importer_name",
  },
  { title: `${t("shln-invoice.invoice-list-duedate")}`, value: "due_date" },
  {
    title: `${t("shln-invoice.invoice-list-amount")}`,
    value: "amount",
    align: "right",
  },
  { title: `${t("shln-invoice.invoice-list-status")}`, value: "status" },
  { title: `${t("shln-invoice.invoice-list-invfile")}`, value: "invoice" },
];

// const items = [
//   {
//     invoice_no: "xx",
//     invoice_date: "xx",
//     registration_no: "xx",
//     payment_code: "xx",
//     importer_name: "xx",
//     due_date: "xx",
//     amount: "xx",
//     notes: "xx",
//     status: "xx",
//     invoice: "xx",
//   },
// ];

const items = ref([]);
const searchQuery = ref("");
const loadItem = async (page: number, size: number, keyword: string = "") => {
  try {
    loading.value = true;

    const response = await $api("/shln/invoice", {
      method: "get",
      params: {
        page,
        size,
        keyword,
      },
    });
    items.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};
const debouncedFetch = debounce(loadItem, 500);

const handleInput = () => {
  debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
};
const statusInvoice = {
  SB001: { color: "warning", desc: "Menunggu Pembayaran" },
  SB002: { color: "warning", desc: "Kurang Bayar" },
  SB003: { color: "warning", desc: "Lebih Bayar" },
  SB004: { color: "success", desc: "Lunas" },
  SB005: { color: "warning", desc: "Konfirmasi Pembayaran" },
  default: { color: "error", desc: "No Status" },
};
</script>
<template>
  <VRow>
    <VCol cols="12">
      <h1 style="font-size: 32px">
        {{ t("shln-invoice.invoice-list-title") }}
      </h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle class="pa-5">
          <VRow>
            <VCol cols="6">
              <div class="text-h4 font-weight-bold">
                {{ t("shln-invoice.invoice-list-subtitle") }}
              </div>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow class="mt-5">
            <VCol cols="8"
              ><VTextField
                v-model="searchQuery"
                append-inner-icon="mdi-magnify"
                :label="t(`shln-invoice.invoice-list-cari`)"
                @input="handleInput"
              ></VTextField
            ></VCol>
            <VCol cols="4" style="display: flex; justify-content: end"
              ><VBtn
                append-icon="fa-download"
                @click="
                  downloadDocument(
                    'carabayar_shln_sample_cara_bayar_rshln (2).pdf'
                  )
                "
                >{{ t("shln-invoice.invoice-list-downloadpaymentinst") }}</VBtn
              ></VCol
            >
          </VRow>
          <VRow>
            <VCol cols="12">
              <VDataTableServer
                disable-sort
                v-model:items-per-page="itemPerPage"
                v-model:page="page"
                :items-length="totalItems"
                :loading="loading"
                loading-text="Loading..."
                @update:options="loadItem(page, itemPerPage, searchQuery)"
                :headers="tableHeader"
                :items="items"
              >
                <template #item.index="{ index }">
                  {{ index + 1 + (page - 1) * itemPerPage }}
                </template>
                <template #item.amount="{ item }">
                  {{ formatToIDR(item.amount) }}
                </template>
                <template #item.invoice="{ item }">
                  <VBtn
                    variant="text"
                    :disabled="!item.invoice_url"
                    @click="
                      item.invoice_url
                        ? downloadDocument(item.invoice_url, 'INVOICE')
                        : null
                    "
                  >
                    <v-icon>fa-file</v-icon>
                  </VBtn>
                </template>
                <template #item.date="{ item }">
                  {{
                    new Date(item.date) != "Invalid Date"
                      ? formatDateIntl(new Date(item.date))
                      : ""
                  }}
                </template>
                <template #item.due_date="{ item }">
                  {{
                    new Date(item.due_date) != "Invalid Date"
                      ? formatDateIntl(new Date(item.due_date))
                      : ""
                  }}
                </template>
                <template #item.status="{ item }">
                  <VChip
                    :color="statusInvoice[item.status].color"
                    style="
                      border-radius: 10px;
                      background-color: #fef8e6;
                      color: #f6bc03;
                      outline: auto;
                    "
                    >{{ statusInvoice[item.status].desc }}</VChip
                  >
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
