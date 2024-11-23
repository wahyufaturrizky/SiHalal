<script setup lang="ts">
const dialogVisible = ref(false);
const dialogUse = ref("CREATE");
const dialogType = ref("Pabrik");
const factoryHeader = [
  { title: "No", value: "index" },
  { title: "nama", value: "name" },
  { title: "Alamat", value: "address" },
  { title: "Status", value: "status" },
  { title: "Action", value: "actions" },
];
const outletHeader = [
  { title: "No", value: "index" },
  { title: "nama", value: "name" },
  { title: "Alamat", value: "address" },
  { title: "Action", value: "actions" },
];

const factoryData = ref([
  {
    name: "My Drink Oke",
    address: "Sumbawa Banget, RT002/RW002, Sumbang, Jawa Barat",
    status: "Milik Sendiri",
  },
]);
const outletData = ref([
  {
    name: "My Drink Oke",
    address: "Sumbawa Banget, RT002/RW002, Sumbang, Jawa Barat",
    status: "Milik Sendiri",
  },
]);

const handleDeleteFactory = (index: number) => {
  const exist = factoryData.value.findIndex((i, idx) => idx === index);
  factoryData.value.splice(exist, 1);
};
const handleDeleteOutlet = (index: number) => {
  const exist = outletData.value.findIndex((i, idx) => idx === index);
  outletData.value.splice(exist, 1);
};

const handleOpenDialog = (type: string) => {
  dialogType.value = type;
  dialogVisible.value = true;
};
</script>

<template>
  <VCard class="mb-10">
    <VCardTitle class="my-5 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Pabrik</div>
      <VBtn variant="outlined" @click="handleOpenDialog('Pabrik')">
        <div class="pe-3">Tambah</div>
        <VIcon icon="fa-plus" />
      </VBtn>
    </VCardTitle>
    <VCardText>
      <VDataTable
        :headers="factoryHeader"
        :items="factoryData"
        hide-default-footer
      >
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.actions="{ index }">
          <div>
            <VIcon
              icon="mdi-delete"
              color="error"
              class="cursor-pointer"
              @click="handleDeleteFactory(index)"
            />
          </div>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <VCard>
    <VCardTitle class="my-5 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Outlet</div>
      <VBtn variant="outlined" @click="handleOpenDialog('Outlet')">
        <div class="pe-3">Tambah</div>
        <VIcon icon="fa-plus" />
      </VBtn>
    </VCardTitle>
    <VCardText>
      <VDataTable
        :headers="outletHeader"
        :items="outletData"
        hide-default-footer
      >
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.actions="{ index }">
          <div>
            <VIcon
              icon="mdi-delete"
              color="error"
              class="cursor-pointer"
              @click="handleDeleteOutlet(index)"
            />
          </div>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <FactoryAndOutletModal
    :dialog-visible="dialogVisible"
    :dialog-use="dialogUse"
    :dialog-type="dialogType"
    @update:dialog-visible="dialogVisible = $event"
  />
</template>

<style scoped></style>
