<script setup lang="ts">
import type {
  ShlnDetail,
  ShlnTracking,
} from "@/pages/sertifikasi-halal/luar-negeri/submission/[id]/index.vue";
import type { MasterCountry } from "@/server/interface/master.iface";

const props = defineProps<{
  event: ShlnDetail;
  tracking: ShlnTracking;
}>();

const country = ref();

const form = ref({
  name: "",
  nib: "",
  nibType: "",
  npwp: "",
  address: "",
  province: "",
  regency: "",
  subDistrict: "",
  halalBody: "",
  country: "",
  companyName: "",
  companyId: "",
  companyCountry: null,
  companyAddress: "",
  halalCertNumber: "",
  issuedDate: null,
  expiredDate: null,
  scope: "",
});

const getCountry = async () => {
  const response: MasterCountry[] = await $api("/master/country", {
    method: "get",
  });

  country.value = response.map((item) => item.name);
};

const formImporter = ref({
  name: "",
  position: "",
  email: "",
  phoneNumber: "",
  address: "",
});

onMounted(async () => {
  await getCountry();
});

const saveForm = () => {
  console.log("Form saved", form.value);
};
</script>

<template>
  <VRow>
    <VCol cols="8">
      <ExpandCard title="Importer" class="mb-6">
        <VForm>
          <VRow>
            <!-- Nama -->
            <VCol cols="12">
              <VTextField v-model="form.name" label="Name" disabled />
            </VCol>

            <!-- NIB and Type -->
            <VCol cols="8">
              <VTextField
                v-model="form.nib"
                label="NIB / Business ID No."
                disabled
              />
            </VCol>
            <VCol cols="4">
              <VSelect
                v-model="form.nibType"
                :items="['API-U', 'API-P']"
                label="Type"
              />
            </VCol>

            <!-- NPWP -->
            <VCol cols="12">
              <VTextField
                v-model="form.npwp"
                label="NPWP / Taxpayer ID No."
                disabled
              />
            </VCol>

            <!-- Address -->
            <VCol cols="12">
              <VTextField v-model="form.address" label="Address" disabled />
            </VCol>

            <!-- Province -->
            <VCol cols="12">
              <VSelect
                v-model="form.province"
                :items="['Province 1', 'Province 2']"
                label="Province"
              />
            </VCol>

            <!-- Regency -->
            <VCol cols="12">
              <VSelect
                v-model="form.regency"
                :items="['Regency 1', 'Regency 2']"
                label="Regency"
              />
            </VCol>

            <!-- Sub District -->
            <VCol cols="12">
              <VSelect
                v-model="form.subDistrict"
                :items="['Sub District 1', 'Sub District 2']"
                label="Sub District"
              />
            </VCol>
            <VDivider class="my-5" />

            <!-- Halal Certification Body -->
            <VCol cols="12">
              <VSelect
                v-model="form.halalBody"
                :items="['Body 1', 'Body 2']"
                label="Halal Certification Body"
              />
            </VCol>

            <!-- Country -->
            <VCol cols="12">
              <VTextField v-model="form.country" label="Country" disabled />
            </VCol>
            <VDivider class="my-5" />

            <!-- Company Name -->
            <VCol cols="12">
              <VTextField v-model="form.companyName" label="Company Name" />
            </VCol>

            <!-- Company ID No -->
            <VCol cols="12">
              <VTextField
                v-model="form.companyId"
                label="Company / Corporate ID No."
              />
            </VCol>

            <!-- Company Country -->
            <VCol cols="12">
              <VSelect
                v-model="form.companyCountry"
                :items="country"
                :rules="[requiredValidator]"
                require
                placeholder="Insert Country"
              />
            </VCol>

            <!-- Company Address -->
            <VCol cols="12">
              <VTextField v-model="form.companyAddress" label="Address" />
            </VCol>
            <VDivider class="my-5" />

            <!-- Halal Certification Number -->
            <VCol cols="12">
              <VTextField
                v-model="form.halalCertNumber"
                label="Halal Certification Number"
              />
            </VCol>

            <!-- Issued Date -->
            <VCol cols="12">
              <VTextField
                v-model="form.issuedDate"
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
                v-model="form.expiredDate"
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
                v-model="form.scope"
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
              <VTextField v-model="formImporter.name" label="Name" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="formImporter.position" label="position" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="formImporter.email" label="email" />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="formImporter.phoneNumber"
                label="Phone Number"
              />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="formImporter.address" label="Address" />
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
