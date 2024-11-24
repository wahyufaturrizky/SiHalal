<script setup lang="ts">
import { VCardItem, VCardTitle, VDataTable } from "vuetify/components";

const tableHeader = [
  { title: "No", value: "no" },
  { title: "Kode Fasilitasi", value: "fac_code" },
  { title: "Tahun", value: "fac_year" },
  { title: "Nama Fasilitasi", value: "fac_name" },
  { title: "Sumber Pembiayaan", value: "fac_sof" },
  { title: "Jenis", value: "fac_kind" },
  { title: "Action", value: "action", align: "center" }, // Kolom Action
];

const tableItems = [
  {
    no: 1,
    fac_code: "TC32400",
    fac_year: 2028,
    fac_name: "Aisyah",
    fac_sof: "JSPOO",
    fac_kind: "Self Declare",
  },
];
</script>

<template>
  <h2>Daftar Fasilitasi</h2>
  <br />
  <VCard>
    <VCardTitle><h3>List Fasilitasi</h3></VCardTitle>
    <VCardItem>
      <VRow>
        <VCol :cols="6">
          <VTextField
            density="compact"
            append-inner-icon="mdi-magnify"
            placeholder="Cari data"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VDataTable
            :headers="tableHeader"
            :items="tableItems"
            item-value="no"
          >
            <template #[`item.action`]="{ item }">
              <VBtn variant="text" icon @click="console.log('Klik:', item)">
                <VIcon>mdi-chevron-right</VIcon>
              </VBtn>
            </template>
          </VDataTable>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>
