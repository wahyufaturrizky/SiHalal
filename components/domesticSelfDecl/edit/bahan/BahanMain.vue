<script setup lang="ts">
const { hideVerifikasiPendamping } = defineProps({
  hideVerifikasiPendamping: {
    type: Boolean,
  },
  canNotEdit: {
    type: Boolean,
  },
});

const tableHeader = [
  { title: "No", value: "index" },
  { title: "Jenis Bahan", value: "jenis_bahan" },
  { title: "Nama Bahan", value: "nama_bahan" },
  { title: "Kelompok", value: "kelompok" },
  { title: "Merk", value: "merek" },
  { title: "Produsen", value: "produsen" },
  { title: "No. Sertifikat Halal", value: "no_sertifikat" },
  { title: "Tanggal Berlaku", value: "tgl_berlaku_sertifikat" },
  !hideVerifikasiPendamping && {
    title: "Verifikasi Pendamping",
    value: "vefified",
  },
  { title: "Action", value: "action" },
];
interface Bahan {
  id: string;
  jenis_bahan: string;
  kelompok: string;
  merek: string;
  nama_bahan: string;
  no_sertifikat: string;
  produsen: string;
  tgl_berlaku_sertifikat: string;
  vefified: boolean;
}

const store = useMyTabEditRegulerStore();
const { bahan } = storeToRefs(store);
const route = useRoute();
const editItem = (item) => {};
const deleteDialog = ref(false);
const deleteButton = ref(false);
const deletedId = ref();
const deleteItem = async (id: string) => {
  deletedId.value = id;
  deleteDialog.value = true;
};
const closeDelete = () => {
  deletedId.value = null;
  deleteDialog.value = false;
  deleteButton.value = false;
};
const deleteBahan = async () => {
  try {
    deleteButton.value = true;
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
    deleteDialog.value = false;
    useSnackbar().sendSnackbar("Berhasil Menghapus bahan", "success");
  } catch (error) {
    deleteDialog.value = false;
    useSnackbar().sendSnackbar("Gagal Menghapus bahan", "error");
  } finally {
    deleteButton.value = false;
    await store.getBahan(route.params.id);
    store.isBahan();
    store.isAllBahanSelected();
  }
};
const loadBahan = async () => {
  await store.getBahan(route.params.id);
  store.isBahan();
  store.isAllBahanSelected();
};

interface editBahan {
  typeBahan: 0 | 1;
  jenis_bahan: string[] | null;
  nama_bahan: string;
  kelompok: string;
  merek: string;
  produsen: string;
  no_sertifikat: string;
}
</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6" style="display: flex; align-items: center"
          ><h3>Daftar Nama Bahan dan Kemasan</h3></VCol
        >
        <VCol cols="6" style="display: flex; justify-content: end">
          <TambahBahanModal
            :can-not-edit="canNotEdit"
            @loadList="loadBahan()"
          ></TambahBahanModal>
        </VCol>
      </VRow>
      <div class="bgContent">
        <div class="d-flex flex-wrap mt-5">
          <VIcon icon="ri-error-warning-line" color="#652672" />
          <label class="subText"
            >Jenis Bahan harus terdiri dari : Cleaning Agent, Kemasan dan Bahan, sebelum dapat mengisi  Produk.</label
          >
        </div>
      </div>
    </VCardTitle>
    <VCardItem>
      <VRow>
        <VCol cols="12">
          <div class="bgContent">
            <div class="d-flex flex-wrap">
              <VIcon icon="ri-error-warning-line" color="#652672" />
              <label class="subText"
                >Jenis Bahan harus terdiri dari : Cleaning Agent, Kemasan dan
                Bahan, sebelum dapat mengisi Produk.</label
              >
            </div>
          </div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VDataTable :headers="tableHeader" :items="bahan">
            <template #item.index="{ index }"> {{ index + 1 }} </template>
            <template #item.vefified="{ item }">
              <v-chip :color="item.vefified ? 'success' : 'error'">{{
                item.vefified ? "Sudah" : "Belum"
              }}</v-chip>
            </template>
            <template v-if="!canNotEdit" #item.action="{ item }">
              <div class="d-flex gap-1" v-if="!item.vefified">
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
                />
                <IconBtn
                  size="small"
                  @click="deleteItem(item.id)"
                  v-if="!item.vefified"
                >
                  <VIcon color="error" icon="ri-delete-bin-line" />
                </IconBtn>
              </div>
            </template>
          </VDataTable>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
  <VDialog
    v-model="deleteDialog"
    max-width="500px"
    @update:model-value="closeDelete"
  >
    <VCard title="Apakah anda yakin akan menghapus data ini?">
      <VCardText>
        <div class="d-flex justify-center gap-4">
          <VBtn color="primary" variant="outlined" @click="closeDelete">
            Cancel
          </VBtn>
          <VBtn
            color="primary"
            variant="elevated"
            @click="deleteBahan"
            :disabled="deleteButton"
          >
            OK
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
<style lang="scss" scoped>
.subText {
  align-content: center;
  color: #652672 !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: 18px !important;
  padding-inline-start: 10px;
}
.bgContent {
  border-radius: 10px;
  background-color: #f0e9f1;
  padding-inline-start: 10px;
}
</style>
