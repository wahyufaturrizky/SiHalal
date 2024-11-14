<script setup lang="ts">
interface ProfileData {
  namaPerusahaan: string
  alamat: string
  kotaKab: string
  provinsi: string
  kodePos: string
  negara: string
  telepon: string
  email: string
  jenisBadanUsaha: string
  skalaUsaha: string
  tingkatUsaha: string
  modalDasar: string
  asalUsaha: string
}

const isExpanded = ref(true)

const formData = ref<ProfileData>({
  namaPerusahaan: 'Kopi Susu Samsul',
  alamat: 'Sumbawa Barat, RT002/RW002, Sumbang, Curio',
  kotaKab: 'Kab Enrekang',
  provinsi: 'Sulawesi Selatan',
  kodePos: '-',
  negara: 'Indonesia',
  telepon: '081234567890',
  email: 'kopisuusamsul@gmail.com',
  jenisBadanUsaha: 'Lainnya',
  skalaUsaha: 'Micro',
  tingkatUsaha: 'UMK',
  modalDasar: 'Rp.0',
  asalUsaha: 'Domestik',
})

const labels = {
  namaPerusahaan: 'Nama Perusahaan',
  alamat: 'Alamat',
  kotaKab: 'Kota/Kab',
  provinsi: 'Provinsi',
  kodePos: 'Kode Pos',
  negara: 'Negara',
  telepon: 'Telepon',
  email: 'Email',
  jenisBadanUsaha: 'Jenis Badan Usaha',
  skalaUsaha: 'Skala Usaha',
  tingkatUsaha: 'Tingkat Usaha',
  modalDasar: 'Modal Dasar',
  asalUsaha: 'Asal Usaha',
}
</script>

<template>
  <VCard
    elevation="0"
    class="profile-card pa-4"
  >
    <div class="d-flex justify-space-between align-center mb-4">
      <span class="text-h3"> <b>Profil </b></span>

      <VBtn
        icon
        @click="isExpanded = !isExpanded"
      >
        <VIcon>{{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</VIcon>
      </VBtn>
    </div>

    <VExpandTransition>
      <div v-show="isExpanded">
        <div
          v-for="(item, key) in formData"
          :key="key"
          class="mb-4"
        >
          <div class="d-flex field-wrapper">
            <div class="field-label">
              {{ labels[key] }}
            </div>
            <div
              class="d-flex align-center gap-2"
              style="flex: 1;"
            >
              <span
                v-if="key !== 'skalaUsaha'"
                class="field-value"
              >: {{ item }}</span>
              <template v-else>
                <span class="field-value">:</span>
                <VSelect
                  v-model="formData.skalaUsaha"
                  :items="['Micro']"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="skala-select"
                />
                <VBtn
                  color="deep-purple"
                  size="small"
                  class="update-btn"
                  style="text-transform: none;"
                >
                  Update
                </VBtn>
              </template>
            </div>
          </div>
          <VDivider
            v-if="key === 'email'"
            class="mt-2"
          />
        </div>
      </div>
    </VExpandTransition>
  </VCard>
</template>

<style scoped>
.profile-card {
  border-radius: 8px;
  background-color: white;
}

.field-wrapper {
  align-items: center;
  min-block-size: 32px;
}

.field-label {
  color: #666;
  font-size: 14px;
  min-inline-size: 140px;
}

.field-value {
  color: #333;
  font-size: 14px;
  margin-inline-end: 8px;
}

.skala-select {
  margin-inline-start: 8px;
  max-inline-size: 150px;
}

.update-btn {
  background-color: #673ab7 !important;
  color: white;
  margin-inline-start: 8px;
}

:deep(.v-field) {
  border-radius: 4px;
}

:deep(.v-field__input) {
  min-block-size: 32px !important;
  padding-block: 0 !important;
}
</style>
