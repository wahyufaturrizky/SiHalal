<script setup lang="ts">
import { ref } from "vue";

const form = ref();
const formStatus = ref(false);
const typedProcess = ref("");
const processRules = ref([(v: string) => !!v || "Proses produksi harus diisi"]);
const processArray = ref<Array<string>>([]);
const prosesProduction = ref("");

const props = defineProps({
  isVerificator: {
    type: Boolean,
    default: false,
  },
});

const snackbar = useSnackbar();

const route = useRoute<"">();
const submissionId = route.params?.id;

const { refresh } = await useAsyncData("get-narration", async () => {
  try {
    const endpointBusActor = `/self-declare/business-actor/narration`;
    const endpointVerificator = `/self-declare/verificator/narration`;
    const finalUri = props.isVerificator
      ? endpointVerificator
      : endpointBusActor;
    const response: any = await $api(finalUri, {
      method: "get",
      query: {
        id_reg: submissionId,
      },
    });
    if (response.code === 2000) {
      if (props.isVerificator) {
        prosesProduction.value = response.data?.narasi_pph;
        if (response.data.narasi_pph != "") {
          Object.assign(
            processArray.value,
            response.data.narasi_pph.split("\n")
          );
        }
      } else {
        prosesProduction.value = response.data.narasi;
        if (response.data.narasi.length > 0) {
          Object.assign(processArray.value, response.data.narasi.split("\n"));
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});
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
      refresh();
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
    prosesProduction.value +=
      `\n${lastIndex + 1}.` + `${processArray.value[lastIndex]}`;
  } else {
    prosesProduction.value = `1. ${processArray.value[0]}`;
  }
};
</script>

<template>
  <VCard>
    <VCardTitle class="pa-4 d-flex justify-space-between align-center">
      <h4 class="text-h4">Proses Produksi Halal</h4>
      <VBtn v-if="!props.isVerificator" @click="handleAddSave"
        >Simpan Perubahan</VBtn
      >
    </VCardTitle>
    <VCardItem>
      <VForm ref="form" v-model="formStatus" @submit.prevent="handleAddProcess">
        <VRow class="d-flex justify-space-between align-center">
          <VCol cols="6" class="text-h6">Ketik Proses</VCol>
          <VCol cols="6" class="d-flex justify-space-between align-center ga-4">
            <VTextField
              :disabled="props.isVerificator"
              v-model="typedProcess"
              :rules="processRules"
              placeholder="Isi Ketik Proses"
              density="compact"
              outlined
              class="mr-3"
              :hide-details="false"
              autofocus
            >
              <template #append>
                <VBtn
                  :disabled="props.isVerificator"
                  dense
                  outlined
                  @click="handleAddProcess"
                >
                  Tambah
                </VBtn>
              </template>
            </VTextField>
          </VCol>
        </VRow>
      </VForm>
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
