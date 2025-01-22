<script setup lang="ts">
import type { FHC } from "@/server/api/shln/submission/document/add-fhc.post";
import type { LOA } from "@/server/api/shln/submission/document/add-loa.post";
import { ref } from "vue";
import { VForm } from "vuetify/components";

export interface MRA {
  country: string;
  expired_date: string;
  halal_institution_name: string;
  issued_date: string;
}
export interface LOAData {
  authorized_company: string;
  authorizer_company: string;
  date: string;
  id: string;
  letter_no: string;
  loa_document: string;
}
export interface FHCData {
  document: string;
  document_no: string;
  file: string;
  id: string;
  verification_link: string;
}

interface RequirementDocument {
  loa: LoaReq;
  nib: NibReq;
}

interface LoaReq {
  comment: string;
  file: string;
  status: string;
  tracking: any;
}

interface NibReq {
  comment: string;
  file: string;
  status: string;
  tracking: any;
}

const route = useRoute();
const shlnId = route.params.id;
const prop = defineProps<{
  mra: MRA;
}>();
const loa = ref<LOAData>({
  authorized_company: "",
  authorizer_company: "",
  date: "",
  id: "",
  letter_no: "",
  loa_document: "",
});
const fhc = ref<FHCData>({
  document: "",
  document_no: "",
  file: "",
  id: "",
  verification_link: "",
});
const loadDialog = ref(false);
const loadFhcDialog = ref(false);
const loadReqDialog = ref(false);
const getLoa = async () => {
  try {
    const response = await $api("/shln/submission/document/loa", {
      method: "post",
      body: {
        id: shlnId,
      },
    });
    if (response.code != 2000) {
      return;
    }
    loa.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const getFhc = async () => {
  try {
    const response = await $api("/shln/submission/document/fhc", {
      method: "post",
      body: {
        id: shlnId,
      },
    });
    if (response.code != 2000) {
      return;
    }
    fhc.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const tableRequirementDocumentHeader = [
  { title: "No", key: "index" },
  { title: "Document Types", key: "documentTypes" },
  { title: "Upload / Download ", key: "file", align: "left" },
  { title: "Notes", key: "notes" },
  { title: "status", key: "status" },
  { title: "Tracking", key: "action" },
];
const requirementDocument = ref<RequirementDocument>();
const requirementDocArray = ref([
  {
    documentTypes: "Business License Number (NIB)",
    file: "",
    notes: "",
    status: "",
    tracking: null,
  },
  {
    documentTypes: "Business License Number (NIB)",
    file: "",
    notes: "",
    status: "",
    tracking: null,
  },
]);
const reqTracking = ref(null);
const reqTrackingModal = ref(false);
const reqFile = ref([]);
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

const refLoaForm = ref<VForm>();
const refFhcForm = ref<VForm>();
const refReqDocForm = ref<VForm>();
const openLoaDialog = () => {
  refLoaForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) loadDialog.value = true;
  });
};
const openReqDialog = () => {
  refReqDocForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) loadReqDialog.value = true;
  });
};
const openFhcDialog = () => {
  refFhcForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) loadFhcDialog.value = true;
  });
};
const uploadDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append("id", shlnId);
    formData.append("file", file);
    formData.append("type", "sample");
    const response = await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    });
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};

