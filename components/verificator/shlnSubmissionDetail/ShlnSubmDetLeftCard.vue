<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const { data } = props || {};
const { importer, hcb, hcn, profile } = data || {};

const importerData = [
  { id: 1, key: "Name", value: importer?.name },
  { id: 2, key: "NIB/Business Id No.", value: profile?.nib },
  { id: 3, key: "API-P/API-U", value: profile?.api_type },
  { id: 4, key: "NPWP/TaxPayer Id No.", value: profile?.npwp },
  { id: 5, key: "Address", value: profile?.address },
  { id: 6, key: "Province", value: profile?.province_name },
  { id: 7, key: "Regency", value: profile?.regency_name },
  { id: 8, key: "Sub-district", value: profile?.sub_district_name },
];

const HCB = [
  {
    id: 1,
    key: "Halal Certification Body (HCB)",
    value: hcb?.hcb_name,
  },
  { id: 2, key: "Company Name", value: hcb?.company_name },
  { id: 3, key: "Company/Corporate Id No.", value: hcb?.corporate_id_number },
  { id: 4, key: "Country", value: hcb?.country },
  { id: 5, key: "Address", value: hcb?.address },
];

const halalCert = [
  { id: 1, key: "Halal Certification Number", value: hcn?.hcn_number },
  { id: 2, key: "Issued Date", value: formatDate(hcn?.issued_date) },
  { id: 3, key: "Expired Date", value: formatDate(hcn?.expired_date) },
  { id: 4, key: "Scope", value: hcn?.scope },
];

const IPC = [
  { id: 1, key: "Name", value: importer?.name },
  { id: 2, key: "Email", value: importer?.email },
  { id: 3, key: "Position", value: importer?.position },
  { id: 4, key: "Phone No.", value: importer?.phone_number },
  { id: 5, key: "Address", value: importer?.address },
];
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>Importer</VCardTitle>
        <VCardText>
          <VRow v-for="item in importerData" :key="item.id" no-gutters>
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
    <VCol cols="12">
      <VCard>
        <VCardTitle>HCB</VCardTitle>
        <VCardText>
          <VRow v-for="item in HCB" :key="item.id" no-gutters>
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
    <VCol cols="12">
      <VCard>
        <VCardTitle>Halal Certificate</VCardTitle>
        <VCardText>
          <VRow v-for="item in halalCert" :key="item.id" no-gutters>
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
    <VCol cols="12">
      <VCard>
        <VCardTitle>Importer's Point of Contact</VCardTitle>
        <VCardText>
          <VRow v-for="item in IPC" :key="item.id" no-gutters>
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
</template>
