<script setup lang="ts">
import { statusItemPelakuUsaha } from "@/server/utils/statusPelakuUsaha";

export interface ShlnDetail {
  hcb: Hcb;
  hcn: Hcn;
  id: string;
  importer: Importer;
  products: Product[];
  profile: Profile;
}
interface Hcb {
  address: string;
  company_name: string;
  corporate_id_number: string;
  country: string;
  hcb_id: string;
}
interface Product {
  hs_code: string;
  name: string;
}

interface Hcn {
  expired_date: string;
  hcn_number: string;
  issued_date: string;
  scope: string;
}

interface Importer {
  address: string;
  email: string;
  name: string;
  phone_number: string;
  position: string;
}

interface Profile {
  address: string;
  api_type: string;
  name: string;
  nib: string;
  npwp: string;
  province: string;
  regency: string;
  sub_district: string;
}
export interface ShlnTracking {
  created_at: string;
  id: string;
  status: string;
  username: string;
  comment: string;
}
export interface ShlnRegistration {
  download_file: string;
  expired_date: string;
  issued_date: string;
  registration_number: string;
  status: string;
  submission_number: string;
}

const route = useRoute();
const shlnId = route.params.id;
const deleteDialog = ref(false);

const deleteItem = () => {
  deleteDialog.value = true;
};

const submitDialog = ref(false);

const submitItem = () => {
  submitDialog.value = true;
};

