<script setup lang="ts">
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  dialogType: {
    type: String,
  },
  dialogUse: {
    type: String,
  },
});

const emit = defineEmits(["update:dialogVisible"]);

const localDialogUse = computed(() => props.dialogUse || "CREATE");
const localDialogType = computed(() => props.dialogType || "Pabrik");
const localDialogVisible = ref(props.dialogVisible);
const closeDialog = () => {
  localDialogVisible.value = false;
};

watch(
  () => props.dialogVisible,
  (newVal) => {
    localDialogVisible.value = newVal;
  }
);
watch(localDialogVisible, (newVal) => {
  emit("update:dialogVisible", newVal);
});
</script>

<template>
  <VDialog v-model="localDialogVisible" max-width="840px">
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">
          Tambah Data {{ localDialogType }}
        </div>
        <VIcon @click="closeDialog"> fa-times </VIcon>
      </VCardTitle>
      <VCardText>
        <VForm>
          <VItemGroup v-if="localDialogType === 'Pabrik'">
            <VLabel>Lokasi Pabrik</VLabel>
            <VSelect placeholder="Pilih Lokasi Pabrik" density="compact" />
            <br />
          </VItemGroup>
          <VItemGroup>
            <VLabel>Nama {{ localDialogType }}</VLabel>
            <VTextField
              :placeholder="`Isi Nama ${localDialogType}`"
              density="compact"
            />
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel>Alamat {{ localDialogType }}</VLabel>
            <VTextField
              :placeholder="`Isi Alamat ${localDialogType}`"
              density="compact"
            />
          </VItemGroup>
          <br />
          <VRow>
            <VCol cols="6">
              <VItemGroup>
                <VLabel>Kab/Kota</VLabel>
                <VTextField
                  placeholder="Isi Kabupaten/Kota"
                  density="compact"
                />
              </VItemGroup>
            </VCol>
            <VCol cols="6">
              <VItemGroup>
                <VLabel>Provinsi</VLabel>
                <VTextField placeholder="Isi Provinsi" density="compact" />
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="6">
              <VItemGroup>
                <VLabel>Negara</VLabel>
                <VTextField placeholder="Isi Negara" density="compact" />
              </VItemGroup>
            </VCol>
            <VCol cols="6">
              <VItemGroup>
                <VLabel>Kode Pos</VLabel>
                <VTextField placeholder="Isi Kode Pos" density="compact" />
              </VItemGroup>
            </VCol>
          </VRow>
          <VItemGroup v-if="localDialogType === 'Pabrik'">
            <br />
            <VLabel>Status Pabrik</VLabel>
            <VSelect placeholder="Pilih Alamat Pabrik" density="compact" />
          </VItemGroup>
        </VForm>
      </VCardText>
      <VCardActions class="px-4">
        <VBtn variant="outlined" class="px-4 me-3">Batal</VBtn>
        <VBtn variant="flat" class="px-4">
          {{ localDialogUse == "CREATE" ? "Tambah" : "Simpan" }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped></style>
