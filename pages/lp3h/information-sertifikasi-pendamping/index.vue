<!-- eslint-disable camelcase -->
<script setup lang="ts">
import "@vuepic/vue-datepicker/dist/main.css";
import { useI18n } from "vue-i18n";
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

const { t } = useI18n();

const headers = [
  { title: "No", key: "no" },
  {
    title: "No Daftar",
    key: "no_daftar",
    nowrap: true,
  },
  {
    title: "Tanggal Daftar",
    key: "tgl_daftar",
    nowrap: true,
  },
  {
    title: "NamaPU",
    key: "nama_pu",
    nowrap: true,
  },
  {
    title: "Alamat",
    key: "alamat_pu",
    nowrap: true,
  },
  {
    title: "Nama Pendamping",
    key: "nama_pj",
    nowrap: true,
  },
  {
    title: "Merk Dagang",
    key: "merek_dagang",
    nowrap: true,
  },
  {
    title: "Status Pembayaran oleh Oleh BPJH",
    key: "status",
    nowrap: true,
  },
  {
    title: "action",
    value: "action",
    sortable: false,
    nowrap: true,
  },
];

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 400 : "90%";
});

const itemPerPage = ref(10);

// TODO -> BIKIN LOGIC BUAT SET CHIP COLOR
const getChipColor = (stats: any) => {
  if (stats === "Pengajuan" || stats === 1) return "";
  if (stats === "Disetujui" || stats === 2) return "primary";
  if (stats === "Terbayar ke LP3H" || stats === 3) return "success";
  if (stats === "Terbayar ke Pendamping" || stats === 4) return "success";

  return "";
};

const downloadExcel = async (
  statusData: string,
  search: string,
  file_url: boolean
) => {
  try {
    const datePayload: any = null;
    const params = {};

    if (statusData) params.status = statusData;

    if (search) params.search = search;

    // params.file_url = false;

    const response: any = await $api("/reguler/lph/excel-list-pendamping", {
      method: "get",
      params,
    });

    if (response) downloadFileExcel(response);
    // response?.data?.map((item: any) => {
    //   item.typeAndTotal = [item?.jenis_usaha, item?.jumlah_produk];
    // });
    // totalItems.value = response.totalPages;
    // data.value = response.data;
    // return response;
    else useSnackbar().sendSnackbar("Ada Kesalahan 1", "error");
  } catch (error) {
    loading.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan 2", "error");
  }
};

