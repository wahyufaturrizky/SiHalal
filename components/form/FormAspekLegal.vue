<script setup lang="ts">
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const aspectLegalHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Jenis", key: "type", nowrap: true },
  { title: "No. Document", key: "documentNumber", nowrap: true },
  { title: "Tanggal", key: "date", nowrap: true },
  { title: "Masa Berlaku", key: "validDate", nowrap: true },
  { title: "Instansi Penerbit", key: "issuer", nowrap: true },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const aspectLegalItems = ref([
  {
    no: 1,
    type: "SIUP",
    documentNumber: "2131421421411",
    date: "09/10/2024",
    validDate: "09/10/2024",
    issuer: "DITJEN PAJAK",
  },
  {
    no: 2,
    type: "NPWP",
    documentNumber: "2131421421411",
    date: "09/10/2024",
    validDate: "09/10/2024",
    issuer: "DITJEN PAJAK",
  },
]);

// TODO -> LOGIC DELETE BY ID
const deleteAspekLegal = (no) => {
  console.log("DELETE ASPEK LEGAL WITH ID : ", no);
};

// TODO -> LOGIC EDIT BY ID
const updateAspekLegal = (form) => {
  console.log("EDIT ASPEK LEGAL : ", form);
};

// TODO -> LOGIC TAMBAH DATA
const saveNewAspekLegal = (form) => {
  console.log("TAMBAH DATA ", form);
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Aspek Legal</span>
      <FormTambahAspekLegal
        :is-editable="props.isEditable"
        @confirm="saveNewAspekLegal"
      />
    </VCardTitle>
    <VCardItem>
      <VDataTable
        disable-sort
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="aspectLegalHeader"
        :items="aspectLegalItems"
      >
        <template #item.date="{ item }">
          {{ item.date ? formatDateId(item.date) : "NA" }}
        </template>

        <template #item.action="{ item }">
          <VBtn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditAspekLegal
                  :is-editable="props.isEditable"
                  :initial-data="item"
                  @confirm="updateAspekLegal"
                />
                <VBtn
                  :disabled="!props.isEditable"
                  variant="text"
                  color="error"
                  prepend-icon="ri-delete-bin-6-line"
                  block
                  @click="deleteAspekLegal(item.no)"
                >
                  Hapus
                </VBtn>
              </VCard>
            </VMenu>
          </VBtn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
