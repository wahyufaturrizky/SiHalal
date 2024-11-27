<script setup lang="ts">
const factoryHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Nama", value: "name" },
  { title: "Alamat", value: "address" },
  { title: "Status", value: "status" },
  { title: "Action", value: "actions", align: "center" },
];
const factoryData = ref([
  {
    name: "My Drink Oke",
    address: "Sumbawa Banget, RT002/RW002, Sumbang, Jawa Barat",
    status: "Milik Sendiri",
  },
]);

const outletHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Nama", value: "name" },
  { title: "Alamat", value: "address" },
  { title: "Action", value: "actions", align: "center" },
];
const outletData = ref([
  {
    name: "My Drink Oke",
    address: "Sumbawa Banget, RT002/RW002, Sumbang, Jawa Barat",
    status: "Milik Sendiri",
  },
]);

const isFormModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const modalUse = ref("CREATE");
const modalType = ref("Pabrik");
const modalTitle = computed(() => {
  return modalUse.value === "CREATE"
    ? `Tambah Data ${modalType.value}`
    : `Ubah Data ${modalType.value}`;
});

const handleOpenFormModal = (type: string) => {
  modalType.value = type;
  isFormModalOpen.value = true;
};
const handleCloseFormModal = (type: string) => {
  const snackbarMsg = type === "CREATE" ? "menambahkan" : "merubah";
  useSnackbar().sendSnackbar(`Berhasil ${snackbarMsg} data`, "success");
};

const deleteType = ref("");
const selectedDelete = ref();

const handleOpenDeleteModal = (type: string, index: number) => {
  deleteType.value = type;
  selectedDelete.value = index;
  isDeleteModalOpen.value = !isDeleteModalOpen.value;
};
const handleDeleteFactory = () => {
  const exist = factoryData.value.findIndex(
    (_, idx) => idx === selectedDelete.value
  );
  factoryData.value.splice(exist, 1);
  useSnackbar().sendSnackbar("Berhasil manghapus data", "success");
};
const handleDeleteOutlet = () => {
  const exist = outletData.value.findIndex(
    (_, idx) => idx === selectedDelete.value
  );
  outletData.value.splice(exist, 1);
  useSnackbar().sendSnackbar("Berhasil manghapus data", "success");
};
</script>

<template>
  <VCard class="mb-10">
    <VCardTitle class="my-3 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Pabrik</div>
      <VBtn variant="outlined" @click="handleOpenFormModal('Pabrik')">
        <div class="pe-3">Tambah</div>
        <VIcon icon="fa-plus" />
      </VBtn>
    </VCardTitle>
    <VCardText>
      <VDataTable
        class="custom-table"
        :headers="factoryHeader"
        :items="factoryData"
        hide-default-footer
      >
        <template #no-data>
          <div class="pt-2">
            <img src="~/assets/images/empty-data.png" alt="" />
            <div class="pt-2 font-weight-bold">Data Kosong</div>
          </div>
        </template>
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.actions="{ index }">
          <div>
            <VIcon
              icon="mdi-delete"
              color="error"
              class="cursor-pointer"
              @click="handleOpenDeleteModal('FACTORY', index)"
            />
          </div>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <VCard>
    <VCardTitle class="my-3 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Outlet</div>
      <VBtn variant="outlined" @click="handleOpenFormModal('Outlet')">
        <div class="pe-3">Tambah</div>
        <VIcon icon="fa-plus" />
      </VBtn>
    </VCardTitle>
    <VCardText>
      <VDataTable
        class="custom-table"
        :headers="outletHeader"
        :items="outletData"
        hide-default-footer
      >
        <template #no-data>
          <div class="pt-2">
            <img src="~/assets/images/empty-data.png" alt="" />
            <div class="pt-2 font-weight-bold">Data Kosong</div>
          </div>
        </template>
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.actions="{ index }">
          <div>
            <VIcon
              icon="mdi-delete"
              color="error"
              class="cursor-pointer"
              @click="handleOpenDeleteModal('OUTLET', index)"
            />
          </div>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <ShSubmissionDetailFormModal
    :dialog-title="modalTitle"
    :dialog-visible="isFormModalOpen"
    :dialog-use="modalUse"
    @update:dialog-visible="isFormModalOpen = $event"
    @submit:commit-action="handleCloseFormModal(modalUse)"
  >
    <VCardText>
      <VForm>
        <VItemGroup v-if="modalType === 'Pabrik'">
          <div class="mb-1 font-weight-bold">Lokasi Pabrik</div>
          <VSelect
            placeholder="Pilih Lokasi Pabrik"
            density="compact"
            rounded="xl"
            menu-icon="fa-chevron-down"
          />
          <br />
        </VItemGroup>
        <VItemGroup>
          <div class="mb-1 font-weight-bold">Nama {{ modalType }}</div>
          <VTextField
            :placeholder="`Isi Nama ${modalType}`"
            density="compact"
            rounded="xl"
          />
        </VItemGroup>
        <br />
        <VItemGroup>
          <div class="mb-1 font-weight-bold">Alamat {{ modalType }}</div>
          <VTextField
            :placeholder="`Isi Alamat ${modalType}`"
            density="compact"
            rounded="xl"
          />
        </VItemGroup>
        <br />
        <VRow>
          <VCol cols="6">
            <VItemGroup>
              <div class="mb-1 font-weight-bold">Kab/Kota</div>
              <VTextField
                placeholder="Isi Kabupaten/Kota"
                density="compact"
                rounded="xl"
              />
            </VItemGroup>
          </VCol>
          <VCol cols="6">
            <VItemGroup>
              <div class="mb-1 font-weight-bold">Provinsi</div>
              <VTextField
                placeholder="Isi Provinsi"
                density="compact"
                rounded="xl"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="6">
            <VItemGroup>
              <div class="mb-1 font-weight-bold">Negara</div>
              <VTextField
                placeholder="Isi Negara"
                density="compact"
                rounded="xl"
              />
            </VItemGroup>
          </VCol>
          <VCol cols="6">
            <VItemGroup>
              <div class="mb-1 font-weight-bold">Kode Pos</div>
              <VTextField
                placeholder="Isi Kode Pos"
                density="compact"
                rounded="xl"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VItemGroup v-if="modalType === 'Pabrik'">
          <br />
          <div class="mb-1 font-weight-bold">Status Pabrik</div>
          <VSelect
            placeholder="Pilih Alamat Pabrik"
            density="compact"
            rounded="xl"
            menu-icon="fa-chevron-down"
          />
        </VItemGroup>
      </VForm>
    </VCardText>
  </ShSubmissionDetailFormModal>
  <ShSubmissionDetailFormModal
    dialog-title="Menghapus Data"
    :dialog-visible="isDeleteModalOpen"
    dialog-use="DELETE"
    @update:dialog-visible="isDeleteModalOpen = $event"
    @submit:commit-action="
      deleteType === 'FACTORY' ? handleDeleteFactory() : handleDeleteOutlet()
    "
  >
    <VCardText>
      <div>Apakah yakin ingin menghapus data ini</div>
    </VCardText>
  </ShSubmissionDetailFormModal>
</template>

<style scoped lang="scss">
:deep(.v-data-table.custom-table > .v-table__wrapper) {
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
