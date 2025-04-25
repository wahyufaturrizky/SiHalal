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
  loadingTrackingLoa: {
    type: Boolean,
    required: false,
  },
  datatrackingfhc: {
    type: Object,
    required: true,
  },
  loadingTrackingFhc: {
    type: Boolean,
    required: false,
  },
  data: {
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
const reqFile = ref([]);
const reqTracking = ref(null);
const reqTrackingModal = ref(false);

const getReqTrackingModal = (data: any) => {
  reqTracking.value = data;
  reqTrackingModal.value = true;
};

const loadItemListDocumentById = async () => {
  try {
    loadingListDocument.value = true;

    const response = await $api(`/shln/verificator/document/list/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      const { data } = response;
      const { requirement_doc } = data || {};
      const { loa, nib } = requirement_doc || {};

      const resData = [
        {
          no: loa.id,
          type: "Letter of Application",
          file: loa.file,
          tracking: loa.tracking,
          comment: loa.comment,
          status: loa.status,
        },
        {
          no: nib.id,
          type: "NIB",
          file: nib.file,
          tracking: nib.tracking,
          comment: nib.comment,
          status: nib.status,
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

const { hcb, hcn } = props.data || {};
const { hcb_name } = hcb || {};

const {
  hcn_number: hcnNumberFHC,
  issued_date: issuedDateFHC,
  expired_date: expiredDateFHC,
  scope: scopeFHC,
} = hcn || {};

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
  const { username, status, id, created_at, comment } = item || {};

  return {
    id,
    key: status,
    value: username,
    created_at,
    comment,
  };
});

const trackingFHC = props.datatrackingfhc?.map((item: any) => {
  const { username, status, id, created_at, comment } = item || {};

  return {
    id,
    key: status,
    value: username,
    created_at,
    comment,
  };
});

const headers = [
  { title: "No", key: "no" },
  { title: "Document Types", key: "type" },
  { title: "Download", key: "file" },
  { title: "Notes", key: "comment" },
  { title: "Status", key: "status" },
  { title: "Action", key: "action" },
];

// const previewDocument = async (filename: string) => {
//   try {
//     const response: any = await $api("/shln/submission/document/download", {
//       method: "post",
//       body: {
//         filename,
//       },
//     });

//     window.open(response.url, "_blank", "noopener,noreferrer");
//   } catch (error) {
//     useSnackbar().sendSnackbar("Ada Kesalahan", "error");
//   }
// };

const onRefresh = (type: string) => {
  if (type === "loa") emit("refreshloa");
  else if (type === "fhc") emit("refreshfhc");
};

const latestStatusLoa = computed(() =>
  checkStatusTracking(props.datatrackingloa)
);

const latestStatusFhc = computed(() =>
  checkStatusTracking(props.datatrackingfhc)
);
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
              <p>
                {{
                  item.key.includes("Date") && item.value
                    ? formatDateId(new Date(item.value))
                    : item.value
                }}
              </p>
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
              <p>{{ date ? formatDateId(new Date(date)) : "-" }}</p>
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
                @click="previewDocument(loa_document, 'SHLN_DOC')"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions style="justify-content: end">
          <div>
            <ReturnConfirmationModal
              :id="id"
              :is-disabled="latestStatusLoa === 'returned'"
              documenttype="loa"
              @refresh="onRefresh('loa')"
            />
            <ApproveConfirmationModal
              :id="id"
              :is-disabled="latestStatusLoa === 'verified'"
              documenttype="loa"
              @refresh="onRefresh('loa')"
            />
          </div>
        </VCardActions>
      </VCard>
    </VCol>
    <VCol cols="4">
      <VCard>
        <VCardTitle class="pt-4 pb-0">
          <h3 :class="`${loadingTrackingLoa ? 'mb-2' : ''}`">
            Tracking of LoA
          </h3>
          <VProgressLinear
            v-if="loadingTrackingLoa"
            color="primary"
            indeterminate
          />
        </VCardTitle>
        <VCardItem class="pa-0">
          <VContainer
            :style="
              trackingLOA?.length > 5
                ? 'max-height: 350px; overflow-y: auto'
                : ''
            "
          >
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
                <div v-if="item.comment" class="app-timeline-text mt-1">
                  {{ item.comment }}
                </div>
              </VTimelineItem>
            </VTimeline>
          </VContainer>
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
            <VCol cols="3"> HCB </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ hcb_name }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Halal Certification Number </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ hcnNumberFHC }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Issued Date </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>
                {{
                  issuedDateFHC ? formatDateId(new Date(issuedDateFHC)) : "-"
                }}
              </p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Expired Date </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>
                {{
                  expiredDateFHC ? formatDateId(new Date(expiredDateFHC)) : "-"
                }}
              </p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Scope </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ scopeFHC }}</p>
            </VCol>
          </VRow>
          <VRow style="display: flex; align-items: center">
            <VCol cols="3"> File </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <VBtn
                icon="fa-download"
                density="compact"
                @click="previewDocument(file, 'SHLN_DOC')"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions style="justify-content: end">
          <div>
            <ReturnConfirmationModal
              :id="idFHC"
              :is-disabled="latestStatusFhc === 'returned'"
              documenttype="fhc"
              @refresh="onRefresh('fhc')"
            />
            <ApproveConfirmationModal
              :id="idFHC"
              :is-disabled="latestStatusFhc === 'verified'"
              documenttype="fhc"
              @refresh="onRefresh('fhc')"
            />
          </div>
        </VCardActions>
      </VCard>
    </VCol>
    <VCol cols="4">
      <VCard>
        <VCardTitle class="pt-4 pb-0">
          <h3 :class="`${loadingTrackingFhc ? 'mb-2' : ''}`">
            Tracking of Certificate
          </h3>
          <VProgressLinear
            v-if="loadingTrackingFhc"
            color="primary"
            indeterminate
          />
        </VCardTitle>
        <VCardItem class="pa-0">
          <VContainer
            :style="
              trackingFHC?.length > 5
                ? 'max-height: 240px; overflow-y: auto'
                : ''
            "
          >
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
                <div v-if="item.comment" class="app-timeline-text mt-1">
                  {{ item.comment }}
                </div>
              </VTimelineItem>
            </VTimeline>
          </VContainer>
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
            disable-sort
            :items-per-page-options="[10, 25, 50, 100]"
            :headers="headers"
            :items="dataListDocument"
            :loading="loadingListDocument"
            :items-length="totalItems"
            loading-text="Loading..."
            @update:options="loadItemListDocumentById"
          >
            <template #item.no="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.file="{ item, index }">
              <div class="d-flex align-center justify-center py-3 gap-2">
                <VBtn
                  v-if="(item as any).file != ''"
                  color="primary"
                  @click="previewDocument((item as any).file, 'SHLN_DOC')"
                >
                  <VIcon icon="fa-download" />
                </VBtn>
                <!--
                  <HalalFileInput
                  v-if="(item as any).status != 'Terverifikasi'"
                  v-model="reqFile[index]"
                  :rules="[requiredValidator]"
                  />
                -->
              </div>
            </template>
            <template #item.comment="{ item }">
              <p>
                {{
                  (item as any).comment.length > 20
                    ? `${(item as any).comment.slice(0, 20)}...`
                    : (item as any).comment
                }}
              </p>
            </template>
            <template #item.action="{ item, index }">
              <div class="d-flex gap-1">
                <IconBtn
                  size="small"
                  @click="getReqTrackingModal((item as any).tracking)"
                >
                  <VIcon icon="fa-history" color="primary" />
                </IconBtn>
                <VBtn color="primary" variant="plain">
                  <VIcon>mdi-dots-vertical</VIcon>
                  <VMenu activator="parent" :close-on-content-click="false">
                    <VList>
                      <VListItem>
                        <ApproveVerifikatorShlbDocumentModal
                          :item="item"
                          :reqfile="reqFile[index]"
                          @refresh="loadItemListDocumentById"
                        />
                      </VListItem>
                      <VListItem>
                        <ReturnVerifikatorShlbDocumentModal
                          :item="item"
                          :reqfile="reqFile[index]"
                          @refresh="loadItemListDocumentById"
                        />
                      </VListItem>
                    </VList>
                  </VMenu>
                </VBtn>
              </div>
            </template>
          </VDataTableServer>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <VDialog v-model="reqTrackingModal">
    <VCard>
      <VCardText>
        <p class="text-h5 font-weight-bold">Tracking</p>
        <HalalTimeLine v-if="reqTracking" :event="reqTracking" />
      </VCardText>
    </VCard>
  </VDialog>
</template>
