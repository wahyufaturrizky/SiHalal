<script setup lang="ts">
import type { VForm } from "vuetify/components";
import { modalTypeEnum } from "../verval-enum";

const props = defineProps({
  modalType: {
    type: String,
    required: true,
  },
  idBahan: {
    type: String,
  },
  idReg: {
    type: String,
  },
  listBahan: {
    type: Object,
  },
  isTemuanCanEdit: {
    type: Boolean,
  },
});

const isVisible = ref(false);

const emit = defineEmits(["emit-add"]);

const dataBahanList = ref([]);
const form = ref({
  id: null,
  id_bahan: null,
  nama_bahan: null,
  diragukan: null,
  temuan: null,
  keterangan: null,
});

const refVForm = ref<VForm>();

const route = useRoute();

const getIngredientListDropdown = async () => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/pendamping-bahan-list`,
      {
        method: "get",
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }

    console.log("response = ", response.data);
    dataBahanList.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const hardcodeDiragukan = [
  { name: "Diragukan", value: 0 },
  { name: "Tidak Diragukan", value: 1 },
];

const onClickBahan = (value: any) => {
  const tmp = JSON.parse(JSON.stringify(dataBahanList.value));
  console.log(" data bahan list = ", tmp);
  const result = tmp.filter((val) => val.id == value);

  console.log("result = ", result);

  if (result.length > 0) {
    if (result[0].no_sertifikat) {
      form.value.diragukan = hardcodeDiragukan[0].value;
      form.value.temuan = `"SH/KH No ${result[0].no_sertifikat}, berlaku s.d ${result[0].tgl_berlaku_sertifikat} (Merek ${result[0].nama_bahan} dari produsen ${result[0].produsen})`;
      form.value.keterangan = null;
    } else {
      form.value.diragukan = hardcodeDiragukan[1].value;
      form.value.temuan = null;
      form.value.keterangan = result[0].kelompok;
    }
  }
};

const onSubmit = async () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    console.log("is valid");
    if (isValid) insertBahan();
  });
};
const insertBahan = async () => {
  // submitAddBahanButton.value = true;
  console.log("add bahan = ", form.value);
  console.log("array bahan option = ", dataBahanList.value);

  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/ingredient-add`,
      {
        method: "post",
        body: {
          id_bahan: form.value.id_bahan,
          status: form.value.diragukan,
          notes: form.value.temuan ? form.value.temuan : "",
        },
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Gagal menambahkan bahan", "error");
      return;
    }
    useSnackbar().sendSnackbar("Berhasil menambahkan bahan", "success");
    emit("emit-add", true);
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan bahan", "error");
  } finally {
    isVisible.value = false;
  }
};

const editBahan = async () => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/ingredient-edit`,
      {
        method: "post",
        body: {
          idBahan: form.value.id_bahan,
          status: form.value.diragukan,
          notes: form.value.keterangan,
        },
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Gagal merubah bahan", "error");
      return;
    }
    useSnackbar().sendSnackbar("Berhasil merubah bahan", "success");
    emit("emit-add", true);
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal merubah bahan", "error");
  } finally {
    isVisible.value = false;
  }
};

