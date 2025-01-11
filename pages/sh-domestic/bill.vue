<!-- eslint-disable camelcase -->
<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useDisplay } from "vuetify";

const page = ref(1);
const size = ref(10);
const status = ref("");
const outDated = ref(null);
const searchQuery = ref("");
const data = ref<any[]>([]);
const lovStatus = ref<any[]>([]);
const loading = ref(false);
const totalItems = ref(0);

const headers = [
  { title: "No", key: "no" },
  { title: "No. Pembayaran", key: "no_payment", nowrap: true },
  { title: "No. Tagihan", key: "no_inv", nowrap: true },
  { title: "Tanggal Tagihan", key: "tgl_inv", nowrap: true },
  { title: "No. Ref", key: "no_ref", nowrap: true },
  { title: "Nama PU", key: "nama", nowrap: true },
  { title: "Jenis Transaksi", key: "jenis_transaksi", nowrap: true },
  { title: "Jatuh Tempo", key: "duedate", nowrap: true },
  { title: "Jumlah Tagihan", key: "total_inv", nowrap: true },
  { title: "Status", key: "status", nowrap: true },
  { title: "Catatan", key: "catatan", nowrap: true },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 400 : "90%";
});

// TODO -> BIKIN LOGIC BUAT SET CHIP COLOR
const getChipColor = (stats: string) => {
  if (stats === "Lunas") return "success";
  return "primary";
};

const loadItem = async (
  pageNumber: number,
  sizeData: number,
  statusData: string,
  jatuh_tempo,
  search: string
) => {
  try {
    let datePayload: any = null;
    let params = {
      page: pageNumber,
      size: sizeData,
      status: statusData,
      search,
    };
    if (outDated.value) {
      datePayload = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(outDated.value);
      params = {
        ...params,
        jatuh_tempo: datePayload,
      };
    }

    const response: any = await $api("/reguler/pelaku-usaha/list-bill", {
      method: "get",
      params,
    });

    if (response?.code === 2000) {
      response?.data?.map((item: any) => {
        item.typeAndTotal = [item?.jenis_usaha, item?.jumlah_produk];
      });
      totalItems.value = response.total_page;
      data.value = response.data;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    loading.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getListStatus = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/list-status", {
      method: "get",
    });

    if (response?.code === 2000) {
      lovStatus.value = [{ code: "", name: "Semua" }, ...response.data];
      loading.value = false;
      return response;
    } else {
      loading.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    loading.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const navigateToDetail = (id: string) => {
  navigateTo(`/lph/list-register/detail/${id}`);
};

const unduhFile = () => {
  window.open("/files/Cara Bayar.pdf", "_blank");
};

const handleInput = (e: any) => {
  debounce(
    loadItem(
      page.value,
      size.value,
      status.value,
      outDated.value,
      e.target.value
    ),
    500
  );
};

const downloadInvoice = async (item: any) => {
  if (item.file_inv) await downloadDocument(item.file_inv);
};

onMounted(async () => {
  loading.value = true;
  await Promise.all([
    loadItem(
      page.value,
      size.value,
      status.value,
      outDated.value,
      searchQuery.value
    ),
    getListStatus(),
  ]);
  loading.value = false;
});

watch([status, outDated, page], () => {
  loadItem(
    page.value,
    size.value,
    status.value,
    outDated.value,
    searchQuery.value
  );
});
</script>

<template>
  <div v-if="!loading">
    <VContainer>
      <!-- <KembaliButton class="pl-0" /> -->
      <div class="d-flex" style="justify-content: space-between">
        <h3 class="text-h3">Tagihan/Invoice</h3>
        <VBtn
          v-if="!loading"
          append-icon="fa-download"
          variant="flat"
          @click="() => unduhFile()"
        >
          Unduh Cara Bayar
        </VBtn>
      </div>
      <br />
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <span class="text-h5 font-weight-bold">Daftar Tagihan/Invoice</span>
        </VCardTitle>
        <VCardItem>
          <VRow no-gutters class="d-flex align-center ga-2">
            <VCol cols="12" md="2">
              <VBtn
                color="primary"
                append-icon="mdi-filter"
                variant="outlined"
                min-width="160px"
              >
                Filter
                <VMenu
                  activator="parent"
                  :close-on-content-click="false"
                  @update:modelValue="onUpdate"
                >
                  <VCard :min-width="dialogMaxWidth">
                    <VCardItem>
                      <VLabel for="status">Status</VLabel>
                      <VSelect
                        v-model="status"
                        id="status"
                        :items="lovStatus"
                        placeholder="Pilih Status"
                        class="mb-1"
                        item-value="code"
                        item-title="name"
                        @update:modelValue="searchQuery = ''"
                      />
                      <VLabel for="outDated">Tanggal Jatuh Tempo</VLabel>
                      <VueDatePicker
                        v-model="outDated"
                        teleport-center
                        id="outDated"
                        :enable-time-picker="false"
                        @update:modelValue="searchQuery = ''"
                      />
                    </VCardItem>
                  </VCard>
                </VMenu>
              </VBtn>
            </VCol>
            <VCol>
              <VTextField
                v-model="searchQuery"
                density="compact"
                placeholder="Search Data"
                append-inner-icon="ri-search-line"
                @input="handleInput"
              />
            </VCol>
          </VRow>
        </VCardItem>
        <VCardItem>
          <VDataTable
            :headers="headers"
            :items="data"
            item-value="no"
            class="elevation-1 border rounded"
            hide-default-footer
            :items-per-page="size"
            :server-items-length="totalItems"
          >
            <template #no-data>
              <div class="pt-2">
                <img src="~/assets/images/empty-data.png" alt="" />
                <div class="pt-2 font-weight-bold">Data Kosong</div>
              </div>
            </template>
            <template #item.tgl_inv="{ item }">
              <div v-if="item.tgl_inv">
                {{ formatDateIntl(new Date((item as any).tgl_inv)) }}
              </div>
            </template>
            <template #item.duedate="{ item }">
              <div v-if="item.duedate">
                {{ formatDateIntl(new Date((item as any).duedate)) }}
              </div>
            </template>
            <template #item.total_inv="{ item }">
              {{ formatToIDR(item.total_inv) }}
            </template>
            <template #item.no="{ index }">
              <label>{{ index + 1 }}</label>
            </template>
            <template v-slot:[`item.status`]="{ item }">
              <div class="d-flex flex-wrap">
                <VChip
                  :key="index"
                  :color="getChipColor(item.status)"
                  label
                  class="ma-1"
                >
                  {{ item.status }}
                </VChip>
              </div>
            </template>
            <template #item.action="{ item }">
              <VBtn color="primary" variant="plain">
                <VIcon>mdi-dots-vertical</VIcon>
                <VMenu activator="parent" :close-on-content-click="false">
                  <VCard>
                    <VBtn
                      variant="text"
                      prepend-icon="mdi-download-box"
                      @click="() => downloadInvoice(item)"
                      block
                      class="text-left"
                      style="width: 100%; justify-content: flex-start"
                    >
                      Lihat Invoice
                    </VBtn>
                  </VCard>
                </VMenu>
              </VBtn>
            </template>
          </VDataTable>
          <VPagination
            v-model="page"
            :length="totalItems"
            class="mt-5"
            @input="loadItem"
          />
        </VCardItem>
      </VCard>
    </VContainer>
  </div>
</template>