const deleteSubmission = async () => {
  try {
    const response = await $api("/shln/submission/delete", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    if (response.code != 2000) {
      deleteDialog.value = false;
      useSnackbar().sendSnackbar("gagal menghapus data", "error");
      return;
    }
    deleteDialog.value = false;
    useSnackbar().sendSnackbar("Berhasil menghapus data", "success");
    navigateTo("/sertifikasi-halal/luar-negeri/submission");
  } catch (error) {
    deleteDialog.value = false;
    useSnackbar().sendSnackbar("Ada Kecsalahan", "error");
  }
};
const submitShln = async () => {
  try {
    const response = await $api("/shln/submission/submit", {
      method: "post",
      body: {
        id: shlnId,
      },
    });
    if (response.code != 2000) {
      submitDialog.value = false;
      if (response.code == 500) {
        useSnackbar().sendSnackbar(
          response.errors.list_error.join(", "),
          "error"
        );
        return;
      }
      useSnackbar().sendSnackbar("gagal submit data", "error");

      return;
    }
    submitDialog.value = false;

    useSnackbar().sendSnackbar("Berhasil submit data", "success");
    navigateTo("/sertifikasi-halal/luar-negeri/submission");
  } catch (error) {
    submitDialog.value = false;
    useSnackbar().sendSnackbar("Ada Kecsalahan", "error");
  }
};

const editItem = () => {
  navigateTo(`/sertifikasi-halal/luar-negeri/submission/${shlnId}/edit`);
};

const headersProduct = [
  { title: "No", key: "index", align: "start" },
  { title: "Product Name", key: "name", align: "start" },
  { title: "HS Code", key: "hs_code", align: "start" },
];

const headersDocument = [
  { title: "No", key: "index", align: "start" },
  { title: "Document Type", key: "document_type", align: "start" },
  { title: "Upload", key: "download", align: "start" },
  { title: "notes", key: "notes", align: "start" },
  { title: "status", key: "status", align: "start" },
  { title: "Action", key: "action", align: "start" },
];

const formatDate = new Intl.DateTimeFormat("en-GB");
const item = ref<ShlnDetail>();
const tracking = ref<ShlnTracking[]>();
const registration = ref<ShlnRegistration>();

const loadItem = async () => {
  try {
    const response = await $api("/shln/submission/detail", {
      method: "post",
      body: {
        id: shlnId,
      },
    });
    console.log("ini data item ", response);
    if (response.code == 500) {
      navigateTo("/sertifikasi-halal/luar-negeri/submission");
      return;
    }
    item.value = response.data;
  } catch (error) {
    console.log("ini data item ", error.data);

    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadTracking = async () => {
  try {
    const response = await $api("/shln/submission/tracking", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    tracking.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadRegistration = async () => {
  try {
    const response = await $api("/shln/submission/registration", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    registration.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const requirementDocument = ref<RequirementDocument>();
const requirementDocArray = ref([
  {
    documentTypes: "Business License Number (NIB)",
    file: "",
    notes: "",
    status: "",
    tracking: "",
  },
  {
    documentTypes: "Business License Number (NIB)",
    file: "",
    notes: "",
    status: "",
    tracking: "",
  },
]);
const tableRequirementDocumentHeader = [
  { title: "No", key: "index" },
  { title: "Document Types", key: "documentTypes" },
  { title: "Download ", key: "file", align: "left" },
  { title: "Notes", key: "notes" },
  { title: "status", key: "status" },
  { title: "Tracking", key: "action" },
];
const reqTracking = ref(null);
const reqTrackingModal = ref(false);
const getRequirementDocument = async () => {
  try {
    const response = await $api(
      "/shln/submission/document/requirement-document",
      {
        method: "post",
        body: {
          id: shlnId,
        },
      }
    );

    requirementDocument.value = response.data.requirement_doc;
    requirementDocArray.value[0] = {
      documentTypes: "Letter Of Application",
      file: requirementDocument.value?.loa.file,
      notes: requirementDocument.value?.loa.comment,
      status: requirementDocument.value?.loa.status,
      tracking: requirementDocument.value?.loa.tracking,
    };
    requirementDocArray.value[1] = {
      documentTypes: "Business License Number (NIB)",
      file: requirementDocument.value?.nib.file,
      notes: requirementDocument.value?.nib.comment,
      status: requirementDocument.value?.nib.status,
      tracking: requirementDocument.value?.nib.tracking,
    };
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const getReqTrackingModal = (data) => {
  reqTracking.value = data;
  reqTrackingModal.value = true;
};
const downloadFile = async (filename: string) => {
  try {
    const response = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename,
      },
    });
    window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const pageProduct = ref(1);
const itemPerPageProduct = ref(10);
onMounted(() => {
  Promise.allSettled([
    loadItem(),
    loadTracking(),
    loadRegistration(),
    getRequirementDocument(),
  ]);
});

const productItems = [
  {
    No: "xxx",
    "Product Name ": "xxxx",
    "HS Code ": "xxxxx",
    Delete: "xxxxx",
  },
];

const documentItems = [
  {
    document_type: "Letter of Application",
    upload: "",
  },
  {
    document_type: "Business License Number (NIB) ",
    upload: "",
  },
];

const timelineEvents = ref([
  {
    time: "5pm",
    title: "New Icon",
    description: "Mobile App",
    dotColor: "pink",
  },
  {
    time: "3-4pm",
    title: "Design Stand Up",
    description: "Hangouts",
    dotColor: "teal-lighten-3",
  },
  { time: "12pm", title: "Lunch break", dotColor: "pink" },
  {
    time: "9-11am",
    title: "Finish Home Screen",
    description: "Web App",
    dotColor: "teal-lighten-3",
  },
]);

const getDocShln = async (pathname: string) => {
  try {
    const response = await $api("/shln/submission/document/doc-shln", {
      method: "get",
      query: {
        filename: pathname,
        param: "dirName=SERT",
      },
    });
    if (response?.url) {
      window.open(response?.url, "_blank", "noopener,noreferrer");
    }
  } catch (error) {
    useSnackbar().sendSnackbar(
      "NIB tidak ditemukan, silahkan perbaharui data NIB Pelaku Usaha",
      "error"
    );
  }
};
</script>

<template>
  <div>
    <KembaliButton />
    <VRow>
      <VCol cols="8">
        <p class="text-h4">Foreign Halal Certificate Registration Submission</p>
      </VCol>
      <VCol cols="4">
        <VRow justify="end" class="gap-1">
          <VCol
            cols="auto"
            v-if="
              registration?.status_code == 'OF1' ||
              registration?.status_code == 'OF2'
            "
          >
            <VBtn variant="outlined" color="error" @click="deleteItem">
              <VIcon icon="ri-delete-bin-6-line" />
            </VBtn>
          </VCol>
          <VCol
            cols="auto"
            v-if="
              registration?.status_code == 'OF1' ||
              registration?.status_code == 'OF2'
            "
          >
            <VBtn
              variant="outlined"
              color="primary"
              append-icon="ri-edit-line"
              @click="editItem"
            >
              Edit
            </VBtn>
          </VCol>
          <VCol
            cols="auto"
            v-if="
              registration?.status_code == 'OF1' ||
              registration?.status_code == 'OF2'
            "
          >
            <VBtn
              variant="outlined"
              color="primary"
              append-icon="ri-send-plane-line"
              @click="submitItem"
            >
              Submit
            </VBtn>
          </VCol>
        </VRow>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="8">
        <ExpandCard title="Importer" class="mb-6">
          <InfoRow name="Name">
            {{ item?.profile.name }}
          </InfoRow>
          <InfoRow name="NIB/ Business Id No.">
            {{ item?.profile.nib }}
          </InfoRow>
          <InfoRow name="API-P / API-U">
            {{ item?.profile.api_type }}
          </InfoRow>
          <InfoRow name="NPWP / Taxpayer Id No.">
            {{ item?.profile.npwp }}
          </InfoRow>
          <InfoRow name="Address">
            {{ item?.profile.address }}
          </InfoRow>
          <InfoRow name="Province">
            {{ item?.profile.province }}
          </InfoRow>
          <InfoRow name="Regence">
            {{ item?.profile.regency }}
          </InfoRow>
          <InfoRow name="Sub-District">
            {{ item?.profile.sub_district }}
          </InfoRow>
          <ThinLine :thickness="1" />
          <InfoRow name="Halal Certification Body (HCB)">
            {{ item?.hcb.hcb_id }}
          </InfoRow>
          <ThinLine :thickness="1" />
          <InfoRow name="Company Name">
            {{ item?.hcb.company_name }}
          </InfoRow>
          <InfoRow name="Company / Corporate Id No. ">
            {{ item?.hcb.corporate_id_number }}
          </InfoRow>
          <InfoRow name="Country">
            {{ item?.hcb.country }}
          </InfoRow>
          <InfoRow name="Address">
            {{ item?.hcb.address }}
          </InfoRow>
          <ThinLine :thickness="1" />
          <InfoRow name="Halal Certification Number">
            {{ item?.hcn.hcn_number }}
          </InfoRow>
          <InfoRow name="Issued Date">
            {{ item?.hcn.issued_date }}
          </InfoRow>
          <InfoRow name="Expired Date">
            {{ item?.hcn.expired_date }}
          </InfoRow>
          <InfoRow name="Scope">
            {{ item?.hcn.scope }}
          </InfoRow>
        </ExpandCard>

        <ExpandCard title="Importer's Point of Contract" class="mb-6">
          <InfoRow name="Name">
            {{ item?.importer.name }}
          </InfoRow>
          <InfoRow name="Position">
            {{ item?.importer.position }}
          </InfoRow>
          <InfoRow name="Email">
            {{ item?.importer.email }}
          </InfoRow>
          <InfoRow name="Phone No.">
            {{ item?.importer.phone_number }}
          </InfoRow>
          <InfoRow name="Address">
            {{ item?.importer.address }}
          </InfoRow>
        </ExpandCard>

        <ExpandCard title="Products" class="mb-6">
          <VDataTable
            :headers="headersProduct"
            v-model:page="pageProduct"
            v-model:items-per-page="itemPerPageProduct"
            :items="item?.products != null ? item.products : []"
          >
            <template #item.index="{ index }">
              {{ index + 1 + (pageProduct - 1) * itemPerPageProduct }}
            </template>
          </VDataTable>
        </ExpandCard>
        <ExpandCard title="Requirement Document" class="mb-6">
          <VDataTable
            :items="requirementDocArray"
            :headers="tableRequirementDocumentHeader"
          >
            <template #item.index="{ index }">
              {{ index + 1 }}
            </template>
            <template #item.file="{ item, index }">
              <div class="d-flex align-center justify-center py-3 gap-2">
                <VBtn
                  @click="downloadDocument(item.file, 'SHLN_DOC')"
                  v-if="item.file != ''"
                  color="primary"
                >
                  <VIcon icon="fa-download" />
                </VBtn>
              </div>
              <!-- {{ item.file != "" ? "asd" : "dsa" }} -->
            </template>
            <template #item.action="{ item }">
              <div class="d-flex gap-1">
                <IconBtn
                  size="small"
                  @click="getReqTrackingModal(item.tracking)"
                >
                  <VIcon icon="fa-history" color="primary" />
                </IconBtn>
              </div>
            </template>
          </VDataTable>
        </ExpandCard>
      </VCol>

      <VCol cols="4">
        <ExpandCard title="Registration Data" class="mb-6">
          <InfoRow name="Submission Number">
            {{ registration?.submission_number }}
          </InfoRow>
          <InfoRow name="Halal Registration Number">
            {{ registration?.registration_number }}
          </InfoRow>
          <InfoRow name="IssuedDate">
            {{ registration?.issued_date }}
          </InfoRow>
          <InfoRow name="Expired Date">
            {{ registration?.expired_date }}
          </InfoRow>
          <InfoRow name="Status">
            <VChip
              :color="statusItemPelakuUsaha[registration?.status_code].color"
            >
              {{ statusItemPelakuUsaha[registration?.status_code].desc }}
            </VChip>
          </InfoRow>
          <InfoRow name="Download Halal Registration Number">
            <VBtn
              @click="
                registration?.file_tte !== ''
                  ? getDocShln(registration?.file_tte)
                  : () => {}
              "
              target="_blank"
            >
              <VIcon icon="ri-download-line" />
            </VBtn>
          </InfoRow>
          <InfoRow name="Download QR Label">
            <VBtn
              @click="
                registration?.status_code == 'OF300'
                  ? downloadCert(registration?.registration_number)
                  : () => {}
              "
              target="_blank"
            >
              <VIcon icon="ri-download-line" />
            </VBtn>
          </InfoRow>
        </ExpandCard>

        <ExpandCard title="Tracking">
          <VSkeletonLoader
            v-if="tracking == undefined"
            :loading="true"
            type="list-item-two-line"
          >
            <VListItem lines="two" subtitle="Subtitle" title="Title" rounded />
          </VSkeletonLoader>
          <HalalTimeLine v-if="tracking != undefined" :event="tracking" />
        </ExpandCard>
      </VCol>
    </VRow>
    <VDialog v-model="deleteDialog" width="auto">
      <VCard>
        <VCardText>
          <p class="text-h5 font-weight-bold">Delete Submission</p>
          <VRow>
            <VCol cols="12">
              <div class="text-subtitle-1 text-high-emphasis mb-1">
                Are you sure you want to delete this submission?
              </div>
            </VCol>
          </VRow>
          <VRow class="flex-row-reverse">
            <VCol cols="12" md="auto">
              <VBtn block color="error" @click="deleteSubmission">
                Delete
              </VBtn>
            </VCol>
            <VCol cols="12" md="auto">
              <VBtn block variant="outlined" @click="deleteDialog = false">
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <VDialog v-model="submitDialog" width="auto">
      <VCard>
        <VCardText>
          <p class="text-h5 font-weight-bold">Delete Submission</p>
          <VRow>
            <VCol cols="12">
              <div class="text-subtitle-1 text-high-emphasis mb-1">
                Are you sure you want to submit this requirement submission?
              </div>
            </VCol>
          </VRow>
          <VRow class="flex-row-reverse">
            <VCol cols="12" md="auto">
              <VBtn block color="primary" @click="submitShln"> Submit </VBtn>
            </VCol>
            <VCol cols="12" md="auto">
              <VBtn block variant="outlined" @click="submitDialog = false">
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <VDialog v-model="reqTrackingModal" width="auto">
      <v-card>
        <v-card-text>
          <p class="text-h5 font-weight-bold">Tracking</p>
          <HalalTimeLine v-if="reqTracking" :event="reqTracking" />
        </v-card-text>
      </v-card>
    </VDialog>
  </div>
</template>

<style scoped lang="scss"></style>
