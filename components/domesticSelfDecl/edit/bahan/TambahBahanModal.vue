<script setup lang="ts">
import { VTextField } from "vuetify/components";
</script>

<template>
  <VDialog max-width="60svw">
    <template #activator="{ props: openModal }">
      <VBtn
        variant="outlined"
        prepend-icon="fa-plus"
        style="margin: 1svw"
        v-bind="openModal"
        >Tambah</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Tambah Data Bahan</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              ></VIcon
            ></VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Tipe Bahan</VLabel>
                <VSelect
                  density="compact"
                  placeholder="Pilih Tipe Bahan"
                ></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel
                  >Bahan&nbsp;
                  <span v-if="true">Tidak</span> &nbsp;Bersertifikat</VLabel
                >
                <VTextField
                  v-if="true"
                  placeholder="Cari Bahan Tidak Bersertifikat"
                  density="compact"
                >
                  <template #append-inner>
                    <CariBahanModal></CariBahanModal>
                  </template>
                </VTextField>
                <VTextField
                  v-if="false"
                  placeholder="Cari Nama Produk / Merek / Nama Produsen / No. Sertifikat"
                  density="compact"
                >
                  <template #append-inner>
                    <CariBahanModal></CariBahanModal>
                  </template>
                </VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <br />
          <VDivider></VDivider>
          <br />
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Jenis Bahan</VLabel>
                <VSelect
                  placeholder="Pilih Jenis Bahan"
                  density="compact"
                ></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Nama Bahan</VLabel>
                <VTextField
                  disabled
                  placeholder="Nama Bahan otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="false">
            <!-- kelompok appears when tipe bahan = tidak bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Kelompok</VLabel>
                <VTextField
                  disabled
                  placeholder="Kelompok otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="false">
            <!-- produsen appears when tipe bahan = bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Produsen</VLabel>
                <VTextField
                  disabled
                  placeholder="Produsen otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="false">
            <!-- produsen appears when tipe bahan = bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Nomor Sertifikat Halal</VLabel>
                <VTextField
                  disabled
                  placeholder="Nomor Sertifikat Halal otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow> </VCardItem
        ><VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn @click="isActive.value = false" variant="outlined"
              >Batal</VBtn
            >
            <VBtn variant="flat">Tambah</VBtn>
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
