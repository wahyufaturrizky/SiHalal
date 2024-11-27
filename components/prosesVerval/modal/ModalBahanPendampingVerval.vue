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
      <VListItem
        v-if="modalType === modalTypeEnum.EDIT"
        prepend-icon="fa-pencil"
        v-bind="openModal"
        >Edit</VListItem
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
                <VLabel>Nama Bahan</VLabel>
                <VSelect
                  density="compact"
                  placeholder="Pilih Nama Bahan"
                ></VSelect>
              </VItemGroup>
              <VItemGroup>
                <VLabel>Diragukan / Tidak Diragukan</VLabel>
                <VTextField
                  disabled
                  density="compact"
                  placeholder="Data otomatis terisi apabila nama bahan telah dipilih"
                ></VTextField>
              </VItemGroup>
              <VItemGroup v-if="modalType === modalTypeEnum.ADD">
                <VLabel>Temuan</VLabel>
                <VSelect
                  density="compact"
                  placeholder="Data otomatis terisi apabila nama bahan telah dipilih"
                ></VSelect>
              </VItemGroup>
              <VItemGroup v-if="modalType === modalTypeEnum.EDIT">
                <VLabel>Keterangan</VLabel>
                <VSelect
                  density="compact"
                  placeholder="Data otomatis terisi apabila nama bahan telah dipilih"
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
