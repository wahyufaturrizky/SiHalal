<script setup lang="ts">
const deleteDialogVisible = ref(false);
const dialogVisible = ref(false);

const productHeader: any = [
  { title: "No", value: "index" },
  { title: "ID", value: "id", nowrap: true },
  { title: "Jenis Bahan", value: "type", nowrap: true },
  { title: "Nama Bahan", value: "name", nowrap: true },
  { title: "Kelompok", value: "category", nowrap: true },
  { title: "Merek", value: "brand", nowrap: true },
  { title: "Produsen", value: "producer", nowrap: true },
  {
    title: "Nomor Sertifikat Halal",
    value: "certificateNumber",
    nowrap: true,
  },
  {
    title: "Tanggal Berlaku",
    value: "effectiveDate",
    nowrap: true,
  },
  {
    title: "Verif Pendamping",
    value: "isVerified",
    nowrap: true,
  },
  {
    title: "Action",
    value: "actions",
    align: "center",
  },
];
const productData = ref([
  {
    id: "89379868",
    type: "Kopi Luak Ciater",
    name: "Biji Kopi",
    category: "Bahan Nabati",
    brand: "Bahan Nabati",
    producer: "Luakmantuy",
    certificateNumber: "72836/Halal/V",
    effectiveDate: "12/09/2023",
    isVerified: true,
  },
]);

const verifiedProduct = computed(() => {
  let count = 0;
  productData.value.forEach((item) => {
    if (item.isVerified) count++;
  });
  return count;
});

const selectedDelete = ref();
const handleOpenDeleteDialog = (index: number) => {
  selectedDelete.value = index;
  deleteDialogVisible.value = true;
};
const confirmDelete = () => {
  const exist = productData.value.findIndex(
    (i, idx) => idx === selectedDelete.value
  );
  productData.value.splice(exist, 1);
  selectedDelete.value = null;
};

const handleOpenDialog = () => {
  dialogVisible.value = !dialogVisible.value;
};
</script>

<template>
  <VCard>
    <VCardTitle class="my-5 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Daftar Nama Bahan dan Kemasan</div>
      <div>
        <VBtn variant="outlined" class="me-3" @click="handleOpenDialog">
          <div class="pe-3">Tambah</div>
          <VIcon icon="fa-plus" />
        </VBtn>
        <VBtn variant="flat" :color="verifiedProduct ? 'primary' : `#A09BA1`">
          <div class="pe-3">
            {{
              verifiedProduct
                ? `Simpan Verif (${verifiedProduct})`
                : "Simpan Verif"
            }}
          </div>
          <VIcon icon="fa-upload" />
        </VBtn>
      </div>
    </VCardTitle>
    <VCardText>
      <VDataTable
        :headers="productHeader"
        :items="productData"
        fixed-header
        hide-default-footer
      >
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.isVerified="{ item }">
          <VCheckboxBtn v-model="item.isVerified" />
        </template>
        <template #item.actions="props">
          <div>{{ props.column.lastFixed }}</div>
          <VMenu>
            <template #activator="{ props }">
              <VIcon
                icon="fa-ellipsis-v"
                color="primary"
                class="cursor-pointer"
                v-bind="props"
              />
            </template>
            <VList>
              <VListItem prepend-icon="mdi-pencil" title="Ubah" />
              <VListItem @click="handleOpenDeleteDialog(props.index)">
                <template #prepend>
                  <VIcon icon="mdi-delete" color="error" />
                </template>
                <VListItemTitle class="text-error">Hapus</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <ShSubmissionDetailFormModal
    dialog-title="Menghapus Data"
    :dialog-visible="deleteDialogVisible"
    dialog-use="DELETE"
    @update:dialog-visible="deleteDialogVisible = $event"
    @submit:commit-action="confirmDelete"
  >
    <VCardText>
      <div>Apakah yakin ingin menghapus data ini</div>
    </VCardText>
  </ShSubmissionDetailFormModal>
  <ShSubmissionDetailUploadModal
    dialog-title="Tambah Data Bahan"
    :dialog-visible="dialogVisible"
    @update:dialog-visible="dialogVisible = $event"
  />
</template>

<style scoped></style>
