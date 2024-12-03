<script setup lang="ts">
import type {
  ShlnDetail,
  ShlnTracking,
} from "@/pages/sertifikasi-halal/luar-negeri/submission/[id]/index.vue";
import type { MasterCountry } from "@/server/interface/master.iface";
import type { VForm } from "vuetify/components/VForm";
export interface IdentityRequest {
  profile: Profile;
  hcb: Hcb;
  hcn: Hcn;
  importer: Importer;
}

interface Profile {
  api_type: string | null;
}

interface Hcb {
  hcb_id: string;
  address: string;
  company_name: string;
  corporate_id_number: string;
  country: string;
}

interface Hcn {
  expired_date: string;
  hcn_number: string;
  issued_date: string;
  scope: string | null;
}

interface Importer {
  address: string;
  email: string;
  name: string;
  phone_number: string;
  position: string;
}

const props = defineProps<{
  event: ShlnDetail;
  hcb: { country: string; id: string; name: string }[];
}>();

const parseISO = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}T${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds()
  ).padStart(2, "0")}Z`;
};
const formatToISO = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toISOString();
};
const country = ref();
const hcbCountry = ref("");
const formIdentity = ref<IdentityRequest>({
  profile: {
    api_type:
      props.event.profile.api_type == "" ? null : props.event.profile.api_type,
  },
  hcb: {
    hcb_id: props.event.hcb.hcb_id == "" ? null : props.event.hcb.hcb_id,
    address: props.event.hcb.address,
    company_name: props.event.hcb.company_name,
    corporate_id_number: props.event.hcb.corporate_id_number,
    country: props.event.hcb.country == "" ? null : props.event.hcb.country,
  },
  hcn: {
    expired_date: parseISO(new Date(props.event.hcn.expired_date)),
    hcn_number: props.event.hcn.hcn_number,
    issued_date: parseISO(new Date(props.event.hcn.issued_date)),
    scope: props.event.hcn.scope == "" ? null : props.event.hcn.scope,
  },
  importer: {
    address: props.event.importer.address,
    email: props.event.importer.email,
    name: props.event.importer.name,
    phone_number: props.event.importer.phone_number,
    position: props.event.importer.position,
  },
});
const route = useRoute();
const shlnId = route.params.id;
const importerPocDialog = ref(false);
const importerDialog = ref(false);
const importerPOCButton = ref(false);
const importerButton = ref(false);
const getCountry = async () => {
  const response: MasterCountry[] = await $api("/master/country", {
    method: "get",
  });

  country.value = response.map((item) => item.name);
};
const scope = ref<{ id: string; name: string }[]>();
const getScope = async () => {
  const response: { id: string; name: string }[] = await $api(
    "shln//submission/identity/scope",
    {
      method: "get",
    }
  );

  scope.value = response;
};
const refImporterPocForm = ref<VForm>();
const openImporterPOCDialog = () => {
  refImporterPocForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) importerPocDialog.value = true;
  });
};
const saveImporterPOC = async () => {
  importerPOCButton.value = true;
  try {
    const response = await $api("/shln/submission/identity/importer-poc", {
      method: "put",
      body: { ...formIdentity.value.importer, id: shlnId },
    });
    importerPocDialog.value = false;
    importerPOCButton.value = false;
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
      return;
    }
    useMyUpdateSubmissionEditStore().setData("identity");
    useSnackbar().sendSnackbar("berhasil menyimpan data!", "success");
  } catch (error) {
    importerPocDialog.value = false;
    useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
  }
};

const refImporterForm = ref<VForm>();
const openImporterDialog = () => {
  refImporterForm.value?.validate().then(({ valid: isValid }) => {
    console.log(isValid);
    if (isValid) importerDialog.value = true;
  });
};
const saveImporter = async () => {
  importerPOCButton.value = true;
  try {
    const response = await $api("/shln/submission/identity/importer", {
      method: "put",
      body: {
        id: shlnId,
        profile: formIdentity.value.profile,
        hcb: formIdentity.value.hcb,
        hcn: {
          expired_date: formatToISO(formIdentity.value.hcn.expired_date),
          hcn_number: formIdentity.value.hcn.hcn_number,
          issued_date: formatToISO(formIdentity.value.hcn.issued_date),
          scope: formIdentity.value.hcn.scope,
        },
      },
    });
    importerDialog.value = false;
    importerPOCButton.value = false;

    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
      return;
    }
    useMyUpdateSubmissionEditStore().setData("identity");
    useSnackbar().sendSnackbar("berhasil menyimpan data!", "success");
  } catch (error) {
    importerDialog.value = false;
    useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
  }
};

const tracking = ref<ShlnTracking[]>();
// const hcb = ref<{ country: string; id: string; name: string }[]>();

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
// const getHcb = async () => {
//   try {
//     const response = await $api("/shln/submission/identity/hcb", {
//       method: "get",
//     });

//     hcb.value = response;
//   } catch (error) {
//     useSnackbar().sendSnackbar("Ada Kesalahan", "error");
//   }
// };
const changeHcb = (item: string) => {
  const country = props.hcb.find((body) => body.id == item).country;
  hcbCountry.value = country;
};

onMounted(async () => {
  await Promise.allSettled([getCountry(), loadTracking(), getScope()]);
  changeHcb(formIdentity.value.hcb.hcb_id);
});

const saveForm = () => {
  // console.log("Form saved", form.value);
};
</script>

<template>
  <VRow>
    <VCol cols="8">
      <ExpandCard title="Importer" class="mb-6">
        <VForm
          class="mt-6"
          ref="refImporterForm"
          @submit.prevent="openImporterDialog"
        >
          <VRow>
            <!-- Nama -->
            <VCol cols="12">
              <VTextField v-model="event.profile.name" label="Name" disabled />
            </VCol>

            <!-- NIB and Type -->
            <VCol cols="8">
              <VTextField
                v-model="event.profile.nib"
                label="NIB / Business ID No."
                disabled
              />
            </VCol>
            <VCol cols="4">
              <VSelect
                v-model="formIdentity.profile.api_type"
                :items="['API-U', 'API-P']"
                label="Type"
                required
                :rules="[requiredValidator]"
              />
            </VCol>

            <!-- NPWP -->
            <VCol cols="12">
              <VTextField
                v-model="event.profile.npwp"
                label="NPWP / Taxpayer ID No."
                disabled
              />
            </VCol>

            <!-- Address -->
            <VCol cols="12">
              <VTextField
                v-model="event.profile.address"
                label="Address"
                disabled
              />
            </VCol>

            <!-- Province -->
            <VCol cols="12">
              <VSelect
                v-model="event.profile.province"
                :items="[event.profile.province]"
                label="Province"
                disabled
              />
            </VCol>

            <!-- Regency -->
            <VCol cols="12">
              <VSelect
                v-model="event.profile.regency"
                :items="[event.profile.regency]"
                label="Regency"
                disabled
              />
            </VCol>

            <!-- Sub District -->
            <VCol cols="12">
              <VSelect
                v-model="event.profile.sub_district"
                :items="[event.profile.sub_district]"
                label="Sub District"
                disabled
              />
            </VCol>
            <VDivider class="my-5" />

            <!-- Halal Certification Body -->
            <VCol cols="12">
              <VSelect
                v-model="formIdentity.hcb.hcb_id"
                :items="hcb"
                item-title="name"
                item-value="id"
                label="Halal Certification Body"
                @update:model-value="changeHcb"
                placeholder="Halal Certification Body"
                required
                :rules="[requiredValidator]"
              />
            </VCol>

            <!-- Country -->
            <VCol cols="12">
              <VTextField v-model="hcbCountry" label="Country" disabled />
            </VCol>
            <VDivider class="my-5" />

            <!-- Company Name -->
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.hcb.company_name"
                label="Company Name"
                required
                :rules="[requiredValidator]"
              />
            </VCol>

            <!-- Company ID No -->
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.hcb.corporate_id_number"
                label="Company / Corporate ID No."
                required
                :rules="[requiredValidator]"
              />
            </VCol>

            <!-- Company Country -->
            <VCol cols="12">
              <VSelect
                v-model="formIdentity.hcb.country"
                :items="country"
                :rules="[requiredValidator]"
                placeholder="Insert Country"
                required
              />
            </VCol>

            <!-- Company Address -->
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.hcb.address"
                label="Address"
                required
                :rules="[requiredValidator]"
              />
            </VCol>
            <VDivider class="my-5" />

            <!-- Halal Certification Number -->
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.hcn.hcn_number"
                label="Halal Certification Number"
                required
                :rules="[requiredValidator]"
              />
            </VCol>

            <!-- Issued Date -->
            <VCol cols="12">
              <!-- <VTextField
                v-model="formIdentity.hcn.issued_date"
                label="Issued Date"
                outlined
                dense
                required
                :rules="[requiredValidator]"
                type="date"
                class="custom-date-input"
              /> -->
              <AppDateTimePicker
                v-model="formIdentity.hcn.issued_date"
                label="Issued Date"
                placeholder="Issued Date"
                required
                :rules="[requiredValidator]"
              />
            </VCol>

            <!-- Expired Date -->
            <VCol cols="12">
              <!-- <VTextField
                v-model="formIdentity.hcn.expired_date"
                label="Expired Date"
                outlined
                dense
                required
                :rules="[requiredValidator]"
                type="date"
                class="custom-date-input"
              /> -->
              <AppDateTimePicker
                v-model="formIdentity.hcn.expired_date"
                label="Expired Date"
                placeholder="Expired Date"
                required
                :rules="[requiredValidator]"
              />
            </VCol>

            <!-- Scope -->
            <VCol cols="12">
              <VSelect
                v-model="formIdentity.hcn.scope"
                :items="scope"
                item-value="id"
                item-title="name"
                label="Scope"
                placeholder="Choose Scope"
                :rules="[requiredValidator]"
                required
              />
            </VCol>

            <!-- Save Button -->
            <VCol cols="12" class="text-right">
              <VBtn color="primary" type="submit"> Save </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </ExpandCard>

      <ExpandCard title="Importer's Point of Contact" class="mb-6">
        <VForm
          ref="refImporterPocForm"
          @submit.prevent="openImporterPOCDialog"
          class="mt-6"
        >
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.importer.name"
                label="Name"
                required
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.importer.position"
                label="position"
                required
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.importer.email"
                label="email"
                required
                :rules="[requiredValidator, emailValidator]"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.importer.phone_number"
                label="Phone Number"
                required
                :rules="[requiredValidator, integerValidator]"
                @input="onlyAcceptNumber"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.importer.address"
                label="Address"
                required
                :rules="[requiredValidator]"
              />
            </VCol>

            <!-- Save Button -->
            <VCol cols="12" class="text-right">
              <VBtn color="primary" type="submit"> Save </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </ExpandCard>
    </VCol>

    <VCol cols="4">
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

  <!-- Importer Dialog -->

  <VDialog v-model="importerDialog" width="auto">
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
            <VBtn
              block
              color="primary"
              :disabled="importerButton"
              @click="saveImporter"
            >
              Yes, Save
            </VBtn>
          </VCol>
          <VCol cols="12" md="auto">
            <VBtn block variant="outlined" @click="importerDialog = false">
              Cancel
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>

  <!-- update dialog importer Poc-->
  <VDialog v-model="importerPocDialog" width="auto">
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
            <VBtn
              block
              color="primary"
              :disabled="importerPOCButton"
              @click="saveImporterPOC"
            >
              Yes, Save
            </VBtn>
          </VCol>
          <VCol cols="12" md="auto">
            <VBtn block variant="outlined" @click="importerPocDialog = false">
              Cancel
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">
/* Custom style for the date input to ensure the calendar icon sticks to the far right */
.custom-date-input .v-input__control {
  position: relative;
}

.custom-date-input input[type="date"] {
  padding-right: 40px; /* Ensure there is space on the right for the icon */
}

.custom-date-input .v-input__icon--append {
  right: 0;
}
</style>
