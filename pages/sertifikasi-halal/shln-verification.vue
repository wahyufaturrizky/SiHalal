<script setup lang="ts">
import { ref } from "vue";
import { VDataTableServer } from "vuetify/components";

const items = ref<
  {
    id: string;
    nama_importir: string;
    nama_lph: string;
    nib: string;
    no_daftar: string;
    status_reg: string;
    tgl_daftar: string;
  }[]
>([]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);

const itemsSubmission = ref<
  {
    date: string;
    hcb: string;
    id: string;
    importir_name: string;
    nib: string;
    register_number: string;
    status: string;
  }[]
>([]);

const itemPerPageSubmission = ref(10);
const totalItemsSubmission = ref(0);
const loadingSubmission = ref(false);
const pageSubmission = ref(1);

const loadItem = async (page: number, size: number, keyword: string = "") => {
  try {
    loading.value = true;

    const response = await $api("/shln/verification", {
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

const loadItemSubmission = async (
  pageParams: number,
  sizeParams: number,
  keywordParams: string = ""
) => {
  try {
    loadingSubmission.value = true;

    const response = await $api("/shln/verification/submission", {
      method: "get",
      params: {
        page: pageParams,
        size: sizeParams,
        keyword: keywordParams,
      },
    });

    itemsSubmission.value = response.data;
    totalItemsSubmission.value = response.total_item;
    loadingSubmission.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingSubmission.value = false;
  }
};

const debouncedFetch = debounce(loadItem, 500);
const debouncedFetchLoadItemSubmission = debounce(loadItemSubmission, 500);

onMounted(async () => {
  await loadItem(1, itemPerPage.value, "");
  await loadItemSubmission(1, itemPerPageSubmission.value, "");
});

const verifikatorTableHeader = [
  { title: "No", key: "id" },
  { title: "Registration Number", key: "21354453435543131" },
  { title: "Importer's Name", key: "nama_importir" },
  { title: "NIB / Business ID No", key: "nib" },
  { title: "NPWP / Taxpayer ID No", key: "no_daftar" },
  { title: "Date", key: "tgl_daftar" },
];

const verifikatorTablePopUpHeader = [
  { title: "No", key: "id" },
  { title: "Registration Number", key: "register_number" },
  { title: "NIB / Business ID No", key: "nib" },
  { title: "HCB", key: "hcb" },
  { title: "Registration Date", key: "date" },
  { title: "Submit Date", key: "date" },
  { title: "Verifikator", key: "importir_name" },
  { title: "Status", key: "status" },
  { title: "Action", key: "check" },
];

const searchQuery = ref("");
const searchQuerySubmission = ref("");

const handleInput = () => {
  debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
};

const handleInputSubmission = (searchQuerySubmissionParams: string) => {
  debouncedFetchLoadItemSubmission(
    pageSubmission.value,
    itemPerPageSubmission.value,
    searchQuerySubmissionParams
  );
};

const handleAdd = (selectedItems: any[]) => {
  console.log("Selected items:", selectedItems);
};

const handleCancel = (message: string) => {
  console.log("Cancel message:", message);
};
</script>

<template>
  <div>
    <p class="text-h4">Foreign Halal Certificate Registration Verification</p>
    <VCard class="pa-4">
      <VRow>
        <VCol>
          <p class="text-h5">Submission List</p>
        </VCol>
        <VCol class="d-flex justify-end align-center" cols="6" md="2">
          <VerificationDataTableSelectorVerificationSubmission
            :headers="verifikatorTablePopUpHeader"
            :items="itemsSubmission"
            :searchquerysubmission="searchQuerySubmission"
            :itemperpagesubmission="itemPerPageSubmission"
            :loading-submission="loadingSubmission"
            :pagesubmission="pageSubmission"
            :totalitemssubmission="totalItemsSubmission"
            @handle-input-submission="handleInputSubmission"
            @add="handleAdd"
            @cancel="handleCancel"
            @update:options="
              loadItemSubmission(
                pageSubmission,
                itemPerPageSubmission,
                searchQuerySubmission
              )
            "
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol class="d-flex justify-sm-space-between align-center" cols="5">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            style="max-width: 100%"
            @input="handleInput"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VDataTableServer
            v-model:items-per-page="itemPerPage"
            v-model:page="page"
            :headers="verifikatorTableHeader"
            :items="items"
            :loading="loading"
            :items-length="totalItems"
            @update:options="loadItem(page, itemPerPage, searchQuery)"
          >
            <template #item.id="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.tgl_daftar="{ item }">
              {{ formatDateIntl(new Date(item.tgl_daftar)) }}
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style scoped lang="scss"></style>
