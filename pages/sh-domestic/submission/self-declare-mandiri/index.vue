<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");
const loadingAll = ref(true);

const { t } = useI18n();

const headers: any = [
  { title: "No", key: "no", nowrap: true },
  { title: "ID Reg", key: "id_reg", nowrap: true },
  {
    title: "status-permohoanan.reguler-detail-reg-nodaftar",
    key: "no_daftar",
    nowrap: true,
  },
  {
    title: "status-permohoanan.permohonan-list-tanggal",
    key: "tgl_daftar",
    nowrap: true,
  },
  {
    title: "status-permohoanan.permohonan-list-namapu",
    key: "nama_pu",
    nowrap: true,
  },
  {
    title: "status-permohoanan.permohonan-list-jnsprod",
    key: "jenis_produk",
    nowrap: true,
  },
  {
    title: "status-permohoanan.permohonan-list-status",
    key: "status",
    nowrap: true,
  },

  // { title: "Merk Dagang", key: "merk_dagang", nowrap: true },
  {
    title: "status-permohoanan.permohonan-list-action",
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
const countResult = ref(0);

const questions = [
  "self-declare.questionnaire.1",
  "self-declare.questionnaire.2",
  "self-declare.questionnaire.3",
  "self-declare.questionnaire.4",
  "self-declare.questionnaire.5",
  "self-declare.questionnaire.6",
  "self-declare.questionnaire.7",
];

const questionResponse = [
  "self-declare.questionnaire-response.1",
  "self-declare.questionnaire-response.2",
  "self-declare.questionnaire-response.3",
  "self-declare.questionnaire-response.4",
  "self-declare.questionnaire-response.5",
  "self-declare.questionnaire-response.6",
  "self-declare.questionnaire-response.7",
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

  if (unfulfilledCount > 0) infoDialogVisible.value = true;
  else requestDialogVisible.value = true;
};

const router = useRouter();

const hanleSubmitRequest = async (answer: string) => {
  handleCreate(answer);
};

const handleCreate = async (answer: string) => {
  try {
    const result: any = await $api(
      "/pelaku-usaha/layanan-sertifikasi-halal-mandiri",
      {
        method: "post",
        body: {
          kbli_id: answer,
        },
      }
    );

    if (result.code === 2000) {
      router.push(
        `/sh-domestic/submission/self-declare-mandiri/${result.data.id_reg}`
      );
    } else {
      useSnackbar().sendSnackbar(result?.errors?.list_error?.[0], "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar(
      "KBLI tidak bisa digunakan untuk pengajuan Self Declare",
      "error"
    );
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
    const response: any = await $api("/self-declare/mandiri/list", {
      method: "get",
      params: {
        page: currentPage.value,
        size: itemPerPage.value,
        keyword: searchQuery.value,
        status: "OF1,OF280,OF285",
        channel_id: "CH004",
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

const checkCountFactory = async () => {
  try {
    const response: any = await $api("/self-declare/mandiri/check-count", {
      method: "get",
    });

    if (response.code === 2000) {
      countResult.value = response.data.count;

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

onMounted(async () => {
  const res = await Promise.all([handleLoadList(), checkCountFactory()]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) loadingAll.value = false;
  else loadingAll.value = false;
});
</script>

<template>
  <div>
    <Di>
      <h1 style="font-size: 32px">
        {{ t("self-declare-mandiri.title") }}
      </h1>
      <br />
    </Di>

    <VCard v-if="!loadingAll" rounded class="bg-surface pa-4">
      <VRow>
        <VCol class="d-flex justify-sm-space-between align-center">
          <div class="text-h4 font-weight-bold">
            {{ t("self-declare-mandiri.table-title") }}
          </div>
        </VCol>
        <VCol class="d-flex justify-end align-center">
          <VBtn
            v-if="alertData.isValid"
            color="primary"
            append-icon="fa-plus"
            :disabled="countResult > 1"
            @click="openModalsQuestionare"
          >
            {{ t("self-declare-mandiri.create") }}
          </VBtn>
          <VBtn v-else color="#A09BA1" append-icon="fa-plus">
            {{ t("self-declare-mandiri.create") }}
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
      <div v-if="countResult > 1" class="bgContent mb-5">
        <div class="d-flex flex-wrap mt-5">
          <VIcon icon="ri-error-warning-line" color="#FF4D49" />
          <label class="subText">
            Jumlah Pabrik melebihi batas ketetapan.
          </label>
        </div>
      </div>
      <VRow>
        <VCol cols="7" class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
            density="compact"
            :placeholder="t('self-declare-mandiri.search')"
            append-inner-icon="fa-search"
            style="max-inline-size: 100%"
            @update:model-value="handleSearchSubmission"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VDataTableServer
            v-model:page="currentPage"
            v-model:items-per-page="itemPerPage"
            class="elevation-1 custom-table"
            :headers="headers"
            :items="submission"
            :items-length="totalItems"
            :items-per-page-options="[5, 25, 50, 100]"
            :hide-default-footer="!submission.length"
            @update:options="handleLoadList"
          >
            <template #item.no="{ index }">
              {{ index + 1 + (currentPage - 1) * itemPerPage }}
            </template>
            <template #item.no_daftar="{ item }: any">
              {{ item.no_daftar ? item.no_daftar : "-" }}
            </template>
            <template #header.no_daftar="{ column }">
              <div>
                {{ t(column.title) }}
              </div>
            </template>
            <template #item.tgl_daftar="{ item }: any">
              {{ item.tgl_daftar ? formatDateId(item.tgl_daftar) : "-" }}
            </template>
            <template #header.tgl_daftar="{ column }">
              <div>
                {{ t(column.title) }}
              </div>
            </template>
            <template #item.jenis_produk="{ item }: any">
              {{ item.jenis_produk ? item.jenis_produk : "-" }}
            </template>
            <template #header.jenis_produk="{ column }">
              <div>
                {{ t(column.title) }}
              </div>
            </template>
            <!--
              <template #item.merk_dagang="{ item }: any">
              {{ item.merk_dagang ? item.merk_dagang : "-" }}
              </template>
            -->
            <template #item.action="{ item }: any">
              <VIcon
                color="success"
                style="cursor: pointer"
                @click="
                  router.push(
                    `/sh-domestic/submission/self-declare-mandiri/${item.id_reg}`
                  )
                "
              >
                ri-arrow-right-line
              </VIcon>
            </template>
            <template #header.action="{ column }">
              <div>
                {{ t(column.title) }}
              </div>
            </template>
            <template #header.status="{ column }">
              <div>
                {{ t(column.title) }}
              </div>
            </template>
            <template #header.nama_pu="{ column }">
              <div>
                {{ t(column.title) }}
              </div>
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
      v-else
      type="table-heading, list-item-two-line, image, table-tfoot"
    />

    <Questionnaire
      :dialog-visible="questionareDialogVisible"
      :questions="questions"
      :submit="handleSubmitQuestionare"
      @update:dialog-visible="questionareDialogVisible = $event"
    />
    <InfoDialogue
      :dialog-visible="infoDialogVisible"
      :data="isUnfulfilled"
      @update:dialog-visible="infoDialogVisible = $event"
    />
    <RequestDialogueMandiri
      :dialog-visible="requestDialogVisible"
      :submit="hanleSubmitRequest"
      @update:dialog-visible="requestDialogVisible = $event"
    />
  </div>
</template>

<style scoped lang="scss">
.table-width-5 {
  inline-size: 5%;
}

.table-width-10 {
  inline-size: 10%;
}

.table-width-15 {
  inline-size: 15%;
}

.table-width-20 {
  inline-size: 20%;
}

:deep(.v-data-table.custom-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      position: sticky;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }

    tbody > tr > td:last-of-type {
      position: sticky;
      background: white;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }
  }
}

.subText {
  align-content: center;
  color: #ff4d49 !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: 18px !important;
  padding-inline-start: 10px;
}

.bgContent {
  border-radius: 10px;
  background-color: #ffe2e2;
  padding-inline-start: 10px;
}
</style>
