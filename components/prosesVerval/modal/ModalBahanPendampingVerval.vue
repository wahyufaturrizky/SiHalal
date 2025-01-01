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

    dataBahanList.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const hardcodeDiragukan = [
  { name: "Diragukan", value: 0 },
  { name: "Tidak Diragukan", value: 1 },
];

const onClickBahan = () => {
  dataBahanList.value.filter((val) => {
    if (val.id_bahan == form.value.id_bahan) {
      form.value.id = val.id;
      if (val.tgl_berlaku_sertifikat) {
        form.value.temuan = `"SH/KH No ${val.no_sertifikat}, berlaku s.d ${tgl_berlaku_sertifikat} (Merek ${val.nama_bahan} dari produsen ${val.produsen})`;
      } else {
        form.value.temuan = null;
      }
    }
  });
};

const onSubmit = async () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    console.log("is valid");
    if (isValid) insertBahan();
  });
};
const insertBahan = async () => {
  // submitAddBahanButton.value = true;

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
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }

    form.value.id = response.data?.id;
    form.value.id_bahan = response.data?.id_bahan;
    form.value.nama_bahan = response.data?.nama_bahan;
    form.value.diragukan =
      parseInt(response.data?.status) === parseInt(0)
        ? parseInt(0)
        : parseInt(response.data?.status) === parseInt(1)
        ? parseInt(1)
        : "";
    form.value.temuan = response.data?.temuan;
    form.value.keterangan = response.data?.notes;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const onOpenModal = async () => {
  await getIngredientListDropdown();
  if (props.modalType === "edit") {
    console.log("edit");
    getDetailBahan();
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
                    item-value="id_bahan"
                    item-title="nama_bahan"
                    v-model="form.id_bahan"
                    v-on:update:model-value="onClickBahan"
                    :rules="[requiredValidator]"
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
                <br v-if="modalType === modalTypeEnum.ADD" />
                <VItemGroup v-if="modalType === modalTypeEnum.ADD">
                  <VLabel>Temuan</VLabel>
                  <VTextField
                    density="compact"
                    readonly
                    v-model="form.temuan"
                  ></VTextField>
                </VItemGroup>
                <br />
                <VItemGroup v-if="modalType === modalTypeEnum.EDIT">
                  <VLabel>Keterangan</VLabel>
                  <VTextField
                    density="compact"
                    placeholder="Data otomatis terisi apabila nama bahan telah dipilih"
                    v-model="form.keterangan"
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
