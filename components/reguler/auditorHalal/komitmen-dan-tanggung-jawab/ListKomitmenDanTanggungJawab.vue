<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  isviewonly: {
    type: Boolean,
  },
});

const { isviewonly } = props || {};

const route = useRoute();
const id = (route.params as any).id;
const idForEdit = ref("");
const isEdit = ref(false);
const loadingAll = ref(true);

const addDialog = ref(false);
const titleDialog = ref("");

const formAdd = ref<any>({
  nama: "",
  jabatan: "Tim Manajemen Halal",
  posisi: "",
});

const comitmentData = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    {
      title: "pengajuan-reguler.reguler-form--komitmen-tim-nama",
      key: "nama",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler-form--komitmen-tim-jabatan",
      key: "jabatan",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler-form--komitmen-tim-posisi",
      key: "posisi",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler-form--komitmen-tim-aksi",
      key: "action",
      value:  {
        popupTitle: "pengajuan.reguler.reguler-remove-bahan-title",
        popup1: "pengajuan.reguler.reguler-remove-bahan-1",
        popup2: "pengajuan.reguler.reguler-remove-bahan-2",
      },
      sortable: false,
      nowrap: true,
      popOver: true,
      
    },
  ],
  value: [],
});

const toggleAdd = () => {
  addDialog.value = true;
  isEdit.value = false;
  titleDialog.value = "Tambah Anggota Komitmen";
};

const toggleEdit = (item: any) => {
  idForEdit.value = item?.id_reg_tim;
  isEdit.value = true;
  formAdd.value = {
    nama: item?.nama,
    jabatan: item?.jabatan,
    posisi: item?.posisi,
  };
  addDialog.value = true;
  titleDialog.value = "Ubah Anggota Komitmen";
};

const getDetailData: any = async () => {
  try {
    const response = await $api("/reguler/pelaku-usaha/detail-tab", {
      method: "get",
      params: { id, type: "tim-manajemen-halal" },
    });

    comitmentData.value = {
      ...comitmentData.value,
      value: response?.data || [],
    };
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const toggleDelete = async (item: any) => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/delete-komitmen-tanggung-jawab",
    {
      method: "delete",
      params: { id, id_edit: item?.id_reg_tim },
      body: {
        nama: item?.nama,
        jabatan: item?.jabatan,
        posisi: item?.posisi,
      },
    }
  );

  if (response?.code === 2000) {
    formAdd.value = {
      name: "",
      jabatan: "",
      posisi: "",
    };
    useSnackbar().sendSnackbar("Sukses menghapus data", "success");
  } else {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
  await getDetailData();
};

const handleAddOrEdit = async () => {
  if (isEdit.value) {
    const response = await $api(
      "/reguler/pelaku-usaha/edit-komitmen-tanggung-jawab",
      {
        method: "put",
        params: { id, id_edit: idForEdit.value },
        body: formAdd.value,
      }
    );

    if (response?.code === 2000) {
      formAdd.value = {
        name: "",
        jabatan: "",
        posisi: "",
      };
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } else {
    const response = await $api(
      "/reguler/pelaku-usaha/add-komitmen-tanggung-jawab",
      {
        method: "post",
        params: { id },
        body: formAdd.value,
      }
    );

    if (response?.code === 2000) {
      formAdd.value = {
        name: "",
        jabatan: "",
        posisi: "",
      };
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  }
  addDialog.value = false;
  await getDetailData();
};

onMounted(async () => {
  const res: any = await Promise.all([getDetailData()]);

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
  <div v-if="!loadingAll">
    <DialogWithAction
      :title="titleDialog"
      :is-open="addDialog"
      :label-save-btn="labelSaveBtn"
      :toggle="() => (addDialog = false)"
      :on-save="handleAddOrEdit"
    >
      <template #content>
        <div>
          <p class="label-pengajuan">
            {{ t("pengajuan-reguler.reguler-form--komitmen-tim-popup-nama") }}
          </p>
          <VTextField
            v-model="formAdd.nama"
            class="-mt-10"
            placeholder="isi Nama"
          />
          <br />
          <p class="label-pengajuan">
            {{
              t("pengajuan-reguler.reguler-form--komitmen-tim-popup-jabatan")
            }}
          </p>
          <VTextField
            v-model="formAdd.jabatan"
            class="-mt-10"
            placeholder="isi Jabatan"
          />
          <br />
          <p class="label-pengajuan">
            {{ t("pengajuan-reguler.reguler-form--komitmen-tim-popup-posisi") }}
          </p>
          <VSelect
            v-model="formAdd.posisi"
            :items="[
              { name: 'Ketua', value: 'Ketua' },
              { name: 'Anggota', value: 'Anggota' },
            ]"
            item-value="value"
            item-title="name"
            density="compact"
            placeholder="Pilih posisi"
          />
        </div>
      </template>
    </DialogWithAction>

    <TableData
      :on-submit="() => onSubmit()"
      :on-add="toggleAdd"
      :on-edit="toggleEdit"
      :on-delete="toggleDelete"
      :data="comitmentData"
      :title="t('pengajuan-reguler.reguler-form--komitmen-title')"
      with-add-button
      with-approve-button
      :isviewonly="isviewonly"
    />
  </div>

  <div v-else>
    <VSkeletonLoader v-for="i in 3" :key="i" type="list-item-two-line" />
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}

.bgContent {
  border-radius: 10px;
  background-color: #f0e9f1;
}

.progress-text {
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
}
</style>
