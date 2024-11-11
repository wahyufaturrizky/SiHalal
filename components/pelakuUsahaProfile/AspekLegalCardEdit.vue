<script setup lang="ts">
import AspekLegalModal from "@/views/pages/pelaku-usaha/AspekLegalModal.vue";

const panelOpen = ref(0);

const legalHeader = [
  { title: "No", key: "no", align: "start" },
  { title: "Jenis", key: "kind" },
  { title: "No. Dokumen", key: "no_docs" },
  { title: "Tanggal", key: "date" },
  { title: "Masa Berlaku", key: "exp_date" },
  { title: "Action", key: "action", align: "end" },
];

const legalData = ref([
  {
    no: 1,
    kind: "SIUP",
    no_docs: "0128749286836",
    date: "01/10/2024",
    exp_date: "09/10/2024",
  },
  {
    no: 2,
    kind: "NPWP",
    no_docs: "1231234989871345490",
    date: "-",
    exp_date: "-",
  },
  {
    no: 3,
    kind: "NIB",
    no_docs: "3947298572986",
    date: "13/10/2019",
    exp_date: "30/09/2023",
  },
]);

function handleEdit(item) {
  console.log("Edit item:", item);
}

function handleDelete(item) {
  console.log("Delete item:", item);
}

const handleAddAspekLegalConfirm = (formData) => {
  console.log("Add confirmed:", formData);
};

const handleEditAspekLegalConfirm = (formData) => {
  console.log("Edit confirmed:", formData);
};

const initialDataAspekLegal = {
  jenisDocument: "SIUP",
  nomorDocument: "123456",
  tanggalDocument: "2024-11-01",
  masaBerlaku: "2025-11-01",
  instansiPenerbit: "Instansi XYZ",
};
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h2>Aspek Legal</h2>
      </VExpansionPanelTitle>

      <VExpansionPanelText>
        <div class="d-flex justify-end mb-4">
          <AspekLegalModal
            mode="add"
            @confirm-add="handleAddAspekLegalConfirm"
            @cancel="() => console.log('Add cancelled')"
          />
        </div>
        <VDataTable
          :headers="legalHeader"
          :items="legalData"
          item-value="no"
          class="elevation-1"
        >
          <template #[`item.action`]="{ item }">
            <VMenu>
              <template #activator="{ props }">
                <VBtn icon variant="text" v-bind="props">
                  <VIcon>mdi-dots-vertical</VIcon>
                </VBtn>
              </template>
              <VList>
                <VListItem>
                  <VListItemTitle>
                    <VIcon class="mr-2"> mdi-pencil </VIcon>
                    Ubah
                  </VListItemTitle>
                </VListItem>
                <VListItem>
                  <VListItemTitle class="text-red">
                    <VIcon color="red" class="mr-2"> mdi-delete </VIcon>
                    Hapus
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </template>
        </VDataTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped>
.d-flex {
  display: flex;
}

.justify-end {
  justify-content: flex-end;
}

.mb-4 {
  margin-block-end: 16px;
}

.text-red {
  color: red;
}
</style>
