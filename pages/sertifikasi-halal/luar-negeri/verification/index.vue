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
    npwp: string;
    status_reg: string;
    tgl_daftar: string;
  }[]
>([]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);
const status = ref("OF10,OF5,OF15,OF11");

const loadItem = async (
  page: number,
  size: number,
  keyword: string = "",
  status: string = ""
) => {
  try {
    loading.value = true;

    const response = await $api("/shln/verificator", {
      method: "get",
      params: {
        page,
        size,
        keyword,
        status,
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

onMounted(async () => {
  await loadItem(1, itemPerPage.value, "", "OF10,OF5,OF15,OF11");
});

const refresh = async () => {
  await loadItem(1, itemPerPage.value, "", "OF10,OF5,OF15,OF11");
};

const verifikatorTableHeader = [
  { title: "No", key: "id" },
  { title: "Registration Number", key: "no_daftar" },
  { title: "Importer's Name", key: "nama_importir" },
  { title: "NIB / Bu  siness ID No", key: "nib" },
  { title: "NPWP / Taxpayer ID No", key: "npwp" },
  { title: "Date", key: "tgl_daftar" },
  { title: "Action", key: "action" },
];

const searchQuery = ref("");

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    searchQuery.value,
    status.value
  );
};

const handleCancel = (message: string) => {
  console.log("Cancel message:", message);
};

const navigateAction = (id: string) => {
  navigateTo(`/sertifikasi-halal/luar-negeri/verification/${id}`);
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
            @cancel="handleCancel"
            @refresh="refresh"
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
            loading-text="Loading..."
            @update:options="loadItem(page, itemPerPage, searchQuery, status)"
          >
            <template #item.id="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.tgl_daftar="{ item }">
              {{ formatDateIntl(new Date(item.tgl_daftar)) }}
            </template>
            <template #item.action="{ item }">
              <div class="d-flex gap-1">
                <IconBtn size="small">
                  <VIcon
                    icon="ri-arrow-right-line"
                    color="primary"
                    @click="navigateAction(item.id)"
                  />
                </IconBtn>
              </div>
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style scoped lang="scss"></style>
