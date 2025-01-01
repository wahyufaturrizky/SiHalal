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

const form = ref({
  kriteria: null,
  pertanyaan: null,
  jawaban: null,
});

const optionKriteria = [
  { name: "Nama/Simbol", value: 0 },
  { name: "Rasa/Aroma (Flavour)", value: 1 },
  { name: "Bentuk", value: 2 },
  { name: "Kemasan", value: 3 },
  {
    name: "Produk yang Dikemas Ulang (Repacked) atau Diberi Label Ulang (Relabeled)",
    value: 4,
  },
];

const optionPertanyaanMaster = [
  {
    category: "Nama/Simbol",
    value: "Apakah terkait dengan ibadah agama dan kepercayaan lain?",
  },
  {
    category: "Nama/Simbol",
    value: "Apakah bertentangan dengan akidah Islam?",
  },
  {
    category: "Nama/Simbol",
    value: "Apakah menggambarkan kekufuran dan kemaksiatan?",
  },
  {
    category: "Nama/Simbol",
    value: "Apakah menggunakan nama minuman beralkohol?",
  },
  {
    category: "Nama/Simbol",
    value: "Apakah menggunakan nama babi dan anjing serta turunannya?",
  },
  {
    category: "Rasa/Aroma (Flavour)",
    value: "Apakah flavour mengarah pada rasa olahan daging babi?",
  },
  {
    category: "Rasa/Aroma (Flavour)",
    value: "Apakah rasa/aroma mengarah pada khamr?",
  },
  { category: "Bentuk", value: "Apakah menggunakan bentuk babi dan anjing?" },
  {
    category: "Bentuk",
    value: "Apakah menggunakan bentuk produk yang menggambarkan pornografi?",
  },
  {
    category: "Kemasan",
    value:
      "Apakah menggunakan kemasan bergambar anjing atau babi sebagai fokus utama?",
  },
  {
    category: "Kemasan",
    value: "Apakah menggunakan kemasan yang bergambar pornografi?",
  },
  {
    category: "Kemasan",
    value: "Apakah menggunakan kemasan yang mengarah pada unsur pornografi?",
  },
  {
    category:
      "Produk yang Dikemas Ulang (Repacked) atau Diberi Label Ulang (Relabeled)",
    value:
      "Apakah produk tersebut memiliki sertifikat halal berdasarkan fatwa MUI?",
  },
  {
    category:
      "Produk yang Dikemas Ulang (Repacked) atau Diberi Label Ulang (Relabeled)",
    value: "Apakah produk merupakan bahan dalam positive list?",
  },
];

const optionPertanyaan = ref();

const onCriteriaChange = (category: string) => {
  console.log(category);
  optionPertanyaan.value = optionPertanyaanMaster.filter(
    (val) => val.category === category
  );
};

const refVForm = ref<VForm>();

const route = useRoute();

const emit = defineEmits(["emit-add"]);

const insertProduk = async () => {
  // submitAddBahanButton.value = true;

  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/product-add`,
      {
        method: "post",
        body: {
          kriteria: form.value.kriteria,
          pertanyaan: form.value.pertanyaan,
          jawaban: form.value.jawaban,
        },
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Gagal menambahkan produk", "error");
      return;
    }
    emit("emit-add", true);
    useSnackbar().sendSnackbar("Berhasil menambahkan produk", "success");
    isVisible.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan produk", "error");
  }
  // finally {
  //   submitAddBahanButton.value = false;
  //   modalAddBahan.value = false;
  // }
};

const onSubmit = async () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) insertProduk();
  });
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
        >Tambah</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center"
              ><h3 v-if="modalType === modalTypeEnum.ADD">Tambah Produk</h3>
              <h3 v-if="modalType === modalTypeEnum.EDIT">Ubah Produk</h3></VCol
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
                  <VLabel>Kriteria</VLabel>
                  <VSelect
                    density="compact"
                    placeholder="Pilih Kriteria"
                    :items="optionKriteria"
                    item-title="name"
                    item-value="name"
                    v-model="form.kriteria"
                    v-on:update:model-value="onCriteriaChange"
                  ></VSelect>
                </VItemGroup>
                <VItemGroup>
                  <VLabel>Pertanyaan</VLabel>
                  <VSelect
                    :disabled="false"
                    density="compact"
                    placeholder="Pilih Pertanyaan"
                    :items="optionPertanyaan"
                    item-title="value"
                    item-value="value"
                    v-model="form.pertanyaan"
                  ></VSelect>
                </VItemGroup>
                <VItemGroup>
                  <VLabel>Jawaban</VLabel>
                  <VSelect
                    :disabled="false"
                    density="compact"
                    placeholder="Pilih Jawaban"
                    v-model="form.jawaban"
                    :items="['Ya', 'Tidak']"
                  ></VSelect>
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