const saveLoa = async () => {
  try {
    const file = await uploadDocument(loaFile.value);
    loaFile.value = null;
    if (file.code != 2000) {
      return;
    }
    loaForm.value.file_url = file.data.file_url;
    const response = await $api("/shln/submission/document/add-loa", {
      method: "post",
      body: loaForm.value,
    });
    loadDialog.value = false;
    refLoaForm.value?.resetValidation();
    await getLoa();
    await getLoaTracking();
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
      return;
    }
    useMyUpdateSubmissionEditStore().setData("document");
    useSnackbar().sendSnackbar("berhasil menyimpan data!", "success");
  } catch (error) {
    refLoaForm.value?.resetValidation();
    loadDialog.value = false;
    useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
  }
};
const saveFhc = async () => {
  try {
    const file = await uploadDocument(fhcFile.value);
    fhcFile.value = null;
    if (file.code != 2000) {
      return;
    }
    fhcForm.value.file_url = file.data.file_url;
    const response = await $api("/shln/submission/document/add-fhc", {
      method: "post",
      body: fhcForm.value,
    });
    await getFhc();
    await getFhcTracking();
    refFhcForm.value?.resetValidation();
    loadFhcDialog.value = false;

    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
      return;
    }
    useMyUpdateSubmissionEditStore().setData("document");
    useSnackbar().sendSnackbar("berhasil menyimpan data!", "success");
  } catch (error) {
    loadFhcDialog.value = false;
    useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
  }
};
const saveReqDocument = async () => {
  try {
    const fileLoa = await uploadDocument(reqFile.value[0]);
    if (fileLoa.code != 2000) {
      return;
    }
    const fileNib = await uploadDocument(reqFile.value[1]);
    if (fileNib.code != 2000) {
      return;
    }
    reqFile.value = [];
    const response = await $api("/shln/submission/document/add-requirement", {
      method: "post",
      body: {
        id: shlnId,
        id_loa: "",
        id_nib: "",
        file_url_loa: fileLoa.data.file_url,
        file_url_nib: fileNib.data.file_url,
        comment_loa: "",
        comment_nib: "",
        is_return: false,
        is_accept: false,
      },
    });
    loadReqDialog.value = false;
    refReqDocForm.value?.reset();
    refReqDocForm.value?.resetValidation();

    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
      return;
    }
    await getRequirementDocument();
    useMyUpdateSubmissionEditStore().setData("document");
    useSnackbar().sendSnackbar("berhasil menyimpan data!", "success");
  } catch (error) {
    loadReqDialog.value = false;
    useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
  }
};
const loaFile = ref();
const fhcFile = ref();
const loaForm = ref<LOA>({
  id: shlnId,
  authorizer_name: "",
  authorized_name: "",
  letter_number: "",
  date: "",
  file_url: "",
});
const fhcForm = ref<FHC>({
  id: shlnId,
  file_url: "",
});
interface Tracking {
  comment: string;
  created_at: string;
  id: string;
  status: string;
  username: string;
}
const loaTracking = ref<Tracking[]>();
const fhcTracking = ref<Tracking[]>();

