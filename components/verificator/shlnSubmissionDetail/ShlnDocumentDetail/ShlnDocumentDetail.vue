<script setup lang="ts">
const props = defineProps({
  datadocumentloa: {
    type: Object,
    required: true,
  },
  datadocumentfhc: {
    type: Object,
    required: true,
  },
  datadocumentmra: {
    type: Object,
    required: true,
  },
  datatrackingloa: {
    type: Object,
    required: true,
  },
  datatrackingfhc: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "refreshloa"): void;
  (e: "refreshfhc"): void;
}>();

const route = useRoute();
const shlnId = route.params.id;

const loadingListDocument = ref(false);
const dataListDocument = ref();
const totalItems = ref(0);
const itemPerPage = ref(10);
const page = ref(1);

const loadItemListDocumentById = async (page: number, size: number) => {
  try {
    loadingListDocument.value = true;

    const response = await $api(`/shln/verificator/document/list/${shlnId}`, {
      method: "get",
      params: {
        page,
        size,
      },
    });

    if (response.code === 2000) {
      const { data } = response;
      const { requirement_doc } = data || {};
      const { loa, nib } = requirement_doc || {};

      const resData = [
        {
          no: loa.id,
          type: "LOA",
          file: loa.file,
          record: loa.status,
        },
        {
          no: nib.id,
          type: "NIB",
          file: nib.file,
          record: nib.status,
        },
      ];

      dataListDocument.value = resData || [];
      totalItems.value = 2;
      loadingListDocument.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingListDocument.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingListDocument.value = false;
  }
};

onMounted(async () => {
  await loadItemListDocumentById(1, itemPerPage.value);
});

const {
  authorized_company,
  authorizer_company,
  date,
  id,
  letter_no,
  loa_document,
} = props.datadocumentloa || {};

const { country, expired_date, halal_institution_name, issued_date } =
  props.datadocumentmra || {};

const {
  document,
  document_no,
  verification_link,
  file,
  id: idFHC,
} = props.datadocumentfhc || {};

const MRA = [
  { id: 1, key: "Halal Institution Name", value: halal_institution_name },
  { id: 2, key: "Issued Date", value: issued_date },
  { id: 3, key: "Expired Date", value: expired_date },
  { id: 4, key: "Country", value: country },
];

const trackingLOA = props.datatrackingloa?.map((item: any) => {
  const { username, status, id, created_at } = item || {};

  return {
    id,
    key: status,
    value: username,
    created_at,
  };
});

const trackingFHC = props.datatrackingfhc?.map((item: any) => {
  const { username, status, id, created_at } = item || {};

  return {
    id,
    key: status,
    value: username,
    created_at,
  };
});

const downloadLOA = (file: any) => {
  window.open(file, "_blank");
};

const headers = [
  { title: "No", key: "no" },
  { title: "Document Types", key: "type" },
  { title: "Upload / Download", key: "file" },
  { title: "HS Code", key: "record" },
];

const onRefresh = (type: string) => {
  if (type === "loa") {
    emit("refreshloa");
  } else if (type === "fhc") {
    emit("refreshfhc");
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <h3>Mutual Recognition Agreement / MRA Document</h3>
        </VCardTitle>
        <VCardSubtitle>
          <p>Document for Mutual Halal Certificate Recognition</p>
        </VCardSubtitle>
        <VCardText>
          <VRow v-for="item in MRA" :key="item.id" no-gutters>
            <VCol cols="3">
              {{ item.key }}
            </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ item.value }}</p>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VCard>
        <VCardTitle><h3>Letter of Authorization / LoA Document</h3></VCardTitle>
        <VCardSubtitle>
          <p>An Appointment Letter from the Exporter to the importer</p>
        </VCardSubtitle>
        <VCardText>
          <VRow>
            <VCol cols="3"> Authorizer Company </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ authorizer_company }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Authorized Company </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ authorized_company }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Date </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ date }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Letter No. </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ letter_no }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> LoA Document </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <VBtn
                icon="fa-download"
                density="compact"
                @click="downloadLOA(loa_document)"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Catatan Pengembalian </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <VTextField density="compact" />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions style="justify-content: end">
          <div>
            <ReturnConfirmationModal
              @refresh="onRefresh('loa')"
              :id="id"
              documenttype="loa"
            />
            <ApproveConfirmationModal
              @refresh="onRefresh('loa')"
              :id="id"
              documenttype="loa"
            />
          </div>
        </VCardActions>
      </VCard>
    </VCol>
    <VCol cols="4">
      <VCard>
        <VCardTitle>Tracking of LoA</VCardTitle>
        <VCardItem>
          <VTimeline
            side="end"
            align="start"
            line-inset="9"
            truncate-line="start"
            density="compact"
            class="v-timeline--variant-outlined"
          >
            <VTimelineItem
              v-for="item in trackingLOA"
              :key="item.id"
              dot-color="rgb(var(--v-theme-surface))"
              size="x-small"
            >
              <template #icon>
                <VIcon icon="ri-circle-line" color="primary" size="16" />
              </template>
              <div
                class="d-flex justify-space-between align-center gap-2 flex-wrap mb-2"
              >
                <span class="app-timeline-title">
                  {{ item.key }}
                </span>
                <span class="app-timeline-meta">
                  {{ formatDate(item.created_at) }}</span
                >
              </div>
              <div class="app-timeline-text mt-1">
                {{ item.value }}
              </div>
            </VTimelineItem>
          </VTimeline>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VCard>
        <VCardTitle>
          <h3>Original of the Foreign Halal Certificate</h3>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="3"> Document </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ document }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Document No. </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ document_no }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Verification Link (Optional) </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ verification_link }}</p>
            </VCol>
          </VRow>
          <VRow style="display: flex; align-items: center">
            <VCol cols="3"> File </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <VBtn
                icon="fa-download"
                density="compact"
                @click="downloadLOA(file)"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions style="justify-content: end">
          <div>
            <ReturnConfirmationModal
              @refresh="onRefresh('fhc')"
              :id="idFHC"
              documenttype="fhc"
            />
            <ApproveConfirmationModal
              @refresh="onRefresh('fhc')"
              :id="idFHC"
              documenttype="fhc"
            />
          </div>
        </VCardActions>
      </VCard>
    </VCol>
    <VCol cols="4">
      <VCard>
        <VCardTitle>Tracking of Certificate</VCardTitle>
        <VCardItem>
          <VTimeline
            side="end"
            align="start"
            line-inset="9"
            truncate-line="start"
            density="compact"
            class="v-timeline--variant-outlined"
          >
            <VTimelineItem
              v-for="item in trackingFHC"
              :key="item.id"
              dot-color="rgb(var(--v-theme-surface))"
              size="x-small"
            >
              <template #icon>
                <VIcon icon="ri-circle-line" color="primary" size="16" />
              </template>
              <div
                class="d-flex justify-space-between align-center gap-2 flex-wrap mb-2"
              >
                <span class="app-timeline-title">
                  {{ item.key }}
                </span>
                <span class="app-timeline-meta">
                  {{ formatDate(item.created_at) }}</span
                >
              </div>
              <div class="app-timeline-text mt-1">
                {{ item.value }}
              </div>
            </VTimelineItem>
          </VTimeline>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>Requirement Document</VCardTitle>
        <VCardText>
          <VDataTableServer
            v-model:items-per-page="itemPerPage"
            v-model:page="page"
            :headers="headers"
            :items="dataListDocument"
            :loading="loadingListDocument"
            :items-length="totalItems"
            loading-text="Loading..."
            @update:options="loadItemListDocumentById(page, itemPerPage)"
          >
            <template #item.no="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.file="{ item }">
              <VBtn
                icon="fa-download"
                density="compact"
                @click="downloadLOA(item.file)"
              />
            </template>
          </VDataTableServer>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
