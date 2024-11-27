<script setup lang="ts">
import { modalTypeEnum } from "../verval-enum";

const props = defineProps({
  modalType: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <VDialog>
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
              ><h3 v-if="modalType === modalTypeEnum.ADD">Tambah Bahan</h3>
              <h3 v-if="modalType === modalTypeEnum.EDIT">Ubah Bahan</h3></VCol
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
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Kriteria</VLabel>
                <VSelect
                  density="compact"
                  placeholder="Pilih Kriteria"
                ></VSelect>
              </VItemGroup>
              <VItemGroup>
                <VLabel>Pertanyaan</VLabel>
                <VSelect
                  :disabled="false"
                  density="compact"
                  placeholder="Pilih Pertanyaan"
                ></VSelect>
              </VItemGroup>
              <VItemGroup>
                <VLabel>Jawaban</VLabel>
                <VSelect
                  :disabled="false"
                  density="compact"
                  placeholder="Pilih Jawaban"
                ></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
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
            <VBtn variant="flat" v-if="modalType === modalTypeEnum.ADD"
              >Simpan</VBtn
            >
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
