<script setup lang="ts">
import type {
  ShlnDetail,
  ShlnTracking,
} from "@/pages/sertifikasi-halal/luar-negeri/submission/[id]/index.vue";
import type { MasterCountry } from "@/server/interface/master.iface";
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
}>();

const country = ref();
const formIdentity = ref<IdentityRequest>({
  profile: {
    api_type: null,
  },
  hcb: {
    hcb_id: props.event.hcb.hcb_id == "" ? null : props.event.hcb.hcb_id,
    address: props.event.hcb.address,
    company_name: props.event.hcb.company_name,
    corporate_id_number: props.event.hcb.corporate_id_number,
    country: props.event.hcb.country,
  },
  hcn: {
    expired_date: "",
    hcn_number: "",
    issued_date: "",
    scope: null,
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
const getCountry = async () => {
  const response: MasterCountry[] = await $api("/master/country", {
    method: "get",
  });

  country.value = response.map((item) => item.name);
};
const tracking = ref<ShlnTracking[]>();
const hcb = ref<{ country: string; id: string; name: string }[]>();

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
const getHcb = async () => {
  try {
    const response = await $api("/shln/submission/identity/hcb", {
      method: "get",
    });

    hcb.value = response;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const changeHcb = (item: string) => {
  const country = hcb.value?.find((body) => (body.id = item))?.country;
  console.log(country);
  formIdentity.value.hcb.country = country;
};

onMounted(async () => {
  await Promise.allSettled([getCountry(), loadTracking(), getHcb()]);
});

const saveForm = () => {
  // console.log("Form saved", form.value);
};
</script>

<template>
  <VRow>
    <VCol cols="8">
      <ExpandCard title="Importer" class="mb-6">
        <VForm class="mt-6">
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
              />
            </VCol>

            <!-- Country -->
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.hcb.country"
                label="Country"
                disabled
              />
            </VCol>
            <VDivider class="my-5" />

            <!-- Company Name -->
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.hcb.company_name"
                label="Company Name"
              />
            </VCol>

            <!-- Company ID No -->
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.hcb.corporate_id_number"
                label="Company / Corporate ID No."
              />
            </VCol>

            <!-- Company Country -->
            <VCol cols="12">
              <VSelect
                v-model="formIdentity.hcb.country"
                :items="country"
                :rules="[requiredValidator]"
                require
                placeholder="Insert Country"
              />
            </VCol>

            <!-- Company Address -->
            <VCol cols="12">
              <VTextField v-model="formIdentity.hcb.address" label="Address" />
            </VCol>
            <VDivider class="my-5" />

            <!-- Halal Certification Number -->
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.hcn.hcn_number"
                label="Halal Certification Number"
              />
            </VCol>

            <!-- Issued Date -->
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.hcn.issued_date"
                label="Issued Date"
                outlined
                dense
                required
                type="date"
                class="custom-date-input"
              />
            </VCol>

            <!-- Expired Date -->
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.hcn.expired_date"
                label="Expired Date"
                outlined
                dense
                required
                type="date"
                class="custom-date-input"
              />
            </VCol>

            <!-- Scope -->
            <VCol cols="12">
              <VSelect
                v-model="formIdentity.hcn.scope"
                :items="['Scope 1', 'Scope 2']"
                label="Scope"
              />
            </VCol>

            <!-- Save Button -->
            <VCol cols="12" class="text-right">
              <VBtn color="primary" @click="saveForm"> Save </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </ExpandCard>

      <ExpandCard title="Importer's Point of Contact" class="mb-6">
        <VForm>
          <VRow>
            <VCol cols="12">
              <VTextField v-model="formIdentity.importer.name" label="Name" />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.importer.position"
                label="position"
              />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="formIdentity.importer.email" label="email" />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.importer.phone_number"
                label="Phone Number"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="formIdentity.importer.address"
                label="Address"
              />
            </VCol>

            <!-- Save Button -->
            <VCol cols="12" class="text-right">
              <VBtn color="primary" @click="saveForm"> Save </VBtn>
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
