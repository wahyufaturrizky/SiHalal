<script setup lang="ts">
const router = useRouter();

const ingredientHeader: any = [
  { title: "No", key: "index" },
  { title: "ID", key: "id", nowrap: true },
  { title: "Jenis Bahan", key: "jenis_bahan", nowrap: true },
  { title: "Nama Bahan", key: "nama_bahan", nowrap: true },
  { title: "Kelompok", key: "kelompok", nowrap: true },
  { title: "Merek", key: "merek", nowrap: true },
  { title: "Produsen", key: "produsen", nowrap: true },
  {
    title: "Nomor Sertifikat Halal",
    key: "no_sertifikat",
    nowrap: true,
  },
  {
    title: "Tanggal Berlaku",
    key: "tgl_berlaku_sertifikat",
    nowrap: true,
  },
  {
    title: "Verif Pendamping",
    key: "vefified",
    nowrap: true,
  },
  {
    title: "Action",
    key: "actions",
    align: "center",
  },
];
const ingredientData = ref([]);

const route = useRoute();

const deletedId = ref();

const loadBahan = async () => {
  try {
    const options = {
      method: "get",
    };
    const response = await $api(
      `/self-declare/submission/bahan/${route.params.id}/list`,
      options
    );
    ingredientData.value = response.data;
    if (ingredientData.value) {
      ingredientData.value.forEach((val) => {
        selectedIsVefified.value.push(val.vefified);
      });
    }
    // console.log("data bahan = ", response?.data);
  } catch (error) {
    console.log(error);
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const verifiedProduct = computed(() => {
  let count = 0;
  ingredientData.value.forEach((item) => {
    if (item.vefified) count++;
  });
  return count;
});

const isDeleteModalOpen = ref(false);
const selectedDelete = ref();
const selectedIsVefified = ref([]);

const addVefified = (event: any) => {
  console.log("event", selectedIsVefified.value);
};

const handleSaveVerified = async () => {
  const submitedData = {};
  let countKey = 0;
  if (selectedIsVefified.value.length > 0) {
    selectedIsVefified.value.forEach((item, index) => {
      const keyTmp = ingredientData.value[index]?.id;
      console.log("key tmp = ", keyTmp);
      if (keyTmp) {
        submitedData[keyTmp] = item;
        countKey += 1;
      }
    });
  }

  console.log(selectedIsVefified.value);
  if (countKey > 0) {
    console.log(submitedData);
    try {
      const response: any = await $api(
        `/self-declare/submission/bahan/${route.params?.id}/pendamping-verify`,
        {
          method: "post",
          body: JSON.stringify(submitedData),
        }
      );

      if (response.code === 2000) {
        useSnackbar().sendSnackbar(
          "Berhasil menyimpan verifikasi data",
          "success"
        );
      }
      return response;
    } catch (error) {
      console.error(error);
      useSnackbar().sendSnackbar("Gagal menyimpan verifikasi data", "error");
      return null;
    }
  } else {
    useSnackbar().sendSnackbar("Gagal menyimpan verifikasi data", "error");
  }
};

const handleOpenDeleteModal = (index: string) => {
  console.log("deleteed id = ", index);
  deletedId.value = index;
  selectedDelete.value = index;
  isDeleteModalOpen.value = true;
};
const handleDeleteIngredient = async () => {
  try {
    console.log("deleted id 2 =", deletedId.value);
    const response = await $api(
      `/self-declare/submission/bahan/${route.params.id}/delete`,
      {
        method: "post",
        body: {
          id_bahan: deletedId.value,
        },
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Gagal Menghapus bahan", "error");
      return;
    }

    // deleteDialog.value = false;
    useSnackbar().sendSnackbar("Berhasil Menghapus bahan", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal Menghapus bahan", "error");
  } finally {
    await loadBahan();
  }
};

onMounted(async () => {
  await loadBahan();
});
</script>

<template>
  <VCard>
    <VCardTitle class="my-3 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Daftar Nama Bahan dan Kemasan</div>
      <div>
        <TambahBahanModal @loadList="loadBahan()"></TambahBahanModal>
        <VBtn variant="flat" @click="handleSaveVerified">
          <div class="pe-3">
            {{ verifiedProduct ? `Simpan Verif` : "Simpan Verif" }}
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
        <template #item.vefified="{ item, index }">
          <VCheckboxBtn
            @change="addVefified($event)"
            :key="item.id"
            v-model="selectedIsVefified[index]"
          />
        </template>
        <template #item.actions="{ item }">
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
              <VListItem label="Edit Bahan">
                <EditBahanModal
                  :data="{
                    id: item.id,
                    typeBahan: item.kelompok != '' ? 1 : 0,
                    jenis_bahan: item.jenis_bahan,
                    nama_bahan: item.nama_bahan,
                    kelompok: item.kelompok,
                    merek: item.merek,
                    produsen: item.produsen,
                    no_sertifikat: item.no_sertifikat,
                  }"
                  @loadList="loadBahan()"
                >
                  <template #default><p>Edit Bahan</p></template>
                </EditBahanModal>
              </VListItem>

              <VListItem @click="handleOpenDeleteModal(item.id)">
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
