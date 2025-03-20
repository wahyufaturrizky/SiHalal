<script setup lang="ts">
const loadingAll = ref(true);

const ingredientHeader: any = [
  { title: "No", key: "index" },
  // { title: "ID", key: "id", nowrap: true },
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
  // {
  //   title: "Tanggal Berlaku",
  //   key: "tgl_berlaku_sertifikat",
  //   nowrap: true,
  // },
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

const props = defineProps({
  idDetail: {
    required: true,
    type: String,
  },
});
const ingredientData = ref([]);

const route = useRoute();

const deletedId = ref();

const loadBahan = async () => {
  try {
    const options: any = {
      method: "get",
    };
    const response: any = await $api(
      `/self-declare/submission/bahan/${(route.params as any).id}/list`,
      options
    );

    if (response.code === 2000) {
      ingredientData.value = response.data;
      response.data.forEach((val: any) => {
        selectedIsVefified.value.push(val.vefified);
      });

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
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

const addVefified = (event: any) => {};

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
    const response: any = await $api(
      `/self-declare/submission/bahan/${(route.params as any).id}/delete`,
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

    useSnackbar().sendSnackbar("Berhasil Menghapus bahan", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal Menghapus bahan", "error");
  } finally {
    await loadBahan();
  }
};

const statusPengajuan = ref<string>("");
const handleDetail = async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${props.idDetail}/detail`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      // console.log(response.data, "ini data");

      const tracking = response.data.tracking ?? [];
      const lastIndex = tracking.length - 1;

      console.log("result", tracking[lastIndex]?.status);

      statusPengajuan.value = tracking[lastIndex]?.status || "";
      // console.log(statusPengajuan.value, "ini status pengajuan");
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  const res: any = await Promise.all([loadBahan(), handleDetail()]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});
</script>

<template>
  <VCard v-if="!loadingAll">
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
          <VMenu
            v-if="
              statusPengajuan === 'OF1' ||
              statusPengajuan === 'OF280' ||
              statusPengajuan === 'OF285'
            "
          >
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

  <VSkeletonLoader
    type="table-heading, list-item-two-line, image, table-tfoot"
    v-else
  />

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
      position: sticky;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }

    tbody > tr > td:last-of-type {
      position: sticky;
      background: white;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }
  }
}
</style>
