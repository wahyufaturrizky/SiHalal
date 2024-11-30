<script setup lang="ts">
const emit = defineEmits<{
  (event: "refresh"): void;
}>();

const loadingAdd = ref(false);
const dialogVisible = ref(false);

const addItem = async () => {
  try {
    loadingAdd.value = true;

    const response = await $api("/facilitate/entry/add", {
      method: "post",
    });

    if (response.code === 2000) {
      loadingAdd.value = false;
      dialogVisible.value = false;
      emit("refresh");
      useSnackbar().sendSnackbar("Sukses add data", "success");
      navigateTo(`/facilitation/entry/${response?.data?.fasilitasi_id}`);
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingAdd.value = false;
      dialogVisible.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingAdd.value = false;
    dialogVisible.value = false;
  }
};

const handleDialogvisible = () => {
  dialogVisible.value = true;
};
</script>

<template>
  <VBtn append-icon="fa-plus" @click="handleDialogvisible">
    Tambah Pengajuan
  </VBtn>

  <VDialog v-model="dialogVisible" max-width="60svh">
    <VCard style="padding: 1.5svw">
      <VCardTitle><h3>Fasilitasi</h3></VCardTitle>
      <VCardItem>
        <VCard variant="outlined" style="margin: 1svw">
          <VCardTitle
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 2svw;
            "
          >
            <h3>Baru</h3>
          </VCardTitle>
          <VCardItem
            style="display: flex; justify-content: center; align-items: center"
          >
            <p style="text-align: center">
              Klik “Buat Fasilitasi” untuk mengajukan Fasilitasi
            </p>
          </VCardItem>
          <VCardActions
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 2svw;
            "
          >
            <VBtn
              :disabled="loadingAdd"
              style="width: 100svw"
              variant="flat"
              @click="addItem"
            >
              {{ loadingAdd ? "Loading..." : "Buat Fasilitasi" }}
            </VBtn>
          </VCardActions>
        </VCard>
      </VCardItem>
    </VCard>
  </VDialog>
</template>
