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
  { title: "Download Invoice", key: "invoice_url" },

  // { title: "Download Bukti Bayar", key: "bukti_url" },
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

    if (response.code != 2000) return;

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
    console.log("jatuh_tempo = ", filter.value.tgl_jatuh_tempo);

    loading.value = true;

    const params = {
      page,
      size,
    };

    if (filter.value?.nama_pengajuan)
      params.nama_pengajuan = filter.value.nama_pengajuan;

    if (filter.value?.status) params.status = filter.value?.status;

    if (filter.value?.tgl_jatuh_tempo) {
      params.start_tgl_jatuh_tempo = filter.value?.tgl_jatuh_tempo[0];
      params.end_tgl_jatuh_tempo = filter.value?.tgl_jatuh_tempo[1];
    }

    const response = await $api("/facilitate/finance/invoice", {
      method: "get",
      params,
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

const downloadRekap = async (page: number, size: number) => {
  try {
    loading.value = true;

    const body = {
      page,
      size,
    };

    // if (filter.value?.nama_pengajuan) {
    //   params["nama_pengajuan"] = filter.value.nama_pengajuan;
    // }

    // if (filter.value?.tgl_jatuh_tempo) {
    //   params["start_tgl_jatuh_tempo"] = filter.value?.tgl_jatuh_tempo[0];
    //   params["end_tgl_jatuh_tempo"] = filter.value?.tgl_jatuh_tempo[1];
    // }

    if (filter.value?.status) body.status = filter.value?.status;

    const response: any = await $api("/facilitate/finance/download-rekap", {
      method: "post",
      body,
    });

    const url = URL.createObjectURL(response);

    // Create a temporary <a> tag to trigger the download
    const a = document.createElement("a");

    a.href = url;
    a.download = `excel-rekap-${new Date()}.xlsx`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    loadItem(page, size);
  } catch (err: any) {
    useSnackbar().sendSnackbar(err.data || "Ada kesalahan", "error");
    console.log(err);
  }
};

onMounted(async () => {
  await getStatusBayar();
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h1 style="font-size: 32px">Bukti Bayar Fasilitator</h1>
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
              Daftar Lunas Invoice Fasilitator
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <!--
              <VCol cols="3">
              <Vuepicdatepicker
              auto-apply
              model-type="dd/MM/yyyy"
              :enable-time-picker="false"
              :teleport="true"
              range
              clearable
              v-model:model-value="filter.tgl_tagihan"
              @update:model-value="loadItem(page, itemPerPage)"
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
            -->
            <VCol cols="3">
              <Vuepicdatepicker
                v-model:model-value="filter.tgl_jatuh_tempo"
                :teleport="true"
                :enable-time-picker="false"
                auto-apply
                model-type="dd/MM/yyyy"
                range
                :clearable="true"
                @update:model-value="loadItem(page, itemPerPage)"
              >
                <template #trigger>
                  <VTextField
                    v-model:model-value="filter.tgl_jatuh_tempo"
                    label="Due Date"
                    density="compact"
                    disabled
                    prepend-inner-icon="fa-calendar"
                  />
                </template>
              </Vuepicdatepicker>
            </VCol>
            <VCol cols="3">
              <VSelect
                v-model="filter.status"
                placeholder="Status"
                density="compact"
                item-value="code"
                item-title="name"
                :items="statusBayar"
                @update:model-value="loadItem(page, itemPerPage)"
              />
            </VCol>
            <VCol cols="6" style="display: flex; justify-content: end">
              <VBtn
                variant="flat"
                append-icon="fa-download"
                @click="downloadRekap(page, itemPerPage)"
              >
                Download Rekap
              </VBtn>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VDataTableServer
                disable-sort
                v-model:items-per-page="itemPerPage"
                v-model:page="page"
                :items-per-page-options="[10, 25, 50, 100]"
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
                <template #item.invoice_url="{ item }">
                  <VIcon
                    color="primary"
                    icon="fa-download"
                    :disabled="item.invoice_url == false"
                    @click="
                      downloadDocument((item as any).invoice_url, 'INVOICE')
                    "
                  />
                </template>
                <!--
                  <template #item.bukti_url="{ item }">
                  <VIcon
                  color="primary"
                  icon="fa-download"
                  :disabled="item.bukti_url == false"
                  @click="
                  downloadDocument((item as any).bukti_url, 'FILE')
                  "
                  ></VIcon>
                  </template>
                -->
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
