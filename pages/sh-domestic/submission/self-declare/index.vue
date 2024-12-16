<script setup lang="ts">
import { computed, ref } from "vue";

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

const filteredSubmissions = computed(() => {
  if (!searchQuery.value) return submission.value;

  return submission.value.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

const questions = [
  "1. Saya tidak pernah mendapatkan fasilitas sertifikasi halal sebelumnya ",
  "2. Aktivitas produksi yang dilakukan merupakan usaha rumahan (bukan usaha pabrikan)",
  "3. Proses produksi menggunakan bahan-bahan halal. (contoh bahan halal: 1. Bahan bersertifikat halal 2. Bahan berasal dari alam (tanpa melihat sertifikat): buah segar, sayur segar, telur segar, ikan segar, rempah, dll)",
  "4. Jika ada proses produksi produk lain yang menggunakan bahan non-halal, dilakukan pada tempat terpisah dan menggunakan alat yang berbeda.",
  "5. Proses produksi tidak menggunakan bahan berbahaya (contoh bahan berbahaya tertuang dalam Peraturan BPOM Nomor 3 Tahun 2018)",
  "6. Proses pengawetan produk sederhana dan tidak menggunakan kombinasi lebih dari 1 metode pengawetan ",
  "7. Proses produksi menggunakan peralatan manual/ semi otomatis",
];

const questionareDialogVisible = ref(false);

const requestDialogVisible = ref(false);

const openModalsQuestionare = () => {
  questionareDialogVisible.value = true;
};

const handleSubmitQuestionare = (answers: any) => {
  console.log("Answers submitted:", answers);
  requestDialogVisible.value = true;
};

const router = useRouter();

const hanleSubmitRequest = async (answer: any) => {
  console.log("answer request : ", answer);

  const result = await $api("/self-declare/create", {
    method: "POST",
  })
    .then((res: any) => {
      if (res.code === 2000) {
        console.log(res, "< res create");
      }
    })
    .catch((err) => {
      console.log(err, "< err create");
    });
  console.log(result, "< result here");
  // router.push("/sh-domestic/submission/self-declare/1231412");
};

const alertData = ref({
  isValid: true,
  text: "",
});
const loadValidation = async () => {
  const response: any = await $api("/self-declare/validation", {
    method: "get",
    params: {
      page: 1,
      size: 10,
      keyword: "",
    },
  });

  if (response.code === 2000) {
    console.log(response, "< res self declare validation");
    alertData.value.isValid = response.data.is_allow_submission;
    alertData.value.text = response.data.keterangan;
  }
};

useAsyncData("self-declare-list", async () => {
  try {
    const response: any = await $api("/self-declare/list", {
      method: "get",
    });

    if (response.code === 2000) {
      console.log(response, "< res list self declare");
    }
  } catch (error) {
    console.log(error, "< err self declare list");
  }
});

onMounted(() => {
  loadValidation();
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
              Tidak dapat mengajukan Self-Declare karena Anda telah menerima
              Sertifikat Halal Fasilitasi.
            </template>
          </VAlert>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="7" class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
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
            :items="filteredSubmissions"
            class="elevation-1"
            fixed-header
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
          </VDataTable>
        </VCol>
      </VRow>
    </VContainer>

    <RequestDialogue
      :dialog-visible="requestDialogVisible"
      :submit="hanleSubmitRequest"
      @update:dialog-visible="requestDialogVisible = $event"
    />

    <Questionnaire
      :dialog-visible="questionareDialogVisible"
      :questions="questions"
      :submit="handleSubmitQuestionare"
      @update:dialog-visible="questionareDialogVisible = $event"
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