const loadItem = async (
  pageNumber: number,
  sizeData: number,
  statusData: string,
  search: string
) => {
  try {
    const datePayload: any = null;

    const params = {
      page: pageNumber,
      size: sizeData,
      status: statusData,
      search,
    };

    const response: any = await $api(
      "/reguler/lph/list-pendamping-self-declare",
      {
        method: "get",
        params,
      }
    );

    if (response?.code === 2000) {
      // response?.data?.map((item: any) => {
      //   item.typeAndTotal = [item?.jenis_usaha, item?.jumlah_produk];
      // });

      totalItems.value = response.totalPages;
      data.value = response.data ?? [];

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
    // const response: any = await $api("", {
    //   method: "get",
    // });

    // if (response?.code === 2000) {
    lovStatus.value = [
      { code: "", name: "Semua" },
      { code: "OF1", name: "Draft" },
      { code: "OF10 ", name: "Pengajuan" },
      { code: "OF71", name: "Selesai P3H" },
      { code: "OF74", name: "Dikirim ke Komite Fatwa" },
      { code: "OF280", name: "Dikembalikan ke PU" },
      { code: "OF285", name: "Dikembakikan Oleh Komite Fatwa" },
      { code: "OF56", name: "Pembayaran" },
      { code: "OF72", name: "Selesai Verifikasi LP3H" },
      { code: "OF100", name: "Selesai Sidang Fatwa" },
      { code: "OF120", name: "Penerbitan Sertifikat" },
      { code: "OF300", name: "Sertifikat Halal Terbit" },
    ];
    loading.value = false;

    //   return response;
    // } else {
    // loading.value = false;
    // useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    // }
  } catch (error) {
    loading.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

// const navigateToDetail = (id: string) => {
//   navigateTo(`/lph/list-register/detail/${id}`);
// };

const handleInput = (e: any) => {
  debounce(loadItem(page.value, size.value, status.value, e.target.value), 500);
};

function formatDate(isoString: string): string {
  if (isoString != null || isoString != "") {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  } else {
    return "";
  }
}

const downloadExcelHandler = () => {
  downloadExcel(status.value, searchQuery.value, true);
};

const router = useRouter();

onMounted(async () => {
  loading.value = true;
  await Promise.all([
    loadItem(page.value, size.value, status.value, searchQuery.value),
    getListStatus(),
  ]);
  loading.value = false;
});

watch([status, outDated, page], () => {
  loadItem(page.value, size.value, status.value, searchQuery.value);
});
</script>

<template>
  <div v-if="!loading">
    <!-- <KembaliButton class="pl-0" /> -->
    <div class="d-flex align-center" style="justify-content: space-between">
      <h1 style="font-size: 32px">Informasi Sertifikat Self Declare</h1>
      <!--
        <VBtn
        v-if="!loading"
        append-icon="fa-download"
        variant="flat"
        @click="() => unduhFile()"
        >
        {{ t("reguler-invoice.invoice-list-donwloadstep") }}
        </VBtn>
      -->
    </div>
    <br />
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h4 font-weight-bold">Daftar Sertifikat</div>
      </VCardTitle>
      <VCardItem>
        <VRow class="d-flex align-center">
          <VCol cols="8" class="d-inline-flex">
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
                @update:model-value="onUpdate"
              >
                <VCard :min-width="dialogMaxWidth">
                  <VCardItem>
                    <VLabel for="status">
                      {{ t("reguler-invoice.invoice-list-status") }}
                    </VLabel>
                    <VSelect
                      id="status"
                      v-model="status"
                      :items="lovStatus"
                      :placeholder="
                        t(`reguler-invoice.invoice-list-search-status`)
                      "
                      class="mb-1"
                      item-value="code"
                      item-title="name"
                      @update:model-value="searchQuery = ''"
                    />
                  </VCardItem>
                </VCard>
              </VMenu>
            </VBtn>
            <VTextField
              v-model="searchQuery"
              style="margin-inline-start: 1svw"
              density="compact"
              placeholder="Cari No. Daftar/ Nama PU"
              append-inner-icon="ri-search-line"
              @input="handleInput"
            />
          </VCol>
          <VCol cols="4" class="d-flex justify-end">
            <VBtn variant="flat" @click="downloadExcelHandler">
              Export XLS
              <VIcon right> mdi-file-excel </VIcon>
            </VBtn>
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

          <template #item.no="{ index }">
            <label>{{ index + 1 + (page - 1) * itemPerPage }}</label>
          </template>
          <template #item.tgl_daftar="{ item }">
            {{ item.tgl_daftar ? formatDateId(item.tgl_daftar) : "" }}
          </template>
          <template #[`item.status`]="{ item }">
            <div class="d-flex flex-wrap">
              <VChip
                v-if="item.f_lph !== ''"
                :key="index"
                :color="getChipColor(item.status_pembayaran)"
                label
                class="ma-1"
              >
                {{ item.status_pembayaran }}
              </VChip>
              <!-- <p v-if="item.status_pembayaran === ''">-</p> -->
            </div>
          </template>

          <!--
            <template #item.action="{ item }">
            <Vbtn
            variant="plain"
            class="cursor-pointer"
            @click="() => navigateToDetail(item)"
            >
            <VRow>
            <VCol sm="3">
            <VIcon end icon="ri-arrow-right-line" color="primary" />
            </VCol>
            </VRow>
            </Vbtn>
            </template>
          -->

          <template #item.action="{ item }: any">
            <VIcon
              color="success"
              style="cursor: pointer"
              @click="
                router.push(
                  `/lp3h/information-sertifikasi-pendamping/${item.id_reg}`
                )
              "
            >
              ri-arrow-right-line
            </VIcon>
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
  </div>
</template>
