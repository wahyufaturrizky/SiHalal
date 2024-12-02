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
const route = useRoute();
const shlnId = route.params.id;
const prop = defineProps<{
  mra: MRA;
}>();
const loa = ref<LOAData>();
const loadDialog = ref(false);
const loadFhcDialog = ref(false);
const getLoa = async () => {
  try {
    const response = await $api("/shln/submission/document/loa", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    loa.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

// const getMra = async () => {
//   try {
//     const response = await $api("/shln/submission/document/mra", {
//       method: "post",
//       body: {
//         id: shlnId,
//       },
//     });

//     mra.value = response.data;
//   } catch (error) {
//     useSnackbar().sendSnackbar("Ada Kesalahan", "error");
//   }
// };
const refLoaForm = ref<VForm>();
const refFhcForm = ref<VForm>();
const openLoaDialog = () => {
  refLoaForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) loadDialog.value = true;
  });
};
const openFhcDialog = () => {
  refFhcForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) loadFhcDialog.value = true;
  });
};
const uploadDocument = async (type: "loa" | "fhc") => {
  try {
    const formData = new FormData();
    formData.append("id", shlnId);
    formData.append("file", type == "loa" ? loaFile.value : fhcFile.value);
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
    const file = await uploadDocument("loa");
    if (file.code != 2000) {
      return;
    }
    loaForm.value.file_url = file.data.file_url;
    const response = await $api("/shln/submission/document/add-loa", {
      method: "post",
      body: loaForm.value,
    });
    loadDialog.value = false;
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
      return;
    }
    useMyUpdateSubmissionEditStore().setData("document");
    useSnackbar().sendSnackbar("berhasil menyimpan data!", "success");
  } catch (error) {
    loadDialog.value = false;
    useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
  }
};
const saveFhc = async () => {
  try {
    const file = await uploadDocument("fhc");
    if (file.code != 2000) {
      return;
    }
    fhcForm.value.file_url = file.data.file_url;
    const response = await $api("/shln/submission/document/add-fhc", {
      method: "post",
      body: fhcForm.value,
    });
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

onMounted(async () => {
  await Promise.allSettled([getLoa(), getFhcTracking(), getLoaTracking()]);
  loaForm.value.authorized_name = loa.value?.authorized_company;
  loaForm.value.authorizer_name = loa.value?.authorizer_company;
  loaForm.value.letter_number = loa.value?.letter_no;
  loaForm.value.date = loa.value?.date;
  loaForm.value.file_url = loa.value?.loa_document;
});

const saveForm = () => {
  console.log("Form saved", form.value);
};

const tableRequirementDocumentHeader = [
  { title: "No", key: "no" },
  { title: "Document Types", key: "documentTypes" },
  { title: "Upload / Download ", key: "option" },
  { title: "Notes", key: "notes" },
  { title: "status", key: "status" },
  { title: "Record History", key: "recordHistory" },
];

function dateddmmyyy(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
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
          <VCol cols="12">
            <VFileInput
              v-model="loaFile"
              label="Unggah Sertifikat Kompetensi Penyelia Halal"
              outlined
              dense
              accept=".pdf,.jpg,.png"
              class="mb-2"
              :rules="[requiredValidator]"
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
          <VCol cols="12">
            <VFileInput
              v-model="fhcFile"
              label="Unggah Foreign Halal Certificate"
              outlined
              dense
              accept=".pdf,.jpg,.png"
              class="mb-2"
              :rules="[requiredValidator]"
            />
          </VCol>

          <VCol cols="12">
            <!-- Note Title -->
            <p class="text-h5 font-weight-bold">Note</p>

            <!-- Note Box -->
            <VCard outlined>
              <VCardText>
                <p>
                  This is the paragraph inside the box. You can put any content
                  here, such as additional instructions, important information,
                  or any other text you want to highlight in a box.
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
        <HalalTimeLine v-if="loaTracking != undefined" :events="loaTracking" />
      </ExpandCard>

      <ExpandCard title="Tracking of Certificate and Legalization">
        <VSkeletonLoader
          v-if="fhcTracking == undefined"
          :loading="true"
          type="list-item-two-line"
        >
          <VListItem lines="two" subtitle="Subtitle" title="Title" rounded />
        </VSkeletonLoader>
        <HalalTimeLine v-if="fhcTracking != undefined" :events="fhcTracking" />
      </ExpandCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <ExpandCard title="Requirement Document ">
        <VDataTable :headers="tableRequirementDocumentHeader" />

        <VCol cols="12" class="d-flex justify-end ga-2">
          <VBtn
            color="primary"
            @click="saveForm"
            variant="outlined"
            append-icon="ri-download-line"
            >Download FHCR Application Letter Document Format</VBtn
          >
          <VBtn color="primary" @click="saveForm">Save</VBtn>
        </VCol>
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
</template>

<style scoped lang="scss"></style>
