<script setup lang="ts">
import type { VForm } from "vuetify/components";
import { modalTypeEnum } from "../verval-enum";

const props = defineProps({
  modalType: {
    type: String,
    required: true,
  },
});

const isVisible = ref(false);

const route = useRoute();

const emit = defineEmits(["emit-add"]);

const persyaratanItem = [
  { name: "Proses", value: 0 },
  { name: "Kriteria SJPH", value: 1 },
];

const form = ref({
  persyaratan: null,
  penjelasan: null,
});

const refVForm = ref<VForm>();

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

const onOpenModal = () => {
  form.value = {
    persyaratan: null,
    penjelasan: null,
  };
};
</script>

<template>
  <VDialog v-model="isVisible">
    <template #activator="{ props: openModal }">
      <VBtn
        v-if="modalType === modalTypeEnum.ADD"
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
                  ></VSelect>
                </VItemGroup>
                <br />
                <VItemGroup>
                  <VLabel>Penjelasan</VLabel>
                  <VTextarea
                    density="compact"
                    placeholder="Isi Penjelasan"
                    v-model="form.penjelasan"
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
