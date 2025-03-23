<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");
const loadingAll = ref(true);

const headers: any = [
  { title: "No", key: "no", nowrap: true },
  { title: "ID Reg", key: "id_reg", nowrap: true },
  { title: "No. Daftar", key: "no_daftar", nowrap: true },
  { title: "Tanggal", key: "tgl_daftar", nowrap: true },
  { title: "Nama PU", key: "nama_pu", nowrap: true },
  { title: "Jenis Produk", key: "jenis_produk", nowrap: true },
  { title: "Status", key: "status", nowrap: true },
  // { title: "Merk Dagang", key: "merk_dagang", nowrap: true },
  {
    title: "Action",
    value: "action",
    sortable: false,
    nowrap: true,
    align: "center",
  },
];

const submission = ref([]);
const currentPage = ref(1);
const itemPerPage = ref(10);
const totalItems = ref(0);

const questions = [
  "Saya tidak pernah mendapatkan fasilitas sertifikasi halal sebelumnya ",
  "Aktivitas produksi yang dilakukan merupakan usaha rumahan (bukan usaha pabrikan)",
  "Proses produksi menggunakan bahan-bahan halal. (contoh bahan halal: 1. Bahan bersertifikat halal 2. Bahan berasal dari alam (tanpa melihat sertifikat): buah segar, sayur segar, telur segar, ikan segar, rempah, dll)",
  "Jika ada proses produksi produk lain yang menggunakan bahan non-halal, dilakukan pada tempat terpisah dan menggunakan alat yang berbeda.",
  "Proses produksi tidak menggunakan bahan berbahaya (contoh bahan berbahaya tertuang dalam Peraturan BPOM Nomor 7 Tahun 2018)",
  "Proses pengawetan produk sederhana dan tidak menggunakan kombinasi lebih dari 1 metode pengawetan ",
  "Proses produksi menggunakan peralatan manual/ semi otomatis",
];
const questionResponse = [
  "Anda sudah pernah mendapatkan fasilitas self declare",
  "Aktivitas produksi yang dilakukan bukan merupakan usaha rumahan",
  "Tidak semua proses produksi menggunakan bahan-bahan halal",
  "Proses produksi produk lain yang menggunakan bahan non-halal tidak dilakukan pada tempat terpisah dan tidak menggunakan alat yang berbeda.",
  "Proses produksi menggunakan bahan berbahaya",
  "Proses pengawetan produk tidak sederhana atau menggunakan kombinasi lebih dari 1 metode pengawetan",
  "Proses produksi tidak menggunakan peralatan manual/semi otomatis",
];

const questionareDialogVisible = ref(false);
const infoDialogVisible = ref(false);
const requestDialogVisible = ref(false);

const openModalsQuestionare = () => {
  questionareDialogVisible.value = true;
};

const isUnfulfilled = ref<Array<string>>([]);
const handleSubmitQuestionare = (answers: Array<string>) => {
  let unfulfilledCount = 0;
  answers.map((item, idx) => {
    if (item == "no") {
      const data = questionResponse.find((el, index) => index === idx);
      if (data) {
        isUnfulfilled.value.push(data);
        unfulfilledCount++;
      }
    }
  });

  if (unfulfilledCount > 0) {
    infoDialogVisible.value = true;
  } else {
    requestDialogVisible.value = true;
  }
};

const router = useRouter();

const hanleSubmitRequest = async (answer: string) => {
  handleCreate(answer);
};

const handleCreate = async (answer: string) => {
  try {
    const result: any = await $api("/self-declare/submission/create", {
      method: "post",
      body: {
        kbli_id: answer,
      },
    });

    if (result.code === 2000) {
      router.push(`/sh-domestic/submission/self-declare/${result.data.id_reg}`);
    }
  } catch (error) {
    useSnackbar().sendSnackbar("KBLI tidak bisa digunakan untuk pengajuan Self Declare", "error");
  }
};

const alertData = ref({
  isValid: true,
  text: "",
});
const loadValidation = async () => {
  const response: any = await $api("/self-declare/submission/validation", {
    method: "get",
  });

  if (response.code === 2000) {
    alertData.value.isValid = response.data.is_allow_submission;
    alertData.value.text = response.data.keterangan;
    return response;
  }
};

const handleLoadList = async () => {
  try {
    const response: any = await $api("/self-declare/submission/list", {
      method: "get",
      params: {
        page: currentPage.value,
        size: itemPerPage.value,
        keyword: searchQuery.value,
        status: "OF1,OF280,OF285",
        channel_id: "CH003",
      },
    });

    if (response.code === 2000) {
      submission.value = response.data;
      currentPage.value = response.current_page;
      totalItems.value = response.total_item;
      return response;
    }
  } catch (error) {}
};

