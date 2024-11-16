<script setup lang="ts">
const importerData = [
  { id: 1, key: "Name", value: "PT Pangan Lestari" },
  { id: 2, key: "NIB/Business Id No.", value: "81201101890832" },
  { id: 3, key: "API-P/API-U", value: "API-U" },
  { id: 4, key: "NPWP/TaxPayer Id No.", value: "01233123211414121231313" },
  { id: 5, key: "Address", value: "JL. Jenggolo xxxx" },
  { id: 6, key: "Province", value: "Jawa Timur" },
  { id: 7, key: "Regency", value: "Kab Sidoarjo" },
  { id: 8, key: "Sub-district", value: "Sidoarjo" },
];

const HCB = [
  {
    id: 1,
    key: "Halal Certification Body (HCB)",
    value: "Halal Transactions, Inc.",
  },
  { id: 2, key: "Company Name", value: "Tyson Fresh xxx" },
  { id: 3, key: "Company/Corporate Id No.", value: "EST 278" },
  { id: 4, key: "Country", value: "USA" },
  { id: 5, key: "Address", value: "HOLCOMB xxx" },
];

const halalCert = [
  { id: 1, key: "Halal Certification Number", value: "IBSP-HC-REG1025" },
  { id: 2, key: "Issued Date", value: "08/07/2024" },
  { id: 3, key: "Expired Date", value: "07/07/2025" },
  { id: 4, key: "Scope", value: "Food" },
];

const IPC = [
  { id: 1, key: "Name", value: "Eka Putri Ninasari" },
  { id: 2, key: "Email", value: "eka@sekar.co.id" },
  { id: 3, key: "Position", value: "Manager Import" },
  { id: 4, key: "Phone No.", value: "082213600042" },
  { id: 5, key: "Address", value: "Kp. Baru 1 RT002 RW005 xxx" },
];
</script>
<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>Importer</VCardTitle>
        <VCardText>
          <VRow no-gutters v-for="item in importerData" :key="item.id">
            <VCol cols="3">{{ item.key }}</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"
              ><p>{{ item.value }}</p></VCol
            >
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
          <VRow no-gutters v-for="item in HCB" :key="item.id">
            <VCol cols="3">{{ item.key }}</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"
              ><p>{{ item.value }}</p></VCol
            >
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
          <VRow no-gutters v-for="item in halalCert" :key="item.id">
            <VCol cols="3">{{ item.key }}</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"
              ><p>{{ item.value }}</p></VCol
            >
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
          <VRow no-gutters v-for="item in IPC" :key="item.id">
            <VCol cols="3">{{ item.key }}</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"
              ><p>{{ item.value }}</p></VCol
            >
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
