<script setup lang="ts">
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const pabrikHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "Alamat", key: "address" },
  { title: "Status", key: "status" },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const pabrikItem = ref([
  {
    no: 1,
    location: "1",
    name: "My Drink Ok",
    address: "Sumbawa banget, RT 002/ RW 002, Sumbang, Jawa barat",
    regency: "Sedulur ",
    province: "Jabar",
    country: "Indonesia",
    zipCode: "12212",
    status: "Milik Sendiri",
  },
  {
    no: 2,
    location: "2",
    name: "My Drink No Ok",
    address: "Sumbawa banget, RT 002/ RW 002, Sumbang, Jawa barat",
    regency: "Sedulur ",
    province: "Jabar",
    country: "Indonesia",
    zipCode: "12212",
    status: "Publik",
  },
]);

// TODO -> LOGIC DELETE BY ID
const remove = (no) => {
  console.log("DELETE WITH ID : ", no);
};

// TODO -> LOGIC EDIT BY ID
const update = (form) => {
  console.log("EDIT  : ", form);
};

// TODO -> LOGIC TAMBAH DATA
const save = (form) => {
  console.log("TAMBAH DATA ", form);
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Pabrik</span>
      <FormTambahPabrik :is-editable="props.isEditable" @confirm="save" />
    </VCardTitle>
    <VCardItem>
      <VDataTable
        disable-sort
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="pabrikHeader"
        :items="pabrikItem"
      >
        <template #item.action="{ item }">
          <v-btn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditPabrik
                  :is-editable="props.isEditable"
                  :initial-data="item"
                  @confirm="update"
                />
                <VBtn
                  :disabled="!props.isEditable"
                  variant="text"
                  color="error"
                  prepend-icon="ri-delete-bin-6-line"
                  @click="remove(item.no)"
                  block
                >
                  Hapus
                </VBtn>
              </VCard>
            </VMenu>
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
