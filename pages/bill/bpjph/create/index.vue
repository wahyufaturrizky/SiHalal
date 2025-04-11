<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const tableHeaders: any[] = [
  { title: "No", key: "no", sortable: false },
  {
    title: t("task-force.tagihan-bpjph-buat-tagihan-table-key.daftar"),
    key: "no_daftar",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-buat-tagihan-table-key.date"),
    key: "tanggal_daftar",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-buat-tagihan-table-key.pu-name"),
    key: "nama_pu",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-buat-tagihan-table-key.city"),
    key: "kota_pu",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-buat-tagihan-table-key.product-type"),
    key: "jenis_produk",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-buat-tagihan-table-key.market-brand"),
    key: "merek_dagang",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-buat-tagihan-table-key.market-area"),
    key: "area_pemasaran",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-buat-tagihan-table-key.business-scale"),
    key: "skala_usaha",
    nowrap: true,
  },
  {
    title: t("task-force.tagihan-bpjph-buat-tagihan-table-key.lph-name"),
    key: "nama_lph",
    nowrap: true,
  },
  {
    title: t(
      "task-force.tagihan-bpjph-buat-tagihan-table-key.determination-no"
    ),
    key: "penetapan.no_penetapan",
    nowrap: true,
  },
  {
    title: t(
      "task-force.tagihan-bpjph-buat-tagihan-table-key.determination-date"
    ),
    key: "penetapan.tgl_penetapan",
    nowrap: true,
  },
];

const tableItems = ref<Array[]>([]);
const facilityItems = ref<Array[]>([]);
const currentPage = ref(1);
const itemPerPage = ref(10);
const totalItems = ref(0);
const selectedItem = ref([]);
const isLoading = ref(false);
const isLoadingFacility = ref(false);
const tableType = ref("");
const totalData = ref(30);
const showFilterMenu = ref(false);

// const filterData = ref({
//   serviceType: `Pilih ${t('task-force.tagihan-bpjph-buat-tagihan-filter.service-type')}`,
//   pelakuUsaha: `Pilih ${t('task-force.tagihan-bpjph-buat-tagihan-filter.pelaku-usaha')}`,
//   facility: `Pilih ${t('task-force.tagihan-bpjph-buat-tagihan-filter.facility')}`,
//   year: `Pilih ${t('task-force.tagihan-bpjph-buat-tagihan-filter.year')}`,
// })

const filterData = ref({
  serviceType: "",
  pelakuUsaha: "",
  facility: "",
  year: "",
});

const bulkCheck = ref({
  start: "",
  end: "",
});

const handleLoadList = async (params: any) => {
  try {
    const response: any = await $api("/bill/bpjph/bill", {
      method: "get",
      query: {
        ...params,
        page: currentPage.value,
        size: itemPerPage.value,
      },
    } as any);

    if (response.code === 2000) {
      if (response.data !== null) {
        response.data.map((el: any) => (el.id = el.id_reg));
        tableItems.value = response.data;
        currentPage.value = response.current_page;
        totalItems.value = response.total_item;
      } else {
        // tableItems.value = []
        currentPage.value = 1;
        totalItems.value = 0;
      }

      return response;
    } else {
      // tableItems.value = []
      currentPage.value = 1;
      totalItems.value = 0;
    }
  } catch (error) {
    console.error(error);
  }
};

const getFacility = async () => {
  try {
    isLoadingFacility.value = true;

    const response: any = await $api("/bill/bpjph/facility", {
      method: "get",
    } as any);

    if (response.code === 2000) {
      if (response.data !== null) {
        facilityItems.value = response.data;
        isLoadingFacility.value = false;
      }

      return response;
    }
  } catch (error) {
    isLoadingLembaga.value = false;
    console.error(error);
  }
};

const { refresh } = await useAsyncData(
  "user-list",
  async () => await handleLoadList(filterData.value),
  {
    watch: [currentPage, itemPerPage, tableType],
  }
);

const handleCheck = async () => {
  if (bulkCheck.value.start > bulkCheck.value.end) return null;

  const arr: [] = [];

  tableItems.value.map((item: any, index: number) => {
    if (index >= bulkCheck.value.start - 1 && index <= bulkCheck.value.end - 1)
      arr.push(item.id);

    return true;
  });

  return (selectedItem.value = arr);
};

