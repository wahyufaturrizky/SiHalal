<!-- eslint-disable regex/invalid -->
<script setup lang="ts">
const router = useRouter();
const dataTable = ref<any[]>([]);
const loading = ref<boolean>(false);
const page = ref<number>(1);
const size = ref<number>(10);
const searchQuery = ref<string>("");
const totalItems = ref<number>(0);

const invoiceHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Nomor Daftar", value: "no_daftar", nowrap: true },
  { title: "Tanggal Tagihan", value: "tanggal_tagihan", nowrap: true },
  { title: "No Ref", value: "no_tagihan", nowrap: true },
  { title: "Nama PU", value: "nama_pu", nowrap: true },
  { title: "Tanggal Dikirim Oleh BPJPH", value: "tgl_dikirim", nowrap: true },
  { title: "Jenis Transaksi", value: "jenis_transaksi", nowrap: true },
  { title: "Jatuh Tempo", value: "tanggal_jatuh_tempo", nowrap: true },
  { title: "Jumlah Tagihan", value: "jumlah_tagihan", nowrap: true },
  { title: "Tanggal Bayar", value: "tanggal_bayar", nowrap: true },
  { title: "Action", value: "actions", align: "center" },
];

const invoiceData = [
  {
    billNumber: "SH2024-225-29480",
    billDate: "22/08/2024",
    refNumber: "SH2024-225-29480",
    businessName: "Dapoer Boenda",
    sentDate: "22/08/2024 06:38 (500 hari)",
    trxType: "Sertifikasi Halal",
    dueDate: "22/08/2024",
    totalBill: "Rp 200,000",
    payDate: "22/08/2024",
  },
  {
    billNumber: "SH2024-225-29480",
    billDate: "22/08/2024",
    refNumber: "SH2024-225-29480",
    businessName: "Dapoer Boenda",
    sentDate: "22/08/2024 06:38 (500 hari)",
    trxType: "Sertifikasi Halal",
    dueDate: "22/08/2024",
    totalBill: "Rp 200,000",
    payDate: "22/08/2024",
  },
];

const loadItem = async (
  pageNumber: number,
  sizeData: number,
  search: string = "",
  path: string
) => {
  try {
    const response: any = await $api("/reguler/payment", {
      method: "get",
      params: {
        page: pageNumber,
        size: sizeData,
        keyword: search,
        url: path,
      },
    });

    if (response?.code === 2000) {
      totalItems.value = response.total_item;
      dataTable.value = response?.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleInput = (e: any) => {
  loading.value = true;
  debounce(
    loadItem(page.value, size.value, e.target.value, LIST_INFORMASI_PEMBAYARAN),
    500
  );
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  loadItem(
    page.value,
    size.value,
    searchQuery.value,
    LIST_INFORMASI_PEMBAYARAN
  );
  loading.value = false;
});
watch([page, size], () => {
  loadItem(
    page.value,
    size.value,
    searchQuery.value,
    LIST_INFORMASI_PEMBAYARAN
  );
});
</script>

<template>
  <!--
    <div
    class="d-flex align-center cursor-pointer"
    @click="router.go(-1)"
    >
    <VIcon
    icon="mdi-chevron-left"
    size="40px"
    color="primary"
    />
    <div class="text-primary">
    Kembali
    </div>
    </div>
  -->
  <VRow no-gutters>
    <VCol>
      <h1 style="font-size: 32px">Informasi Pembayaran</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="text-h4 font-weight-bold">
            Daftar Invoice Yang Sudah Dibayar
          </div>
        </VCardTitle>
        <VCardText>
          <div>
            <VTextField
              v-model="searchQuery"
              placeholder="Cari Nama Pengajuan"
              density="compact"
              append-inner-icon="ri-search-line"
              style="max-inline-size: 100%"
              @input="handleInput"
            />
          </div>
          <VDataTableServer
            v-model:items-per-page="size"
            v-model:page="page"
            disable-sort
            :items-per-page-options="[10, 25, 50, 100]"
            :items-length="totalItems"
            :loading="loading"
            class="border rounded"
            :headers="invoiceHeader"
            :items="dataTable"
            :hide-default-footer="dataTable.length === 0"
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
              {{ index + 1 + (page - 1) * size }}
            </template>
            <template #item.tanggal_tagihan="{ item }">
              {{
                item.tanggal_tagihan ? formatDateId(item.tanggal_tagihan) : "-"
              }}
            </template>
            <template #item.tanggal_jatuh_tempo="{ item }">
              {{
                item.tanggal_jatuh_tempo
                  ? formatDateId(item.tanggal_jatuh_tempo)
                  : "-"
              }}
            </template>
            <template #item.tanggal_bayar="{ item }">
              {{ item.tanggal_bayar ? formatDateId(item.tanggal_bayar) : "-" }}
            </template>
            <template #item.actions="{ item }">
              <VIcon
                icon="mdi-arrow-right"
                color="primary"
                size="x-large"
                @click="router.push(`/reguler/payment-info/${item.id_reg}`)"
              />
            </template>
          </VDataTableServer>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
