<!-- eslint-disable camelcase -->
<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
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

const typeInvoice = {
  "Registrasi Self Declare": "invoice-self-declare-mandiri",
  "Sertifikasi Halal": "invoice-reguler",
};

const { t } = useI18n();

const handleInvoice = async (
  fileName: string,
  type: string,
  id: string,
  invoiceType: string
) => {
  if (fileName == "") {
    const response = await $api("/certificate/regenerate", {
      method: "post",
      body: {
        document_type: typeInvoice[invoiceType],
        ref_id: id,
      },
    });

    if (response) fileName = response.filename;
  }

  return await downloadDocument(fileName, type);
};

const headers = [
  { title: "No", key: "no" },
  {
    title: `${t("reguler-invoice.invoice-list-nobayar")}`,
    key: "no_payment",
    nowrap: true,
  },
  {
    title: `${t("reguler-invoice.invoice-list-noinv")}`,
    key: "no_inv",
    nowrap: true,
  },
  {
    title: `${t("reguler-invoice.invoice-list-notagihan")}`,
    key: "tgl_inv",
    nowrap: true,
  },
  {
    // title: `${t("reguler-invoice.invoice-list-noref")}`,
    title: "No VA",
    key: "va",
    nowrap: true,
  },
  {
    title: `${t("reguler-invoice.invoice-list-namapu")}`,
    key: "nama",
    nowrap: true,
  },
  {
    title: `${t("reguler-invoice.invoice-list-jnstrans")}`,
    key: "jenis_transaksi",
    nowrap: true,
  },
  {
    title: `${t("reguler-invoice.invoice-list-jatuhtempo")}`,
    key: "duedate",
    nowrap: true,
  },
  {
    title: `${t("reguler-invoice.invoice-list-jmltagihan")}`,
    key: "total_inv",
    nowrap: true,
  },
  {
    title: `${t("reguler-invoice.invoice-list-status")}`,
    key: "status",
    nowrap: true,
  },
  {
    title: `${t("reguler-invoice.invoice-list-catatan")}`,
    key: "catatan",
    nowrap: true,
  },
  {
    title: `${t("reguler-invoice.invoice-list-action")}`,
    value: "action",
    sortable: false,
    nowrap: true,
  },
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
      totalItems.value = response.total_item;
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

const debounceFetch = debounce(loadItem, 1500);

const handleInput = (e: any) => {
  debounceFetch(
    page.value,
    size.value,
    status.value,
    outDated.value,
    e.target.value
  );
};

// const downloadInvoice = async (item: any) => {
//   if (item.file_inv) await downloadDocument(item.file_inv);
// };

onMounted(async () => {
  loading.value = true;
  await Promise.all([
    // loadItem(
    //   page.value,
    //   size.value,
    //   status.value,
    //   outDated.value,
    //   searchQuery.value
    // ),
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
    <!-- <KembaliButton class="pl-0" /> -->
    <div class="d-flex align-center" style="justify-content: space-between">
      <h1 style="font-size: 32px">
        {{ t("reguler-invoice.invoice-list-title") }}
      </h1>
      <VBtn
        v-if="!loading"
        append-icon="fa-download"
        variant="flat"
        @click="() => unduhFile()"
      >
        {{ t("reguler-invoice.invoice-list-donwloadstep") }}
      </VBtn>
    </div>
    <br />
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h4 font-weight-bold">
          {{ t("reguler-invoice.invoice-list-subtitle") }}
        </div>
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
              {{ t("reguler-invoice.invoice-list-filter") }}
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
                    <VLabel for="outDated">
                      {{ t("reguler-invoice.invoice-list-search-duedate") }}
                    </VLabel>
                    <VueDatePicker
                      id="outDated"
                      v-model="outDated"
                      teleport-center
                      :enable-time-picker="false"
                      format="dd/MM/yyyy"
                      @update:model-value="searchQuery = ''"
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
              :placeholder="t(`reguler-invoice.invoice-list-cari`)"
              append-inner-icon="ri-search-line"
              @input="handleInput"
            />
          </VCol>
        </VRow>
      </VCardItem>
      <VCardItem>
        <VDataTableServer
          v-model:items-per-page="size"
          v-model:page="page"
          :items-per-page-options="[10, 25, 50, 100]"
          :headers="headers"
          :items="data"
          class="elevation-1 border rounded"
          :items-length="totalItems"
          @update:options="loadItem(page, size, status, outDated, searchQuery)"
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
            {{ index + 1 + (page - 1) * size }}
          </template>
          <template #[`item.status`]="{ item }">
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
            <!-- {{ item }} -->
            <VBtn color="primary" variant="plain">
              <VIcon>mdi-dots-vertical</VIcon>
              <VMenu activator="parent" :close-on-content-click="false">
                <VCard>
                  <VBtn
                    variant="text"
                    prepend-icon="mdi-download-box"
                    block
                    class="text-left"
                    style="justify-content: flex-start; inline-size: 100%"
                    @click="
                      handleInvoice(
                        item.file_inv,
                        'INVOICE',
                        item.id_inv,
                        item.jenis_transaksi
                      )
                    "
                  >
                    {{ t("reguler-invoice.invoice-list-action-downloadinv") }}
                  </VBtn>
                </VCard>
              </VMenu>
            </VBtn>
          </template>
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </div>
</template>
