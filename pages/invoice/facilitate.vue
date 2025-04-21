<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "index" },
  { title: "No Invoice", value: "no_invoice" },
  { title: "No VA", value: "va" },
  { title: "Tanggal Tagihan", value: "tanggal_tagihan" },
  { title: "Nama Fasilitasi", value: "nama_program" },
  { title: "Jatuh Tempo", value: "tanggal_jatuh_tempo" },
  { title: "Jumlah Tagihan", value: "jumlah_tagihan", align: "right" },
  { title: "Status", value: "status" },
  { title: "File Invoice", value: "invoice_url" },
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

    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      return;
    }
    items.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};
const download = async () => {
  await downloadDocument("carabayar_sample_cara_bayar_rshln (1).pdf");
};
// carabayar_sample_cara_bayar_rshln (1).pdf
const navigateAction = (id: string) => {
  navigateTo(`/facilitator/verifikasi/${id}`);
};
const handleInvoice = async (fileName: string, type: string, id: string) => {
  if (fileName == "") {
    const response = await $api(`/certificate/regenerate`, {
      method: "post",
      body: {
        document_type: "invoice-fasilitator",
        ref_id: id,
      },
    });
    if (response) {
      fileName = response.filename;
    }
  }
  return await downloadDocument(fileName, type);
};
</script>
<template>
  <VRow>
    <VCol cols="12">
      <h1 style="font-size: 32px">Invoice Fasilitasi</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard style="padding: 1.5svw">
        <VCardTitle>
          <VRow>
            <VCol
              cols="6"
              style="display: flex; align-items: center"
              class="text-h4 font-weight-bold"
            >
              Daftar Invoice Fasilitasi
            </VCol>
            <VCol cols="6" style="display: flex; justify-content: end"
              ><VBtn variant="flat" append-icon="fa-download" @click="download"
                >Download Cara Pembayaran</VBtn
              ></VCol
            >
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VDataTable
            disable-sort
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
            <template #item.jumlah_tagihan="{ item }">
              {{ formatToIDR(item.jumlah_tagihan) }}
            </template>
            <template #item.tanggal_tagihan="{ item }">
              {{
                new Date(item.tanggal_tagihan) != "Invalid Date"
                  ? formatDateIntl(new Date(item.tanggal_tagihan))
                  : ""
              }}
            </template>
            <template #item.tanggal_jatuh_tempo="{ item }">
              {{
                new Date(item.tanggal_jatuh_tempo) != "Invalid Date"
                  ? formatDateIntl(new Date(item.tanggal_jatuh_tempo))
                  : ""
              }}
            </template>
            <template #item.invoice_url="{ item }">
              <VBtn
                variant="text"
                icon
                @click="handleInvoice(item.invoice_url, 'INVOICE', item.id)"
              >
                <VIcon>fa-file</VIcon>
              </VBtn>
            </template>
          </VDataTable>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
