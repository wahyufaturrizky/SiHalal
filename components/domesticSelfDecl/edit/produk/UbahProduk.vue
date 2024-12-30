<script setup lang="ts">
import type { VForm } from "vuetify/components";

const propsOutside = defineProps({
  icon: { type: String, default: "fa-pencil" }, // Default to existing icon
  showLabel: { type: Boolean, default: true }, // Control label visibility
  idProduk: { type: String, required: true },
  submissionId: { type: String, required: true },
});

const emit = defineEmits(["confirm-edit", "cancel"]);

const formData = ref({
  product_grade: null,
  kode_rincian: null,
  nama_produk: null,
  merek: null,
  foto_produk: null,
});

const listClassificationDetail = ref([]);
const listClassification = ref([]);

const resetForm = () => {
  formData.value.product_grade = null;
  formData.value.kode_rincian = null;
  formData.value.nama_produk = null;
  formData.value.merek = null;
  formData.value.foto_produk = null;
};

const formUbahProduk = ref<VForm>();

const handleEdit = () => {
  formUbahProduk.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      emit("confirm-edit", formData.value, propsOutside.idProduk);
      openCloseModal.value = false;
    } else {
      openCloseModal.value = true;
    }
  });
};

const handleDetailProduct = async (submissionId: string, productId: string) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/detail`,
      {
        method: "get",
        query: {
          id_reg: submissionId,
          product_id: productId,
        },
      }
    );

    if (response.code === 2000) {
      await handleListClassificationDetail(response.data?.klasifikasi);
      // detailProduct.value = response.data;
      console.log("response detail = ", response.data);
      formData.value.product_grade = response.data?.klasifikasi;
      formData.value.kode_rincian = response.data?.koderincian;
      formData.value.nama_produk = response.data?.nama;
      formData.value.merek = response.data?.merek;
      formData.value.foto_produk = null;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

const handleListClassification = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/classification`,
      {
        method: "get",
        params: {
          id_reg: propsOutside.submissionId,
        },
      }
    );
    if (response.code == 2000) {
      listClassification.value = response.data;
    }
  } catch (error) {
    console.error("error ubah = ", error);
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const handleListClassificationDetail = async (grade: string) => {
  formData.value.kode_rincian = null;
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/classification-detail`,
      {
        method: "get",
        params: {
          code: grade,
        },
      }
    );
    if (response.code == 2000) {
      listClassificationDetail.value = response.data;
    }
  } catch (error) {
    console.error("error ubah = ", error);
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const uploadedFile = ref({
  name: formData.value.foto_produk || null,
  file: null,
});

const openCloseModal = ref();

const handleUploadFile = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0];
    uploadedFile.value.name = fileData.name;
    uploadedFile.value.file = fileData;
    try {
      const response = await uploadDocument(fileData);
      if (response.code === 2000) {
        formData.value.foto_produk = response.data.file_url;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const uploadDocument = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("id", String(propsOutside.submissionId));
    formData.append("file", file);
    formData.append("type", "produk");
    const response = await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    });
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};

const onOpenModal = async () => {
  // resetForm();
  await handleDetailProduct(propsOutside.submissionId, propsOutside.idProduk);
  await handleListClassification();
};
</script>

<template>
  <VDialog max-width="60svw" v-model="openCloseModal">
    <template #activator="{ props }">
      <VListItem v-bind="props" @click="onOpenModal()"
        ><VListItemTitle>
          <VIcon class="mr-2" icon="fa-pencil" v-if="showLabel" />
          Ubah
        </VListItemTitle>
      </VListItem>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center"
              ><h3>Ubah Nama Produk</h3></VCol
            >
            <VCol cols="2" style="display: flex; justify-content: end">
              <VCol cols="2" style="display: flex; justify-content: end"
                ><VIcon
                  size="small"
                  icon="fa-times"
                  @click="isActive.value = false"
                >
                </VIcon>
              </VCol>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VForm ref="formUbahProduk" @submit.prevent>
            <VItemGroup>
              <VLabel><b>Klasifikasi Produk</b></VLabel>
              <VSelect
                density="compact"
                placeholder="Pilih Klasifikasi Produk"
                v-model="formData.product_grade"
                :items="listClassification"
                item-title="name"
                item-value="code"
                v-on:update:model-value="handleListClassificationDetail"
                :rules="[requiredValidator]"
              ></VSelect>
            </VItemGroup>
            <br />
            <VItemGroup>
              <VLabel><b>Rincian Produk</b></VLabel>
              <VSelect
                density="compact"
                placeholder="Pilih Rincian Produk"
                v-model="formData.kode_rincian"
                :items="listClassificationDetail"
                item-title="name"
                item-value="code"
                :rules="[requiredValidator]"
              ></VSelect>
            </VItemGroup>
            <br />
            <VItemGroup>
              <VLabel><b>Nama Produk</b></VLabel>
              <VTextField
                density="compact"
                placeholder="Isi Nama Produk"
                v-model="formData.nama_produk"
                :rules="[requiredValidator]"
              ></VTextField>
            </VItemGroup>
            <br />
            <VItemGroup>
              <VLabel><b>Merk</b></VLabel>
              <VTextField
                density="compact"
                placeholder="Isi Merk"
                v-model="formData.merek"
                :rules="[requiredValidator]"
              ></VTextField>
            </VItemGroup>
            <br />
            <VItemGroup>
              <VRow>
                <VCol cols="6" style="display: flex; align-items: center">
                  <b>Upload Produk</b>
                </VCol>
                <VCol cols="6">
                  <VFileInput
                    class="custom-file-input"
                    density="compact"
                    rounded="xl"
                    label="No file choosen"
                    max-width="400"
                    prepend-icon=""
                    @change="handleUploadFile"
                    :rules="[
                      requiredValidator,
                      fileExtensionValidator,
                      fileNameLengthValidator,
                      fileSizeValidator,
                    ]"
                  >
                    <template #append-inner>
                      <VBtn rounded="s-0 e-xl" text="Choose" />
                    </template>
                  </VFileInput>
                </VCol>
              </VRow>
            </VItemGroup>
            <br />
          </VForm>
        </VCardItem>
        <VCardActions>
          <VBtn variant="outlined" @click="isActive.value = false"> Batal</VBtn>
          <VBtn @click="handleEdit()" variant="flat">Ubah</VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
<style lang="scss">
.custom-file-input {
  .v-field--appended {
    padding-inline-end: 0 !important;
  }
}
</style>
