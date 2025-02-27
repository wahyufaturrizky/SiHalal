<script setup lang="ts">
import type { VForm } from "vuetify/components";
import { modalTypeEnum } from "../verval-enum";

const props = defineProps({
  modalType: {
    type: String,
    required: true,
  },
  disableAdd: {
    type: Boolean,
  },
  data: {
    type: Object,
  },
});

const isVisible = ref(false);

const route = useRoute();

const emit = defineEmits(["emit-add"]);

const persyaratanItem = ref();

const form = ref({
  persyaratan: null,
  penjelasan: null,
});

const refVForm = ref<VForm>();

const disabledPenjelasan = ref(true);

const insertProsesProduk = async () => {
  // submitAddBahanButton.value = true;

  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/product-process-add`,
      {
        method: "post",
        body: {
          persyaratan: form.value.persyaratan,
          penjelasan: form.value.penjelasan,
        },
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Gagal menambahkan proses", "error");
      return;
    }
    emit("emit-add", true);
    useSnackbar().sendSnackbar("Berhasil menambahkan proses", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan proses", "error");
  } finally {
    isVisible.value = false;
  }
};

const onSubmit = async () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) insertProsesProduk();
  });
};

const getProsesProdukData = async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${route.params?.id}/detail`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      form.value.penjelasan = response.data.narasi;
      if (form.value.penjelasan?.length > 0) {
        Object.assign(form.value.penjelasan, response.data.narasi.split("\n"));
      }
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

const handleChangePersyaratan = async (value: string) => {
  if (parseInt(value) === 0) {
    // get api proses pph
    await getProsesProdukData();
    disabledPenjelasan.value = false;
  } else if (value === 1) {
    disabledPenjelasan.value = true;
    form.value.penjelasan =
      "Pemenuhan Kriteria Sistem Jaminan Produk Halal telah diverifikasi langsung ke lokasi Pelaku Usaha";
  }
};

const tmpList = ref();

watch(
  () => props.data,
  async (newData) => {
    if (newData) {
      tmpList.value = newData;
    }
  },
  { immediate: true }
);

const onOpenModal = async () => {
  if (props.modalType === modalTypeEnum.EDIT) {
    await getProsesProdukData();
  } else {
    persyaratanItem.value = [
      { name: "Proses", value: 0 },
      { name: "Kriteria SJPH", value: 1 },
    ];
    if (tmpList.value) {
      tmpList.value?.forEach((val) => {
        const tmpIdx = persyaratanItem.value.findIndex(
          (val2) => val2.value == parseInt(val.persyaratan)
        );
        persyaratanItem.value.splice(tmpIdx, 1);
      });
    }

    form.value = {
      persyaratan: null,
      penjelasan: null,
    };
  }
};
</script>

<template>
  <VDialog v-model="isVisible">
    <template #activator="{ props: openModal }">
      <VBtn
        v-if="modalType === modalTypeEnum.ADD"
        :disabled="props.disableAdd"
        append-icon="fa-plus"
        variant="outlined"
        v-bind="openModal"
        @click="onOpenModal"
        >Tambah</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center"
              ><h3 v-if="modalType === modalTypeEnum.ADD">
                Tambah Proses Produk
              </h3>
              <h3 v-if="modalType === modalTypeEnum.EDIT">
                Ubah Proses Produk
              </h3></VCol
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
                  <VLabel>Persyaratan</VLabel>
                  <VSelect
                    density="compact"
                    placeholder="Pilih Persyaratan"
                    v-model="form.persyaratan"
                    :items="persyaratanItem"
                    item-value="value"
                    item-title="name"
                    v-on:update:model-value="handleChangePersyaratan"
                  ></VSelect>
                </VItemGroup>
                <br />
                <VItemGroup>
                  <VLabel>Penjelasan</VLabel>
                  <VTextarea
                    density="compact"
                    placeholder="Isi Penjelasan"
                    v-model="form.penjelasan"
                    :disabled="disabledPenjelasan"
                  ></VTextarea>
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
            <VBtn variant="flat" v-if="modalType === modalTypeEnum.EDIT"
              >Ubah</VBtn
            >
            <VBtn
              variant="flat"
              v-if="modalType === modalTypeEnum.ADD"
              @click="onSubmit"
              >Simpan</VBtn
            >
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
