<script setup lang="ts">
import { VTextField } from "vuetify/components";
import { ref } from 'vue';

// Static bill date value
const data = {
  sertifikasi_date: ref([]),
}
const bahanType = ref(null);
// Function to format the date as DD/MM/YY
const formatDate = (date: Date): string => {
  let date2 = new Date(date)
  const day = date2.getDate().toString().padStart(2, '0'); // Add leading zero for single digit days
  const month = (date2.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero for single digit months
  const year = date2.getFullYear().toString().slice(-2); // Extract last 2 digits of the year

  return `${day}/${month}/${year}`;
}

// Sample data for "Bahan Bersertifikat" and "Tidak Bersertifikat"
const bahanOptions = [
  { name: 'Bahan Bersertifikat', value: 'bersertifikat' },
  { name: 'Bahan Tidak Bersertifikat', value: 'tidak_bersertifikat' },
]

// Search term entered by the user
const searchTerm = ref("");
// Boolean to toggle visibility of the suggestion
const showSuggestion = ref(false);
// Boolean to toggle the visibility of the CariBahanModal
const isCariBahanModalOpen = ref(false);

// Function to handle search input
const handleSearch = () => {
  showSuggestion.value = searchTerm.value.toLowerCase() === "susu";
}
</script>

<template>
  <VDialog max-width="30svw">
    <template #activator="{ props: openModal }">
      <VBtn
        variant="outlined"
        prepend-icon="fa-plus"
        style="margin: 1svw"
        v-bind="openModal"
      >
        Tambah
      </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Tambah Data Bahan</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end">
              <VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              />
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Tipe Bahan</VLabel>
                <VSelect
                  v-model="bahanType"
                  :items="bahanOptions"
                  item-title="name"
                  item-value="value"
                  placeholder="Pilih Tipe Bahan"
                  density="compact"
                />
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VItemGroup v-if="bahanType === 'tidak_bersertifikat'">
                <VLabel>
                  Bahan&nbsp; Tidak&nbsp; Bersertifikat
                </VLabel>
                <VTextField
                  placeholder="Cari Bahan Tidak Bersertifikat"
                  density="compact"
                >
                  <template #append-inner>
                    <CariBahanModal/>
                  </template>
                </VTextField>
              </VItemGroup>
              <VItemGroup v-if="bahanType === 'bersertifikat'">
                <VLabel>
                  Bahan&nbsp; Bersertifikat
                </VLabel>
                <VTextField
                  v-model="searchTerm"
                  placeholder="Cari Bahan Bersertifikat"
                  density="compact"
                  @input="handleSearch"
                >
                  <!-- Suggestion and Button -->

                  <template #append-inner>
                    <CariBahanModal />
                  </template>
                </VTextField>
                <VRow
                  v-if="showSuggestion"
                  class="mt-2 justify-end align-center"
                >
                  <VCol cols="auto" class="d-flex align-center pr-0">
                    <p class="text-caption mb-0">
                      Bahan yang dicari tidak ditemukan? Ajukan bahan disini.
                    </p>
                  </VCol>
                  <VCol cols="auto" class="pl-0">
                    <AjukanBahanModal />
                  </VCol>
                </VRow>
              </VItemGroup>
            </VCol>
          </VRow>

          <br >
          <VDivider/>
          <br >
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Jenis Bahan</VLabel>
                <VSelect
                  placeholder="Pilih Jenis Bahan"
                  density="compact"
                />
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
                />
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="bahanType === 'tidak_bersertifikat'">
            <!-- kelompok appears when tipe bahan = tidak bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Kelompok</VLabel>
                <VTextField
                  disabled
                  placeholder="Kelompok otomatis terisi setelah memilih bahan"
                  density="compact"
                />
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="bahanType === 'bersertifikat'">
            <!-- merk produk appears when tipe bahan = bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Merk Produk</VLabel>
                <VTextField
                  disabled
                  placeholder="Merk Produk otomatis terisi setelah memilih bahan"
                  density="compact"
                />
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="bahanType === 'bersertifikat'">
            <!-- produsen appears when tipe bahan = bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Produsen</VLabel>
                <VTextField
                  disabled
                  placeholder="Produsen otomatis terisi setelah memilih bahan"
                  density="compact"
                />
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="bahanType === 'bersertifikat'">
            <!-- appears when tipe bahan = bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Nomor Sertifikat Halal</VLabel>
                <VTextField
                  disabled
                  placeholder="Nomor Sertifikat Halal otomatis terisi setelah memilih bahan"
                  density="compact"
                />
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="bahanType === 'bersertifikat'">
            <VCol cols="12">
              <VItemGroup>
                <!-- Date TextField -->
                <Vuepicdatepicker>
                  <template #trigger>
                    <Vuepicdatepicker
                      v-model:model-value="data.sertifikasi_date.value"
                      auto-apply
                      model-type="dd/MM/yyyy"
                      :enable-time-picker="false"
                      :teleport="true"
                      clearable
                    >
                      <template #trigger>
                        <VLabel>Masa Berlaku Sertifikat Halal</VLabel>
                        <VTextField
                          placeholder="Masa Berlaku Sertifikat Halal"
                          density="compact"
                          disabled
                          append-inner-icon="fa-calendar"
                          :model-value="data.sertifikasi_date.value"
                        />
                      </template>
                    </Vuepicdatepicker>
                  </template>
                </Vuepicdatepicker>
              </VItemGroup>
            </VCol>
          </VRow>
        </VCardItem>
        <VCardActions style="display: flex; justify-content: end; padding: 1.5svw">
          <div>
            <VBtn @click="isActive.value = false" variant="outlined">
              Batal
            </VBtn>
            <VBtn variant="flat">Tambah</VBtn>
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
