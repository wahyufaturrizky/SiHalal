<script setup lang="ts">
const router = useRouter();

const ingredientHeader: any = [
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
const ingredientData = ref([
  {
    id: "89379868",
    type: "Kopi Luak Ciater",
    name: "Biji Kopi",
    category: "Bahan Nabati",
    brand: "Bahan Nabati",
    producer: "Luakmantuy",
    certificateNumber: "72836/Halal/V",
    effectiveDate: "12/09/2023",
    isVerified: false,
  },
]);

const verifiedProduct = computed(() => {
  let count = 0;
  ingredientData.value.forEach((item) => {
    if (item.isVerified) count++;
  });
  return count;
});

const isDeleteModalOpen = ref(false);
const selectedDelete = ref();

const handleSaveVerified = () => {
  useSnackbar().sendSnackbar("Berhasil menyimpan verifikasi data", "success");
};

const handleOpenDeleteModal = (index: number) => {
  selectedDelete.value = index;
  isDeleteModalOpen.value = true;
};
const handleDeleteIngredient = () => {
  const exist = ingredientData.value.findIndex(
    (i, idx) => idx === selectedDelete.value
  );
  ingredientData.value.splice(exist, 1);
  selectedDelete.value = null;
  useSnackbar().sendSnackbar("Berhasil menghapus data", "success");
};
</script>

<template>
  <VCard>
    <VCardTitle class="my-3 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Daftar Nama Bahan dan Kemasan</div>
      <div>
        <VBtn
          variant="outlined"
          class="me-3"
          @click="
            router.push('/sh-domestic/submission/self-declare/edit?tab=4')
          "
        >
          <div class="pe-3">Tambah</div>
          <VIcon icon="fa-plus" />
        </VBtn>
        <VBtn
          variant="flat"
          :color="verifiedProduct ? 'primary' : `#A09BA1`"
          :disabled="verifiedProduct == 0"
          @click="handleSaveVerified"
        >
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
        class="ingredient-table"
        :headers="ingredientHeader"
        :items="ingredientData"
        fixed-header
        :hide-default-footer="ingredientData.length < 10"
      >
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.isVerified="{ item }">
          <VCheckboxBtn v-model="item.isVerified" />
        </template>
        <template #item.actions="props">
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
              <VListItem
                prepend-icon="mdi-pencil"
                title="Ubah"
                @click="
                  router.push('/sh-domestic/submission/self-declare/edit?tab=4')
                "
              />
              <VListItem @click="handleOpenDeleteModal(props.index)">
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
    :dialog-visible="isDeleteModalOpen"
    dialog-use="DELETE"
    @update:dialog-visible="isDeleteModalOpen = $event"
    @submit:commit-action="handleDeleteIngredient"
  >
    <VCardText>
      <div>Apakah yakin ingin menghapus data ini</div>
    </VCardText>
  </ShSubmissionDetailFormModal>
</template>

<style scoped lang="scss">
:deep(.v-data-table.ingredient-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
    }
    tbody > tr > td:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
      background: white;
    }
  }
}
</style>