const applyFilters = async () => {
  let params = {};

  if (filterData.value.serviceType !== "") {
    params = {
      ...params,
      channel_id: filterData.value.serviceType,
    };
  }
  if (filterData.value.pelakuUsaha !== "") {
    params = {
      ...params,
      f_ln: filterData.value.pelakuUsaha === "Dalam Negri" ? 0 : 1,
    };
  }
  if (filterData.value.facility !== "") {
    params = {
      ...params,
      fac_id: filterData.value.facility,
    };
  }
  if (filterData.value.year !== "") {
    params = {
      ...params,
      tgl_daftar: filterData.value.year,
    };
  }

  handleLoadList(params);
  showFilterMenu.value = false;
};

const resetFilters = () => {
  filterData.value = {
    serviceType: "",
    pelakuUsaha: "",
    facility: "",
    year: "",
  };
  handleLoadList(filterData.value);
  showFilterMenu.value = false;
};

onMounted(async () => {
  await Promise.allSetled([handleLoadList(filterData.value), getFacility()]);
});

const getChipColor = (status: string) => {
  if (status === "Terbayar") return "success";

  return "primary";
};

const unduhFile = async (link: string) => {
  await downloadDocument(link, "FILES");
};

const onApprove = async () => {
  try {
    const response: any = await $api("/bill/bpjph/create-bill", {
      method: "post",
      body: {
        id_reg: selectedItem.value,
      },
    });

    if (response.code === 2000) {
      useSnackbar().sendSnackbar(response.message, "success");
      selectedItem.value = [];
      handleLoadList(filterData.value);
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan submit penetapan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan submit penetapan", "error");
  } finally {
    // loadingPendamping.value = false;
  }
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
        <VCardTitle>
          <div>
            <div
              class="d-flex w-100 font-weight-bold text-h4"
              style="justify-content: space-between"
            >
              {{ t("task-force.tagihan-bpjph-buat-tagihan-table.title") }}
              <p class="common-text">
                {{
                  t("task-force.tagihan-bpjph-buat-tagihan-table.total-data")
                }}
                <span> : {{ totalData }} </span>
              </p>
            </div>
          </div>
        </VCardTitle>
        <VCardItem>
          <div class="d-flex w-100 mb-5 gap-5">
            <div>
              <VMenu
                v-model="showFilterMenu"
                :close-on-content-click="false"
                offset-y
              >
                <template #activator="{ props }">
                  <VBtn
                    color="primary"
                    variant="outlined"
                    v-bind="props"
                    append-icon="ri-filter-fill"
                  >
                    Filter
                  </VBtn>
                </template>
                <VCard class="pa-3" width="300">
                  <div class="w-100 mt-5 mb-5">
                    <div class="w-100">
                      <div>
                        <label>{{
                          t(
                            "task-force.tagihan-bpjph-buat-tagihan-filter.service-type"
                          )
                        }}</label>
                        <VSelect
                          v-model="filterData.serviceType"
                          :value="filterData.serviceType"
                          :items="[
                            { name: 'Reguler', code: 'CH001' },
                            { name: 'Fasilitasi', code: 'CH002' },
                          ]"
                          class="-mt-10"
                          item-title="name"
                          item-value="code"
                          style="background-color: white"
                        />
                      </div>
                      <div class="mt-5">
                        <label>{{
                          t(
                            "task-force.tagihan-bpjph-buat-tagihan-filter.pelaku-usaha"
                          )
                        }}</label>
                        <VSelect
                          v-model="filterData.pelakuUsaha"
                          :value="filterData.pelakuUsaha"
                          :items="[
                            { name: 'Dalam Negri', code: 'Dalam Negri' },
                            { name: 'Luar Negri', code: 'Luar Negri' },
                          ]"
                          class="-mt-10"
                          item-title="name"
                          item-value="code"
                          style="background-color: white"
                        />
                      </div>
                    </div>
                    <div class="w-100 mt-5">
                      <div>
                        <label>{{
                          t(
                            "task-force.tagihan-bpjph-buat-tagihan-filter.facility"
                          )
                        }}</label>
                        <VSelect
                          v-model="filterData.facility"
                          :items="facilityItems"
                          class="-mt-10"
                          item-title="fac_name"
                          item-value="fac_id"
                          style="background-color: white"
                          :loading="isLoadingFacility"
                          :disabled="isLoadingFacility"
                        />
                      </div>
                      <div class="mt-5">
                        <label>{{
                          t("task-force.tagihan-bpjph-buat-tagihan-filter.year")
                        }}</label>
                        <VSelect
                          v-model="filterData.year"
                          :value="filterData.year"
                          :items="[
                            { name: 'Semua', code: '' },
                            {
                              name: new Date().getFullYear(),
                              code: new Date().getFullYear(),
                            },
                            {
                              name: new Date().getFullYear() - 1,
                              code: new Date().getFullYear() - 1,
                            },
                            {
                              name: new Date().getFullYear() - 2,
                              code: new Date().getFullYear() - 2,
                            },
                            {
                              name: new Date().getFullYear() - 3,
                              code: new Date().getFullYear() - 3,
                            },
                            {
                              name: new Date().getFullYear() - 4,
                              code: new Date().getFullYear() - 4,
                            },
                          ]"
                          class="-mt-10"
                          item-title="name"
                          item-value="code"
                          style="background-color: white"
                        />
                      </div>
                    </div>
                  </div>
                  <VBtn
                    style="float: inline-start"
                    :text="
                      t(
                        'task-force.tagihan-bpjph-buat-tagihan-filter.reset-btn-filter'
                      )
                    "
                    @click="resetFilters"
                  />
                  <VBtn
                    style="float: inline-end"
                    color="primary"
                    @click="applyFilters"
                  >
                    {{
                      t(
                        "task-force.tagihan-bpjph-buat-tagihan-filter.btn-filter"
                      )
                    }}
                  </VBtn>
                </VCard>
              </VMenu>
            </div>
            <div class="d-flex gap-5" style="max-block-size: 40px">
              <VTextField
                v-model="bulkCheck.start"
                density="compact"
                placeholder="pilih no"
                style="max-block-size: 40px; min-inline-size: 110px"
                @input="onlyAcceptNumber"
              />
              <VTextField
                v-model="bulkCheck.end"
                density="compact"
                placeholder="sampai"
                style="max-block-size: 40px; min-inline-size: 110px"
                @input="onlyAcceptNumber"
              />
              <VBtn
                :disabled="
                  !bulkCheck.start ||
                  !bulkCheck.end ||
                  +bulkCheck.start > +bulkCheck.end
                "
                @click="handleCheck"
              >
                {{ t("task-force.tagihan-bpjph-buat-tagihan-table.btn-pilih") }}
              </VBtn>
            </div>
            <CreateInvoice
              :disabled="selectedItem.length === 0"
              :on-approve="onApprove"
            >
              <template #content>
                <label
                  >Yakin akan membuat tagihan untuk data-data yang dicontreng
                  tersebut?</label
                >
              </template>
            </CreateInvoice>
          </div>
          <VCard variant="outlined">
            <VDataTableServer
              v-model:items-per-page="itemPerPage"
              v-model:page="currentPage"
              v-model="selectedItem"
              :items-per-page-options="[10, 25, 50, 100]"
              :items-length="totalItems"
              class="custom-table"
              :headers="tableHeaders"
              :items="tableItems"
              :loading="isLoading"
              :hide-default-footer="tableItems.length === 0"
              hover
              show-select
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
              <template #item.tanggal_daftar="{ item }">
                {{ formatDateId(item.tanggal_daftar) }}
              </template>
              <template #item.penetapan.tgl_penetapan="{ item }">
                <label v-if="item.penetapan.tgl_penetapan">
                  {{ formatDateIntl(new Date(item.penetapan.tgl_penetapan)) }}
                </label>
              </template>
            </VDataTableServer>
          </VCard>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
.common-text {
  color: "#2C222E";
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-block-start: 10px;
}
</style>
