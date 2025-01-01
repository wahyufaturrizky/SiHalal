<script setup lang="ts">
import Vuepicdatepicker from "@/components/Vuepicdatepicker.client.vue";

const tableHeader = [
  { title: "No", key: "no" },
  { title: "Kode Fasilitasi", key: "code_fasilitasi" },
  { title: "Nama Fasilitasi", key: "nama_program" },
  { title: "Jenis Transaksi", key: "jenis_transaksi" },
  { title: "Jumlah Tagihan", key: "jumlah_tagihan" },
  { title: "Tanggal Tagihan", key: "tanggal_tagihan" },
  { title: "Jatuh Tempo", key: "tanggal_jatuh_tempo" },
  { title: "Status", key: "status" },
  { title: "Tanggal Bayar", key: "tanggal_bayar" },
  { title: "Download Invoice", key: "invoice_uri" },
  { title: "Download Bukti Bayar", key: "bukti_url" },
];

const defaultStatus = { color: "error", desc: "Unknown Status" };
const statusFinance = new Proxy(
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
const statusBayar = ref([]);
const getStatusBayar = async () => {
  try {
    const response = await $api("/master/status-bayar", {
      method: "get",
    });
    if (response.code != 2000) {
      return;
    }
    statusBayar.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const items = ref([]);
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);
const loadItem = async (page: number, size: number) => {
  try {
    loading.value = true;

    const response = await $api("/facilitate/finance/invoice", {
      method: "get",
      params: {
        page,
        size,
        nama_pengajuan: filter.value.nama_pengajuan,
        tgl_jatuh_tempo: filter.value.tgl_jatuh_tempo,
        tgl_tagihan: filter.value.tgl_tagihan,
        status: filter.value.status,
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
const filter = ref({
  nama_pengajuan: "",
  tgl_tagihan: "",
  tgl_jatuh_tempo: "",
  status: null,
});
const navigateAction = (id: string) => {
  navigateTo(`/facilitator/verifikasi/${id}`);
};
onMounted(async () => {
  await getStatusBayar();
});
</script>
<template>
  <VRow
    ><VCol cols="12"><h2>Bukti Bayar Fasilitator</h2></VCol></VRow
  >
  <VRow>
    <VCol>
      <VCard style="padding: 1.5svw">
        <VCardTitle>
          <VRow>
            <VCol cols="6" style="display: flex; align-items: center"
              >Daftar Lunas Invoice Fasilitator</VCol
            >
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3">
              <Vuepicdatepicker
                auto-apply
                model-type="dd-MM-yyyy"
                :enable-time-picker="false"
                :teleport="true"
                range
                clearable
                v-model:model-value="filter.tgl_tagihan"
                @change="loadItem(page, itemPerPage)"
              >
                <template #trigger>
                  <VTextField
                    label="Tanggal Tagihan"
                    density="compact"
                    disabled
                    prepend-inner-icon="fa-calendar"
                    v-model:model-value="filter.tgl_tagihan"
                  ></VTextField>
                </template>
              </Vuepicdatepicker>
            </VCol>
            <VCol cols="3">
              <Vuepicdatepicker
                :teleport="true"
                :enable-time-picker="false"
                auto-apply
                model-type="dd-MM-yyyy"
                range
                clearable
                v-model:model-value="filter.tgl_jatuh_tempo"
                @change="loadItem(page, itemPerPage)"
              >
                <template #trigger>
                  <VTextField
                    label="Due Date"
                    density="compact"
                    disabled
                    prepend-inner-icon="fa-calendar"
                    v-model:model-value="filter.tgl_jatuh_tempo"
                  ></VTextField>
                </template>
              </Vuepicdatepicker>
            </VCol>
            <VCol cols="3">
              <VSelect
                placeholder="Status"
                density="compact"
                item-value="code"
                item-title="name"
                v-model="filter.status"
                :items="statusBayar"
                v-on:update:model-value="loadItem(page, itemPerPage)"
              ></VSelect>
            </VCol>
            <VCol cols="3" style="display: flex; justify-content: end"
              ><VBtn variant="flat" append-icon="fa-download"
                >Download Rekap</VBtn
              ></VCol
            >
          </VRow>
          <VRow>
            <VCol cols="12">
              <VDataTableServer
                v-model:items-per-page="itemPerPage"
                v-model:page="page"
                :headers="tableHeader"
                :items-length="totalItems"
                :loading="loading"
                loading-text="Loading..."
                :items="items"
                @update:options="loadItem(page, itemPerPage)"
              >
                <template #item.no="{ index }">
                  {{ index + 1 + (page - 1) * itemPerPage }}
                </template>
                <template #item.status="{ item }">
                  <VChip
                    :color="statusFinance[item.status].color"
                    text-color="white"
                    small
                  >
                    {{ statusFinance[item.status].desc }}
                  </VChip>
                </template>
                <template #item.tanggal_bayar="{ item }">
                  {{
                    new Date(item.tanggal_bayar) != "Invalid Date"
                      ? formatDateIntl(new Date(item.tanggal_bayar))
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
                <template #item.tanggal_tagihan="{ item }">
                  {{
                    new Date(item.tanggal_tagihan) != "Invalid Date"
                      ? formatDateIntl(new Date(item.tanggal_tagihan))
                      : ""
                  }}
                </template>
                <template #item.invoice_uri="{ item }">
                  <VIcon icon="fa-download"></VIcon>
                </template>
                <template #item.bukti_url="{ item }">
                  <VIcon
                    icon="fa-download"
                    @click="
                      item.bukti_url != ''
                        ? downloadDocument(item.bukti_url)
                        : () => {}
                    "
                  ></VIcon>
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