const { refresh } = await useAsyncData(
  "self-declare-list",
  async () => handleLoadList(),
  {
    watch: [currentPage, itemPerPage],
  }
);

const handleSearchSubmission = useDebounceFn((val: string) => {
  searchQuery.value = val;
  currentPage.value = 1;

  refresh();
}, 350);

onMounted(() => {
  loadValidation();
});

onMounted(async () => {
  const res = await Promise.all([loadValidation()]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});
</script>

<template>
  <div>
    <di>
      <h1 style="font-size: 32px">Pengajuan Self Declare</h1>
      <br />
    </di>

    <VCard v-if="!loadingAll" rounded class="bg-surface pa-4">
      <VRow>
        <VCol class="d-flex justify-sm-space-between align-center">
          <div class="text-h4 font-weight-bold">
            Data Pengajuan Self Declare
          </div>
        </VCol>
        <VCol class="d-flex justify-end align-center">
          <VBtn
            v-if="alertData.isValid"
            color="primary"
            append-icon="fa-plus"
            @click="openModalsQuestionare"
          >
            Buat Pengajuan
          </VBtn>
          <VBtn v-else color="#A09BA1" append-icon="fa-plus">
            Buat Pengajuan
          </VBtn>
        </VCol>
      </VRow>
      <VRow v-if="!alertData.isValid">
        <VCol>
          <VAlert
            type="info"
            color="error"
            variant="tonal"
            density="compact"
            prominent
            class="py-3"
          >
            <template #prepend>
              <VIcon size="24px" icon="ri-information-2-fill" />
            </template>
            <template #text>
              {{ alertData.text }}
            </template>
          </VAlert>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="7" class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
            @update:model-value="handleSearchSubmission"
            density="compact"
            placeholder="Cari Data"
            append-inner-icon="fa-search"
            style="max-width: 100%"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VDataTableServer
            class="elevation-1 custom-table"
            :headers="headers"
            :items="submission"
            :items-length="totalItems"
            v-model:page="currentPage"
            v-model:items-per-page="itemPerPage"
            :items-per-page-options="[5, 25, 50, 100]"
            @update:options="handleLoadList"
            :hide-default-footer="!submission.length"
          >
            <template #item.no="{ index }">
              {{ index + 1 + (currentPage - 1) * itemPerPage }}
            </template>
            <template #item.no_daftar="{ item }: any">
              {{ item.no_daftar ? item.no_daftar : "-" }}
            </template>
            <template #item.tgl_daftar="{ item }: any">
              {{
                item.tgl_daftar
                  ? new Date(item.tgl_daftar).toISOString().substring(0, 10)
                  : "-"
              }}
            </template>
            <template #item.jenis_produk="{ item }: any">
              {{ item.jenis_produk ? item.jenis_produk : "-" }}
            </template>
            <!-- <template #item.merk_dagang="{ item }: any">
              {{ item.merk_dagang ? item.merk_dagang : "-" }}
            </template> -->
            <template #item.action="{ item }: any">
              <VIcon
                color="success"
                style="cursor: pointer"
                @click="
                  router.push(
                    `/sh-domestic/submission/self-declare/${item.id_reg}`
                  )
                "
              >
                ri-arrow-right-line
              </VIcon>
            </template>
            <template #no-data>
              <VCard variant="outlined" class="my-7 mx-1 py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>
    </VCard>

    <VSkeletonLoader
      type="table-heading, list-item-two-line, image, table-tfoot"
      v-else
    />

    <Questionnaire
      :dialog-visible="questionareDialogVisible"
      :questions="questions"
      :submit="handleSubmitQuestionare"
      @update:dialog-visible="questionareDialogVisible = $event"
    />
    <InfoDialogue
      :dialog-visible="infoDialogVisible"
      @update:dialog-visible="infoDialogVisible = $event"
      :data="isUnfulfilled"
    />
    <RequestDialogue
      :dialog-visible="requestDialogVisible"
      :submit="hanleSubmitRequest"
      @update:dialog-visible="requestDialogVisible = $event"
    />
  </div>
</template>

<style scoped lang="scss">
.table-width-5 {
  width: 5%;
}
.table-width-10 {
  width: 10%;
}
.table-width-15 {
  width: 15%;
}
.table-width-20 {
  width: 20%;
}

:deep(.v-data-table.custom-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
    }
    tbody > tr > td:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
      background: white;
    }
  }
}
</style>
