<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  submit: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["update:dialogVisible"]);

const localDialogVisible = ref(props.dialogVisible);

watch(
  () => props.dialogVisible,
  (newVal) => {
    localDialogVisible.value = newVal;
  }
);

watch(localDialogVisible, (newVal) => {
  emit("update:dialogVisible", newVal);
});

const closeDialog = () => {
  localDialogVisible.value = false;
};

const kbliOptions = ref([]);
const selectedKBLI = ref();

const handleRegister = () => {
  props.submit(selectedKBLI.value);
  closeDialog();
};

onMounted(async () => {
  const response: any = await $api("/master/list-oss", {
    method: "get",
  });
  kbliOptions.value = response;
  // console.log(response, "< res here");
});
</script>

<template>
  <VDialog v-model="localDialogVisible" max-width="500px">
    <VCard class="pa-4">
      <VCardTitle class="headline d-flex space-between align-center">
        <h4>Layanan Sertifikasi Halal</h4>
        <VSpacer />
        <VBtn icon class="no-bg" @click="localDialogVisible = false">
          <VIcon icon="mdi-close" style="color: black" />
        </VBtn>
      </VCardTitle>
      <VCardText>
        <p class="text-body-2">
          Ajukan Permohonan Anda untuk mendapatkan sertifikat halal dari BPJPH
          dengan memilih salah satu layanan dibawah ini:
        </p>
        <VCard
          class="my-4 pa-4 d-flex flex-column mx-auto mb-8"
          elevation="4"
          width="90%"
        >
          <h3 class="font-weight-bold text-center">Baru</h3>
          <p class="text-center text-body-2 mt-2">
            Proses sertifikasi halal untuk produk baru yang belum pernah / belum
            memiliki sertifikat halal sebelumnya
          </p>
          <VBtn
            color="primary"
            class="mt-2 text-center"
            width="100%"
            :disabled="!selectedKBLI"
            @click="handleRegister"
          >
            Daftar
          </VBtn>
        </VCard>
        <div class="font-weight-bold text-body-2 mb-1">
          Pilih KBLI/Usaha/Kegiatan
        </div>
        <VSelect
          v-model="selectedKBLI"
          :items="kbliOptions"
          item-title="uraian_usaha"
          item-value="kbli"
          placeholder="Pilih KBLI/Usaha/Kegiatan"
          outlined
          density="compact"
        />
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
.headline {
  font-size: 1.2rem;
}
.no-bg {
  background-color: transparent !important;
  color: inherit;
  box-shadow: none;
}
</style>
