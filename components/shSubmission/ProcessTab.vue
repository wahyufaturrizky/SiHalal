<script setup lang="ts">
const props = defineProps({
  userRoles: {
    type: Array<string> || null,
  },
});

const route = useRoute();

const form = ref();
const formStatus = ref(false);
const typedProcess = ref("");
const processRules = ref([(v: string) => !!v || "Proses produksi harus diisi"]);
const processArray = ref<Array<string>>([]);
const prosesProduction = ref("");

const handleAddData = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/narration/update`,
      {
        method: "put",
        body: {
          id_reg: route.params?.id,
          narasi: prosesProduction.value,
        },
      }
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal Mengubah Data ", "success");
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

const handleDetailPelakuUsaha = async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${route.params?.id}/detail`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      prosesProduction.value = response.data.narasi;
      if (response.data.narasi.length > 0) {
        Object.assign(processArray.value, response.data.narasi.split("\n"));
      }
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await handleDetailPelakuUsaha();
});
</script>

<template>
  <VCard class="pb-5 pt-3">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Proses Produk Halal</div>
    </VCardTitle>
    <VCardText>
      <VItemGroup v-if="!props?.userRoles?.includes('Verifikator')">
        <div class="font-weight-bold mb-1">Proses</div>
        <VTextField
          rounded="xl"
          v-model="typedProcess"
          :rules="processRules"
          placeholder="Isi Ketik Proses"
          density="compact"
          outlined
          class="mr-3"
          :hide-details="false"
        >
          <template #append>
            <VBtn variant="outlined" @click="handleAddProcess">Tambah</VBtn>
          </template>
        </VTextField>
        <br />
      </VItemGroup>
      <VItemGroup>
        <div class="font-weight-bold mb-1">Proses Produksi</div>
        <VTextarea
          v-model="prosesProduction"
          placeholder="Masukkan Proses Produksi"
          density="compact"
          rounded="xl"
        />
      </VItemGroup>
    </VCardText>
    <VCardActions class="pe-5">
      <VSpacer />
      <VBtn
        variant="flat"
        text="Simpan Hasil Verifikasi PPh"
        class="px-4"
        @click="handleAddData"
      />
    </VCardActions>
  </VCard>
</template>

<style scoped></style>