const getDetailBahan = async () => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/ingredient-detail/${props.idBahan}`,
      {
        method: "get",
      }
    );
    if (response.code != 2000) {
      console.log(response, "ini code detail bahan");
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    console.log(response, "ini detail Bahan");
    form.value.id = response.data?.id;
    form.value.id_bahan = response.data?.id_bahan;
    form.value.nama_bahan = response.data?.nama_bahan;
    form.value.diragukan =
      parseInt(response.data?.status) === parseInt(0)
        ? parseInt(0)
        : parseInt(response.data?.status) === parseInt(1)
        ? parseInt(1)
        : "";
    form.value.temuan = response.data?.notes;
    form.value.keterangan = response.data?.keterangan;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const tmpList = ref();

watch(
  () => props.listBahan,
  async (newData) => {
    if (newData) {
      tmpList.value = newData;
    }
  },
  { immediate: true }
);

const onOpenModal = async () => {
  await getIngredientListDropdown();
  console.log("modal type = ", props.modalType);
  // if (tmpList) {
  //   tmpList.value.forEach((val) => {
  //     const tmpIdx = dataBahanList.value.findIndex(
  //       (val2) => val2.id == val.id_bahan
  //     );
  //     dataBahanList.value.splice(tmpIdx, 1);
  //   });
  // }
  if (props.modalType === modalTypeEnum.EDIT) {
    console.log("edit");
    await getDetailBahan();
    onClickBahan(form.value.id);
  } else {
    form.value = {
      id: null,
      id_bahan: null,
      nama_bahan: null,
      diragukan: null,
      temuan: null,
      keterangan: null,
    };
  }
};
onMounted(async () => {
  if (props.modalType === modalTypeEnum.EDIT && props.idBahan) {
    console.log("Memuat detail bahan untuk ID:", props.idBahan);
    await getDetailBahan();
  }
});
</script>
<template>
  <VDialog v-model="isVisible">
    <template #activator="{ props }">
      <VBtn
        v-if="modalType === modalTypeEnum.ADD"
        append-icon="fa-plus"
        variant="outlined"
        v-bind="props"
        @click="onOpenModal"
        >Tambah</VBtn
      >
      <VListItem
        v-if="modalType === modalTypeEnum.EDIT"
        prepend-icon="fa-pencil"
        v-bind="props"
        @click="onOpenModal"
        >Edit</VListItem
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center"
              ><h3 v-if="modalType === modalTypeEnum.ADD">Tambah Bahan</h3>
              <h3 v-if="modalType === modalTypeEnum.EDIT">Ubah Bahan</h3></VCol
            >
            <VCol cols="2" style="display: flex; justify-content: end">
              <VCol cols="2" style="display: flex; justify-content: end"
                ><VIcon
                  size="small"
                  icon="fa-times"
                  @click="isActive.value = false"
                ></VIcon
              ></VCol>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VForm ref="refVForm" @submit.prevent>
            <VRow>
              <VCol cols="12">
                <VItemGroup>
                  <VLabel>Nama Bahan</VLabel>
                  <VSelect
                    density="compact"
                    placeholder="Pilih Nama Bahan"
                    :items="dataBahanList"
                    item-value="id"
                    item-title="nama_bahan"
                    v-model="form.id_bahan"
                    v-on:update:model-value="onClickBahan"
                    :rules="[requiredValidator]"
                    :disabled="modalType === modalTypeEnum.EDIT"
                  ></VSelect>
                </VItemGroup>
                <br />
                <VItemGroup>
                  <VLabel>Diragukan / Tidak Diragukan</VLabel>
                  <VSelect
                    density="compact"
                    placeholder="Pilih Keraguan Bahan"
                    :items="hardcodeDiragukan"
                    item-value="value"
                    item-title="name"
                    v-model="form.diragukan"
                    :rules="[requiredValidator]"
                  ></VSelect>
                </VItemGroup>
                <br />
                <VItemGroup>
                  <VLabel>Temuan</VLabel>
                  <VTextField
                    density="compact"
                    :readonly="!props.isTemuanCanEdit"
                    v-model="form.temuan"
                  ></VTextField>
                </VItemGroup>
                <br />
                <VItemGroup>
                  <VLabel>Keterangan</VLabel>
                  <VTextField
                    density="compact"
                    placeholder="Data otomatis terisi apabila nama bahan telah dipilih"
                    v-model="form.keterangan"
                    :disabled="modalType === modalTypeEnum.ADD"
                  ></VTextField>
                </VItemGroup>
              </VCol>
            </VRow>
          </VForm>
        </VCardItem>
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn @click="isActive.value = false" variant="outlined"
              >Batal</VBtn
            >
            <VBtn
              @click="editBahan"
              variant="flat"
              v-if="modalType === modalTypeEnum.EDIT"
              >Ubah</VBtn
            >
            <VBtn
              variant="flat"
              @click="onSubmit"
              v-if="modalType === modalTypeEnum.ADD"
              >Simpan</VBtn
            >
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
