<script setup lang="ts">
import { ref } from "vue";

const typedProcess = ref("");
const processArray = ref<Array<string>>([]);
const prosesProduction = ref("");

const snackbar = useSnackbar();

const route = useRoute<"">();
const submissionId = route.params?.id;
const handleAddSave = async () => {
  // console.log("PROSES PRODUCTION ", prosesProduction.value)
  try {
    const response: any = await $api(
      `/self-declare/business-actor/narration/update`,
      {
        method: "put",
        body: {
          id_reg: submissionId,
          narasi: prosesProduction.value,
        },
      }
    );

    if (response.code === 2000) {
      snackbar.sendSnackbar("Berhasil Mengubah Data ", "success");
    }
  } catch (error) {
    snackbar.sendSnackbar("Gagal Mengubah Data ", "success");
  }
};

const handleAddProcess = () => {
  if (!typedProcess.value.length) return;

  processArray.value.push(typedProcess.value);
  typedProcess.value = "";

  if (processArray.value.length > 1) {
    const lastIndex = processArray.value.length - 1;
    prosesProduction.value += `${lastIndex + 1}. ${
      processArray.value[lastIndex]
    }\n`;
  } else {
    prosesProduction.value = `1. ${processArray.value[0]}\n`;
  }
};
</script>

<template>
  <VCard>
    <VCardTitle class="pa-4 d-flex justify-space-between align-center">
      <h4 class="text-h4">Proses Produksi Halal</h4>
      <VBtn @click="handleAddSave">Simpan Perubahan</VBtn>
    </VCardTitle>
    <VCardItem>
      <VRow class="d-flex justify-space-between align-center">
        <VCol cols="6" class="text-h6">Ketik Proses</VCol>
        <VCol cols="6" class="d-flex justify-space-between align-center ga-4">
          <VTextField
            v-model="typedProcess"
            placeholder="Isi Ketik Proses"
            dense
            outlined
            class="mr-3"
          />
          <VBtn dense outlined @click="handleAddProcess"> Tambah </VBtn>
        </VCol>
      </VRow>
    </VCardItem>
    <br />
    <VCardText>
      <p>Proses Produksi</p>
      <VTextarea
        v-model="prosesProduction"
        placeholder="Masukkan proses produksi"
        outlined
        dense
      />
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss"></style>
