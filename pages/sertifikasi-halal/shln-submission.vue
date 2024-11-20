<script setup lang="ts">
// import NewRequestDialog from "@/views/pages/shln/NewRequestDialog.vue";
import ShlnRegisterDialog from "@/views/pages/shln/ShlnRegisterDialog.vue";
import { VDataTableServer } from "vuetify/components";

const items = ref<
  {
    id: string;
    no_shln: string;
    nib: string;
    npwp: string;
    nama_importir: string;
    tgl_daftar: string;
  }[]
>([]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);

const headers = [
  { title: "No", key: "index", align: "start" },
  { title: "Submission Number", key: "no_shln", align: "start" },
  { title: "Importer Name's", key: "nama_importir", align: "start" },
  { title: "NIB/Bussiness Id No", key: "nib", align: "start" },
  { title: "NPWP/Taxpayer Id No.", key: "npwp", align: "start" },
  { title: "Date", key: "tgl_daftar", align: "start" },
  { title: "Action", key: "action" },
];

const loadItem = async (page: number, size: number, no_shln: string = "") => {
  try {
    loading.value = true;

    const response = await $api("/shln/submission", {
      method: "get",
      params: {
        page,
        size,
        no_shln,
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

const handleInput = () => {
  debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
};

// const items = ref([{
//   'No' : '1',
//   'Submission Number' : 'xxxx',
//   'NIB/Business Id No' : 'xxxxx',
//   'NPWP/Taxpayer id No.' : 'xxxxx',
//   'Date' : 'xxxxx',
//   'Action' : 'xxxx'
// },])

const searchQuery = ref("");

onMounted(async () => {
  await loadItem(1, itemPerPage.value, "");
});
console.log(items);

// const filteredItems = computed(() => {
//   if (!searchQuery.value)
//     return items.value

//   return items.value.filter(item =>
//     Object.values(item).some(value =>
//       String(value).toLowerCase().includes(searchQuery.value.toLowerCase()),
//     ),
//   )
// })

const requestDialogVisible = ref(false);

const router = useRouter();

const hanleSubmitRequest = (shln_id: string | null) => {
  if (shln_id != null) {
    // console.log(`/sertifikasi-halal/shln-detail/${shln_id}`);
    navigateTo(`/sertifikasi-halal/shln-detail/${shln_id}`);
  }
};

const navigateAction = (id: string) => {
  navigateTo(`/sertifikasi-halal/shln-detail/${id}`);
};

const openModalsRequest = () => {
  requestDialogVisible.value = true;
};
</script>

<template>
  <div>
    <p class="text-h4">Foreign Halal Certificate Registration Submission</p>
    <VCard class="pa-4">
      <p class="text-h5">Submission List</p>
      <VRow>
        <VCol class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            style="max-width: 100%"
            @input="handleInput"
          />
        </VCol>
        <VCol class="d-flex justify-end align-center">
          <VBtn
            color="primary"
            append-icon="ri-add-line"
            @click="openModalsRequest"
          >
            Add Submission
          </VBtn>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VDataTableServer
            v-model:items-per-page="itemPerPage"
            v-model:page="page"
            :headers="headers"
            :items-length="totalItems"
            :loading="loading"
            :items="items"
            @update:options="loadItem(page, itemPerPage, searchQuery)"
          >
            <template #item.index="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.tgl_daftar="{ item }">
              {{ formatDateIntl(new Date(item.tgl_daftar)) }}
            </template>
            <template #item.action="{ item }">
              <div class="d-flex gap-1">
                <IconBtn size="small" @click="">
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
    <ShlnRegisterDialog
      :dialog-visible="requestDialogVisible"
      :submit="hanleSubmitRequest"
      :total-item="totalItems"
      @update:dialog-visible="requestDialogVisible = $event"
    />
  </div>
</template>

<style scoped lang="scss"></style>
