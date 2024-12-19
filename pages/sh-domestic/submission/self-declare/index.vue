<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");

const headers = [
  { title: "No", key: "no" },
  { title: "ID Reg", key: "idReg" },
  { title: "No. Daftar", key: "regNo" },
  { title: "Tanggal", key: "date" },
  { title: "Nama PU", key: "name" },
  { title: "Jenis Produk", key: "productType" },
  { title: "Status", key: "status" },
  { title: "Merk Dagang", key: "brand" },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const submission = ref([
  // {
  //   no: 1,
  //   idReg: 159,
  //   regNo: "FY-00001",
  //   date: "2024-10-10",
  //   name: "Yogurt Halal ",
  //   productType: "Fermentasi",
  //   status: "Pending",
  //   brand: "SipalingHalal",
  // },
]);
const tablePageData = ref({
  total_item: 0,
  total_page: 0,
  current_page: 1,
});

// const filteredSubmissions = computed(() => {
//   if (!searchQuery.value) return submission.value;

//   return submission.value.filter((item) =>
//     Object.values(item).some((value) =>
//       String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
//     )
//   );
// });

const questions = [
  "Saya tidak pernah mendapatkan fasilitas sertifikasi halal sebelumnya ",
  "Aktivitas produksi yang dilakukan merupakan usaha rumahan (bukan usaha pabrikan)",
  "Proses produksi menggunakan bahan-bahan halal. (contoh bahan halal: 1. Bahan bersertifikat halal 2. Bahan berasal dari alam (tanpa melihat sertifikat): buah segar, sayur segar, telur segar, ikan segar, rempah, dll)",
  "Jika ada proses produksi produk lain yang menggunakan bahan non-halal, dilakukan pada tempat terpisah dan menggunakan alat yang berbeda.",
  "Proses produksi tidak menggunakan bahan berbahaya (contoh bahan berbahaya tertuang dalam Peraturan BPOM Nomor 7 Tahun 2018)",
  "Proses pengawetan produk sederhana dan tidak menggunakan kombinasi lebih dari 1 metode pengawetan ",
  "Proses produksi menggunakan peralatan manual/ semi otomatis",
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
      const data = questions.find((el, index) => index === idx);
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
  // console.log("answer request : ", answer);
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
    console.log(error);
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
  }
};

const handleLoadList = async () => {
  try {
    const response: any = await $api("/self-declare/submission/list", {
      method: "get",
      params: {
        page: tablePageData.value.current_page,
        size: 10,
        keyword: searchQuery.value,
      },
    });

    if (response.code === 2000) {
      submission.value = response.data;
      Object.assign(tablePageData.value, response);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

const { refresh } = await useAsyncData(
  "self-declare-list",
  async () => handleLoadList(),
  {
    // watch: [tablePageData.value.current_page],
  }
);

const handleSearchSubmission = useDebounceFn((val: string) => {
  searchQuery.value = val;
  tablePageData.value.current_page = 1;

  refresh();
}, 350);

onMounted(() => {
  loadValidation();
  handleLoadList();
});
</script>

<template>
  <div>
    <div class="mb-8">
      <p class="text-h4">Pengajuan Self Declare</p>
    </div>

    <VContainer class="bg-surface rounded">
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
          <VDataTable
            :headers="headers"
            :items="submission"
            class="elevation-1"
            fixed-header
            :hide-default-footer="!submission.length"
          >
            <template #item.action="{ item }: any">
              <VIcon
                color="success"
                style="cursor: pointer"
                @click="
                  router.push(`/sh-domestic/submission/self-declare/${item.no}`)
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
          </VDataTable>
        </VCol>
      </VRow>
    </VContainer>

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
</style>
