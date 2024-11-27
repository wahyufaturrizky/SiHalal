<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama Bahan", value: "ingr_name" },
  { title: "Status", value: "status" },
  { title: "Temuan", value: "findings" },
  { title: "Keterangan", value: "notes" },
];

const items = [
  {
    ingr_name: "Makanan",
    status: false,
    findings:
      "SH/KH No ID31110000157041021, berlaku s.d 7/12/2025 (Merek ThaiTea dari produsen Food Drink)",
    notes: "",
  },
];

const expanded = [0];
</script>
<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Daftar Nama Bahan</h3></VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VDataTable :headers="tableHeader" :items="items">
          <template #item.status="{ item }">
            <VChip
              v-if="!item.status"
              variant="outlined"
              style="
                color: #e1442e;
                border-radius: 10px;
                background-color: #fcecea;
              "
              color="danger"
              >Diragukan</VChip
            >
            <VChip
              v-if="item.status"
              variant="outlined"
              style="
                color: #49a84c;
                border-radius: 10px;
                background-color: #edf6ed;
              "
              color="success"
              >Tidak Diragukan</VChip
            >
          </template>
        </VDataTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
