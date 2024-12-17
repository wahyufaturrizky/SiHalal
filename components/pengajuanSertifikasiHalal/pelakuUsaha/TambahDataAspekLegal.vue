<script setup lang="ts">
import { ref } from "vue";
import { VTextField } from "vuetify/components";

const props = defineProps({
  dokumen: {
    type: Array,
  },
});

const { dokumen } = props || {};

// Static bill date value
const data = {
  sertifikasi_date: ref([]),
};
const bahanType = ref(null);
// Function to format the date as DD/MM/YY
const formatDate = (date: Date): string => {
  let date2 = new Date(date);
  const day = date2.getDate().toString().padStart(2, "0"); // Add leading zero for single digit days
  const month = (date2.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero for single digit months
  const year = date2.getFullYear().toString().slice(-2); // Extract last 2 digits of the year

  return `${day}/${month}/${year}`;
};

// Search term entered by the user
const searchTerm = ref("");
// Boolean to toggle visibility of the suggestion
const showSuggestion = ref(false);
// Boolean to toggle the visibility of the CariBahanModal
const isCariBahanModalOpen = ref(false);

// Function to handle search input
const handleSearch = () => {
  showSuggestion.value = searchTerm.value.toLowerCase() === "susu";
};
</script>

<template>
  <VDialog max-width="20svw">
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
            <VCol cols="10"><h3>Tambah Data Aspek Legal</h3></VCol>
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
                <VLabel>Jenis Dokumen</VLabel>
                <VSelect
                  v-model="bahanType"
                  :items="dokumen"
                  item-title="name"
                  item-value="code"
                  placeholder="Pilih Jenis Dokumen"
                  density="compact"
                />
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <!-- merk produk appears when tipe bahan = bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Nomor Dokumen</VLabel>
                <VTextField placeholder="Isi Nomor Dokumen" density="compact" />
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
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
                        <VLabel>Tanggal Dokumen</VLabel>
                        <VTextField
                          placeholder="Tanggal Dokumen"
                          density="compact"
                          readonly
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
                        <VLabel>Masa Berlaku</VLabel>
                        <VTextField
                          placeholder="Masa Berlaku"
                          density="compact"
                          readonly
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
          <VRow>
            <!-- merk produk appears when tipe bahan = bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Instansi Penerbit</VLabel>
                <VTextField
                  placeholder="Isi Instansi Penerbit"
                  density="compact"
                />
              </VItemGroup>
            </VCol>
          </VRow>
        </VCardItem>
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
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