const getLoaTracking = async () => {
  try {
    const response = await $api("/shln/submission/document/tracking/loa", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    loaTracking.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const getFhcTracking = async () => {
  try {
    const response = await $api("/shln/submission/document/tracking/fhc", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    fhcTracking.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const saveForm = () => {
  console.log(reqFile);
  console.log("Form saved", form.value);
};

function dateddmmyyy(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
onMounted(async () => {
  await Promise.allSettled([
    getLoa(),
    getFhc(),
    getFhcTracking(),
    getLoaTracking(),
    getRequirementDocument(),
  ]);
  loaForm.value.authorized_name = loa.value?.authorized_company;
  loaForm.value.authorizer_name = loa.value?.authorizer_company;
  loaForm.value.letter_number = loa.value?.letter_no;
  loaForm.value.date = loa.value?.date;
  loaForm.value.file_url = loa.value?.loa_document;
});
watch(loaFile, (newValue, oldValue) => {
  console.log(newValue);
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <ExpandCard title="Mutual Recognition Agreement / MRA Document ">
        <p>Document for Mutual Halal Certification Recognition</p>
        <InfoRow name="Halal Instituion Name">{{
          mra.halal_institution_name
        }}</InfoRow>
        <InfoRow name="Validity Period">{{
          dateddmmyyy(new Date(mra.expired_date))
        }}</InfoRow>
        <InfoRow name="Country">{{ mra.country }}</InfoRow>
      </ExpandCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <ExpandCard title="Letter Of Authorization / LoA Document " class="mb-4">
        <p>An Appointment Letter from the Exporter to the Importer</p>
        <v-form ref="refLoaForm" @submit.prevent="openLoaDialog">
          <VCol cols="12">
            <VTextField
              v-model="loaForm.authorizer_name"
              label="Authorizer Name"
              required
              :rules="[requiredValidator]"
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model="loaForm.authorized_name"
              label="Authorized Name"
              required
              :rules="[requiredValidator]"
            />
          </VCol>
          <VCol cols="12">
            <Vuepicdatepicker>
              <template #trigger>
                <Vuepicdatepicker
                  v-model:model-value="loaForm.date"
                  auto-apply
                  model-type="dd-MM-yyyy"
                  :enable-time-picker="false"
                  :teleport="true"
                  clearable
                >
                  <template #trigger>
                    <VTextField
                      label="Issued Date"
                      density="compact"
                      prepend-inner-icon="fa-calendar"
                      :model-value="loaForm.date"
                    ></VTextField>
                  </template>
                </Vuepicdatepicker>
              </template>
            </Vuepicdatepicker>
            <!-- <VTextField
              v-model="loaForm.date"
              label="Issued Date"
              outlined
              dense
              required
              type="date"
              class="custom-date-input"
              :rules="[requiredValidator]"
            /> -->
          </VCol>
          <VCol cols="12" class="d-flex align-center gap-5 justify-center">
            <VBtn
              @click="downloadDocument(loa.loa_document)"
              v-if="loa.loa_document != ''"
              color="primary"
            >
              <VIcon icon="fa-download" />
            </VBtn>
            <VFileInput
              v-model="loaFile"
              label="Unggah Sertifikat Kompetensi Penyelia Halal"
              outlined
              dense
              accept=".doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.pdf,.csv"
              class="mb-2"
              :rules="[
                requiredValidator,
                fileExtensionValidator,
                (value) => {
                  return (
                    !value ||
                    !value.length ||
                    value[0].size < 2000000 ||
                    'file maksimum 2MB'
                  );
                },
              ]"
            />
          </VCol>

          <VCol cols="12">
            <!-- Note Title -->
            <p class="text-h5 font-weight-bold">Note</p>

            <!-- Note Box -->
            <VCard outlined>
              <VCardText>
                <p>LoA contains at least:</p>
                <p>
                  Dear [Recipient's Name], I [Your Name], hereby authorize
                  [Recipient's Name] to act on my behalf in [Specify the task or
                  action], effective from [Start Date] to [End Date].
                  [Recipient's Name] is authorized to carry out all essential
                  tasks and make all choices related to [Name the activity or
                  action].
                </p>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" class="text-right">
            <VBtn color="primary" type="submit">Save</VBtn>
          </VCol>
        </v-form>
      </ExpandCard>

      <ExpandCard title="Original of the Foreign Halal Certificate ">
        <v-form ref="refFhcForm" @submit.prevent="openFhcDialog">
          <VCol cols="12" class="d-flex align-center gap-5 justify-center">
            <VBtn
              @click="downloadDocument(fhc.file)"
              v-if="fhc.file != ''"
              color="primary"
            >
              <VIcon icon="fa-download" />
            </VBtn>
            <VFileInput
              v-model="fhcFile"
              label="Unggah Foreign Halal Certificate"
              outlined
              dense
              accept=".doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.pdf,.csv"
              class="mb-2"
              :rules="[
                requiredValidator,
                fileExtensionValidator,
                (value) => {
                  return (
                    !value ||
                    !value.length ||
                    value[0].size < 2000000 ||
                    'file maksimum 2MB'
                  );
                },
              ]"
            />
          </VCol>

          <VCol cols="12">
            <!-- Note Title -->
            <p class="text-h5 font-weight-bold">Note</p>

            <!-- Note Box -->
            <VCard outlined>
              <VCardText>
                <p>
                  If this document uses a anguage other than English, it is
                  mandatory to include the original document and a document
                  translated into English by a sworn translator in the same file
                  Upload the Apostille certificate, Foreign Halal Certificate,
                  and a screenshot of the proof of verification results. If the
                  Apostille certificate cannot be verified online, proof of the
                  results will be substituted by a statement letter in the
                  following format below (Click Here)
                </p>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" class="text-right">
            <VBtn color="primary" type="submit">Save</VBtn>
          </VCol>
        </v-form>
      </ExpandCard>
    </VCol>
    <VCol cols="4">
      <ExpandCard title="Tracking of LOA" class="mb-4">
        <VSkeletonLoader
          v-if="loaTracking == undefined"
          :loading="true"
          type="list-item-two-line"
        >
          <VListItem lines="two" subtitle="Subtitle" title="Title" rounded />
        </VSkeletonLoader>
        <HalalTimeLine v-if="loaTracking != undefined" :event="loaTracking" />
      </ExpandCard>

      <ExpandCard title="Tracking of Certificate and Legalization">
        <VSkeletonLoader
          v-if="fhcTracking == undefined"
          :loading="true"
          type="list-item-two-line"
        >
          <VListItem lines="two" subtitle="Subtitle" title="Title" rounded />
        </VSkeletonLoader>
        <HalalTimeLine v-if="fhcTracking" :event="fhcTracking" />
      </ExpandCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <ExpandCard title="Requirement Document ">
        <v-form ref="refReqDocForm" @submit.prevent="openReqDialog">
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
                  @click="downloadDocument(item.file)"
                  v-if="item.file != ''"
                  color="primary"
                >
                  <VIcon icon="fa-download" />
                </VBtn>
                <HalalFileInput
                  v-model="reqFile[index]"
                  accept=".doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.pdf,.csv"
                  :rules="[
                    requiredValidator,
                    fileExtensionValidator,
                    fileNameLengthValidator,
                    (value) => {
                      return (
                        !value ||
                        !value.length ||
                        value[0].size < 2000000 ||
                        'file maksimum 2MB'
                      );
                    },
                  ]"
                />
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

          <VCol cols="12" class="d-flex justify-end ga-2">
            <VBtn
              color="primary"
              variant="outlined"
              append-icon="ri-download-line"
              @click="
                downloadDocument(
                  '7b6c4e03-9ae0-4ee2-b045-53882314443d_sample_template_surat_permohonan_dan_perpanjangan_rshln (3).docx'
                )
              "
              >Download FHCR Application Letter Document Format</VBtn
            >
            <VBtn color="primary" type="submit">Save</VBtn>
          </VCol>
        </v-form>
      </ExpandCard>
    </VCol>
  </VRow>
  <!-- LOA Dialog -->

  <VDialog v-model="loadDialog" width="auto">
    <VCard>
      <VCardText>
        <p class="text-h5 font-weight-bold">Save</p>
        <VRow>
          <VCol cols="12">
            <div class="text-subtitle-1 text-high-emphasis mb-1">
              Are you sure you want to save this updated data?
            </div>
          </VCol>
        </VRow>
        <VRow class="flex-row-reverse">
          <VCol cols="12" md="auto">
            <VBtn block color="primary" @click="saveLoa()"> Yes, Save </VBtn>
          </VCol>
          <VCol cols="12" md="auto">
            <VBtn block variant="outlined" @click="loadDialog = false">
              Cancel
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>

  <!-- FHC DIALOG -->
  <VDialog v-model="loadFhcDialog" width="auto">
    <VCard>
      <VCardText>
        <p class="text-h5 font-weight-bold">Save</p>
        <VRow>
          <VCol cols="12">
            <div class="text-subtitle-1 text-high-emphasis mb-1">
              Are you sure you want to save this updated data?
            </div>
          </VCol>
        </VRow>
        <VRow class="flex-row-reverse">
          <VCol cols="12" md="auto">
            <VBtn block color="primary" @click="saveFhc()"> Yes, Save </VBtn>
          </VCol>
          <VCol cols="12" md="auto">
            <VBtn block variant="outlined" @click="loadFhcDialog = false">
              Cancel
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
  <VDialog v-model="loadReqDialog" width="auto">
    <VCard>
      <VCardText>
        <p class="text-h5 font-weight-bold">Save</p>
        <VRow>
          <VCol cols="12">
            <div class="text-subtitle-1 text-high-emphasis mb-1">
              Are you sure you want to save this updated data?
            </div>
          </VCol>
        </VRow>
        <VRow class="flex-row-reverse">
          <VCol cols="12" md="auto">
            <VBtn block color="primary" @click="saveReqDocument()">
              Yes, Save
            </VBtn>
          </VCol>
          <VCol cols="12" md="auto">
            <VBtn block variant="outlined" @click="loadReqDialog = false">
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
</template>

<style scoped lang="scss"></style>
